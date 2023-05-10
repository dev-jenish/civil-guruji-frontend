/* eslint-disable jsx-a11y/alt-text */
import styles from "@/styles/Community.module.css";
import Post from "./Post";

export default function Posts() {
  return (
    <div className={styles.postWrapper}>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}
