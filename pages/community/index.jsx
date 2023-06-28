import Layout from "@/components/reusable/Layout";
import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/Community.module.css";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import Posts from "@/components/community/Posts";
import Comment from "@/components/community/Comment";
import { toast } from "react-hot-toast";
import { api } from "utils/urls";
import { refreshUser } from "utils/authentication";
import { userContext } from "@/context/userContext";

export default function Community() {

  const [posts, setPosts] = useState([])
  const [learningPosts, setLearningPosts] = useState([])
  const [eventPosts, setEventPosts] = useState([])
  const [myPosts, setMyPosts] = useState([])
  const { userData, setUserData } = useContext(userContext)

  const getAllPosts = async () => {
    try{
      let response = await api('/community/posts', 'get')
      if(response?.data?.length>0){
        setPosts(response.data?.filter((postData) => {
          return ((postData?.isHidden == false) && postData?.type != 'learning' && postData?.type != 'event')
        }))
      }
    }catch(error){
      console.log(error)
      toast.error('Error happened while fetching posts!')
    }
  }

  const getAllLearningPosts = async () => {
    try{
      let response = await api('/community/posts/learning', 'get')
      if(response?.data?.length>0){
        setLearningPosts(response.data?.filter((postData) => {
          return postData?.isHidden == false
        }))
      }
    }catch(error){
      console.log(error)
      toast.error('Error happened while fetching posts!')
    }
  }

  const getAllEventsPosts = async () => {
    try{
      let response = await api('/community/posts/event', 'get')
      if(response?.data?.length>0){
        setEventPosts(response.data?.filter((postData) => {
          return postData?.isHidden == false
        }))
      }
    }catch(error){
      console.log(error)
      toast.error('Error happened while fetching posts!')
    }
  }

  useEffect(() => {
    getAllPosts()
    getAllLearningPosts()
    getAllEventsPosts()
  }, [])

  useEffect(() => {
    if(posts?.length>0){
      setMyPosts(posts?.filter((postData) => {
        return postData?.author?._id == userData?._id
      }))
    }else{
      (posts !== [] )&& setMyPosts([])
    }
  }, [posts])

  useEffect(() => {
    if (!userData?._id) {
      (async () => {
        let response = await refreshUser('post')
        setUserData(response?.data)
      })()
    }
  }, [userData])

  return (
    <Layout>
      <div className={`wrapper ${styles.container}`}>
        <div className={styles.left}>
          <Tabs size="lg" colorScheme="purple">
            <TabList>
              <Tab>Trending</Tab>
              <Tab>Learning</Tab>
              <Tab>Events</Tab>
              <Tab>Profile</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Posts getAllPosts={getAllPosts} posts={posts} />
              </TabPanel>
              <TabPanel>
                <Posts getAllPosts={getAllLearningPosts} posts={learningPosts} type={'learning'} />
              </TabPanel>
              <TabPanel>
                <Posts getAllPosts={getAllEventsPosts} posts={eventPosts} type={'event'} />
              </TabPanel>
              <TabPanel>
                <Posts posts={myPosts} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
        <div className={styles.right}>
          <Tabs size="lg" colorScheme="purple">
            <TabList>
              <Tab>Post</Tab>
              <Tab>
                <p id={styles.notif} data-content="2">
                  Notifications
                </p>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Box borderRadius={8} overflow="hidden">
                  <Comment isPost getAllPosts={getAllPosts} />
                </Box>
              </TabPanel>
              <TabPanel>Coming Soon!</TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
