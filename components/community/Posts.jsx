/* eslint-disable jsx-a11y/alt-text */
import styles from "@/styles/Community.module.css";
import Post from "./Post";

export default function Posts({ posts, isComment }) {
  return (
    <div className={styles.postWrapper}>
      {
        posts && !isComment && posts?.length>0 &&
        posts.map((post, index) => {
          return <Post key={index} postData={post} />
        })
      }
      {
        posts && isComment && posts?.comments?.length>0 &&
        posts.comments.map((post, index) => {
          return <Post key={index} postData={post} />
        })
      }
      {/* <Post />
      <Post />
      <Post />
      <Post />
      <Post /> */}
    </div>
  );
}
