/* eslint-disable jsx-a11y/alt-text */
import Comment from "@/components/community/Comment";
import Post from "@/components/community/Post";
import Posts from "@/components/community/Posts";
import Layout from "@/components/reusable/Layout";
import styles from "@/styles/Community.module.css";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "utils/urls";

export default function PostDetail() {
const router = useRouter()

const [postData, setPostData] = useState()

const getPostData = async (postId) => {
  try{
    let response = await api(`/community/post/${postId}`, 'get')
    if(response?.data?._id){
      setPostData(response?.data)
    }
  }catch(error){
    console.log(error)
  }
}

  useEffect(() => {
    if(router?.query?.id){
      getPostData(router?.query?.id)
    }
  }, [router?.query])

  return (
    <Layout>
      <div className={`wrapper ${styles.container}`}>
        <div className={styles.left}>
          <Box borderRadius={8} overflow="hidden">
            <Post postData={postData} />
          </Box>

          <Posts isComment posts={postData} />
        </div>
        <div className={styles.right}>
          <Box borderRadius={8} overflow="hidden">
            <Comment postData={postData} getPostData={getPostData} />
          </Box>
        </div>
      </div>
    </Layout>
  );
}
