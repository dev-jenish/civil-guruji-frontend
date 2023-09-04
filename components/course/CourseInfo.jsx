import styles from "@/styles/CourseInfo.module.css";
import { AiOutlineCheck, AiFillDollarCircle } from "react-icons/ai";
import { BsBriefcaseFill } from "react-icons/bs";
import { BiTimer } from "react-icons/bi";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import FeedbackCard from "./FeedbackCard";

// const learnings = [
//   "Learn about all topics in the Blockchain world",
//   "Build 10 awesome Web3 projects",
//   "Become an amazing blockchain developer",
//   "Understand complete topics with ease",
// ];

export default function CourseInfo({ learnings = [] }) {
  if (!learnings?.length) return;

  return (
    <div className={styles.contentWrapper}>
      <Tabs size="xl" variant="button">
        <TabList>
        { learnings.length>0 &&
        <Tab>Info</Tab>}
          <Tab>Career</Tab>
          <Tab>Certificate</Tab>
          <Tab><BiTimer/></Tab>
        </TabList>
        <hr></hr>
        <TabPanels>
        { learnings.length>0 &&
          <TabPanel>
            <Learnings learnings={learnings} />
          </TabPanel>
          }
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
        </TabPanels>
      </Tabs>
    </div>
  );
}

function Learnings({ learnings }) {
  const half = Math.ceil(learnings.length / 2);

  const firstHalf = learnings?.slice(0, half);
  const secondHalf = learnings?.slice(half);

  return (
    <div className={styles.flex}>
      <div className={styles.points}>
        {firstHalf.map((learn, i) => (
           learn?.value&& <span key={i + 1}>
            <AiOutlineCheck className={styles.icon} />
            <p>{learn?.value}</p>
          </span>
        ))}
      </div>
      <div className={styles.points}>
        {secondHalf.map((learn, i) => (
         learn?.value && <span key={i + 1}>
            <AiOutlineCheck className={styles.icon} />
            <p>{learn?.value}</p>
          </span>
        ))}
      </div>
    </div>
  );
}
