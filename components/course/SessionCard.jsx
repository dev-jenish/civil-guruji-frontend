import { Button } from "@chakra-ui/react";
import { AiOutlineVideoCamera } from "react-icons/ai";
import styles from "@/styles/CourseDetail.module.css";
import moment from "moment";

export default function SessionCard({ isLive, meetingData, setSelectedTopic }) {

  const startTime = moment(meetingData?.start_time)

  const handleJoinMeeting = () => {
    setSelectedTopic({
      isLive: true,
      liveData: meetingData
    })
  }

  return (
    <div className={styles.sessionCard}>
      <span>
        <AiOutlineVideoCamera id={styles.cameraIcon} />
        <p>{isLive ? "Ongoing Session" : "Upcoming Session"}</p>
      </span>
      {isLive ? (
        <Button onClick={handleJoinMeeting} colorScheme="red" size="xs">
          Join
        </Button>
      ) : (
        <p id={styles.time}>{ startTime.format('HH:mm A')} • {startTime.format("MMMM DD, YYYY")}</p>
      )}
    </div>
  );
}
