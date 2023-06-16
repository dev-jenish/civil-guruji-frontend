import Layout from "@/components/reusable/Layout";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Community.module.css";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import Posts from "@/components/community/Posts";
import Comment from "@/components/community/Comment";
import { toast } from "react-hot-toast";
import { api } from "utils/urls";

export default function Community() {

  const [posts, setPosts] = useState()

  const getAllPosts = async () => {
    try{
      let response = await api('/community/posts', 'get')
      if(response?.data?.length>0){
        setPosts(response.data)
      }
    }catch(error){
      console.log(error)
      toast.error('Error happened while fetching posts!')
    }
  }

  useEffect(() => {
    getAllPosts()
  }, [])

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
                <Posts posts={posts} />
              </TabPanel>
              <TabPanel>
                <Posts />
              </TabPanel>
              <TabPanel>
                <Posts />
              </TabPanel>
              <TabPanel>
                <Posts />
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
