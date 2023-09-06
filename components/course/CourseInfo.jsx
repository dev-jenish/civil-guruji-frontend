import styles from "@/styles/CourseInfo.module.css";
import { AiOutlineCheck, AiFillDollarCircle } from "react-icons/ai";
import { BsBriefcaseFill } from "react-icons/bs";
import { BiTimer } from "react-icons/bi";

import { Tabs, TabList, TabPanels, Tab, TabPanel,Tooltip, Box, useColorModeValue, } from "@chakra-ui/react";
import FeedbackCard from "./FeedbackCard";

// const learnings = [
//   "Learn about all topics in the Blockchain world",
//   "Build 10 awesome Web3 projects",
//   "Become an amazing blockchain developer",
//   "Understand complete topics with ease",
// ];

export default function CourseInfo({ learnings = [] }) {
  
  const activeTabColor = useColorModeValue("#DE076E", "#DE076E");

  if (!learnings?.length) return;
  return (
    <div className={styles.contentWrapper}>
      <Tabs size="xl">
        <TabList>
        <Tab _selected={{ color: activeTabColor, borderBottom: `2px solid ${activeTabColor}` }}>Info</Tab>
          <Tab _selected={{ color: activeTabColor, borderBottom: `2px solid ${activeTabColor}` }}>Career</Tab>
          <Tab _selected={{ color: activeTabColor, borderBottom: `2px solid ${activeTabColor}` }}>Certificate</Tab>
          <Tab _selected={{ color: activeTabColor, borderBottom: `2px solid ${activeTabColor}` }}>
          <Box display="flex" justifyContent="flex-end">
          <Tooltip label="If you learn for 4hours daily, it will take 10 days to complete">
            <Box ml={1} style={{fontSize:"24px"}}><BiTimer /></Box>
          </Tooltip>
        </Box>
        </Tab>
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
          <TabPanel>
          <div>
          <img src="https://i.pinimg.com/originals/b9/12/8b/b9128b7913c0791e41b89436fec82868.jpg" alt="alternative-text" width="213px" height="300px"></img>
          </div>
          </TabPanel>
          <TabPanel className={styles.tooltipText}>
            If you learn for 4hours daily, it will take 10 days to complete. 
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
