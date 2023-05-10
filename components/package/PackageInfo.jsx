import styles from "@/styles/PackageInfo.module.css";
import { AiOutlineCheck, AiFillDollarCircle } from "react-icons/ai";
import { BsBriefcaseFill } from "react-icons/bs";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import FeedbackCard from "../course/FeedbackCard";
import SessionCard from "../course/SessionCard";

const learnings = [
  "Learn about all topics in the Blockchain world",
  "Build 10 awesome Web3 projects",
  "Become an amazing blockchain developer",
  "Understand complete topics with ease",
];

export default function PackageInfo({}) {
  if (!learnings?.length) return;

  return (
    <div className={styles.contentWrapper}>
      <Tabs size="xl" variant="button">
        <TabList>
          <Tab>Learnings</Tab>
          <Tab>Career</Tab>
          <Tab>Feedback</Tab>
          <Tab>Live Sessions</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Learnings />
          </TabPanel>
          <TabPanel>
            <div className={styles.career}>
              <div>
                <BsBriefcaseFill className={styles.icon} /> 100+ Jobs in Job
                Buildo
              </div>
              <div>
                <AiFillDollarCircle className={styles.icon} /> 5 Lakhs to 7
                Lakhs
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className={styles.feedbacks}>
              <FeedbackCard />
              <FeedbackCard />
              <FeedbackCard />
              <FeedbackCard />
              <FeedbackCard />
            </div>
          </TabPanel>
          <TabPanel>
            <SessionCard isLive />
            <SessionCard />
            <SessionCard />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

function Learnings() {
  const half = Math.ceil(learnings.length / 2);

  const firstHalf = learnings?.slice(0, half);
  const secondHalf = learnings?.slice(half);

  return (
    <div className={styles.flex}>
      <div className={styles.points}>
        {firstHalf.map((learn, i) => (
          <span key={i + 1}>
            <AiOutlineCheck className={styles.icon} />
            <p>{learn}</p>
          </span>
        ))}
      </div>
      <div className={styles.points}>
        {secondHalf.map((learn, i) => (
          <span key={i + 1}>
            <AiOutlineCheck className={styles.icon} />
            <p>{learn}</p>
          </span>
        ))}
      </div>
    </div>
  );
}
