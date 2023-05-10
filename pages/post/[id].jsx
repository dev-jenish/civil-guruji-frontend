/* eslint-disable jsx-a11y/alt-text */
import Comment from "@/components/community/Comment";
import Post from "@/components/community/Post";
import Posts from "@/components/community/Posts";
import Layout from "@/components/reusable/Layout";
import styles from "@/styles/Community.module.css";
import { Box } from "@chakra-ui/react";

export default function PostDetail() {
  return (
    <Layout>
      <div className={`wrapper ${styles.container}`}>
        <div className={styles.left}>
          <Box borderRadius={8} overflow="hidden">
            <Post />
          </Box>

          <Posts />
        </div>
        <div className={styles.right}>
          <Box borderRadius={8} overflow="hidden">
            <Comment />
          </Box>
        </div>
      </div>
    </Layout>
  );
}
