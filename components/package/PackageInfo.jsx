import styles from "@/styles/PackageInfo.module.css";
import { AiOutlineCheck, AiFillDollarCircle } from "react-icons/ai";
import { BsBriefcaseFill } from "react-icons/bs";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import FeedbackCard from "../course/FeedbackCard";
import SessionCard from "../course/SessionCard";

// const learnings = [
//   "Learn about all topics in the Blockchain world",
//   "Build 10 awesome Web3 projects",
//   "Become an amazing blockchain developer",
//   "Understand complete topics with ease",
// ];

export default function PackageInfo({ packageData }) {
  // if (!learnings?.length) return;

  let filteredLearnings = []
  if(packageData?.learningObjectives && packageData?.learningObjectives?.length>0){
    packageData.learningObjectives.sort((a, b) => { return a?.index - b?.index })
    filteredLearnings = packageData.learningObjectives.map((objective) => {
      return objective?.value
    })
  }

  return (
    <div className={styles.contentWrapper}>
      <Tabs size="xl" variant="button">
        <TabList>
          <Tab>Learnings</Tab>
          <Tab>Career</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Learnings learnings={filteredLearnings} />
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
