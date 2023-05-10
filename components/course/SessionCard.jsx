import { Button } from "@chakra-ui/react";
import { AiOutlineVideoCamera } from "react-icons/ai";
import styles from "@/styles/CourseDetail.module.css";

export default function SessionCard({ isLive }) {
  return (
    <div className={styles.sessionCard}>
      <span>
        <AiOutlineVideoCamera id={styles.cameraIcon} />
        <p>{isLive ? "Ongoing Session" : "Upcoming Session"}</p>
      </span>
      {isLive ? (
        <Button colorScheme="red" size="xs">
          Join
        </Button>
      ) : (
        <p id={styles.time}>3:30PM • December 10, 2023</p>
      )}
    </div>
  );
}
