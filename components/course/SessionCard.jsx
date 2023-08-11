import { Button } from "@chakra-ui/react";
import { AiOutlineVideoCamera } from "react-icons/ai";
import styles from "@/styles/CourseDetail.module.css";
import moment from "moment";

export default function SessionCard({ meetingData, setSelectedTopic, fromDetails }) {

  const isLive = moment().isAfter(moment(meetingData?.start_time)) && !meetingData?.isEnded

  const startTime = moment(meetingData?.start_time)

  const handleJoinMeeting = () => {
    setSelectedTopic({
      isLive: true,
      liveData: meetingData
    })
  }

  // Check if the start time is today
  const isToday = startTime.isSame(moment(), "day");

  return (
    <div className={styles.sessionCard}>
      <span>
        <AiOutlineVideoCamera id={styles.cameraIcon} />
        <p>
          {meetingData?.isEnded
            ? `Session Completed (${meetingData?.topic})`
            : isLive
            ? `Ongoing Session (${meetingData?.topic})`
            : isToday
            ? `Today's Session (${meetingData?.topic})`
            : `Upcoming Session (${meetingData?.topic})`}
        </p>
      </span>
      {isLive && !fromDetails ? (
        <Button onClick={handleJoinMeeting} colorScheme="red" size="xs">
          Join
        </Button>
      ) : (
        <p id={styles.time}>
          {startTime.format("hh:mm A")} • {startTime.format("MMMM DD, YYYY")}
        </p>
      )}
    </div>
  );
}
