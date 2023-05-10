import { modules } from "@/helpers/constants";
import styles from "@/styles/CourseDetail.module.css";
import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import {
  AiOutlineDown,
  AiOutlineFile,
  AiOutlineUp,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import { BsLaptop } from "react-icons/bs";
import { IoMdRadioButtonOff } from "react-icons/io";
import SessionCard from "./SessionCard";

export default function CourseContent({ contents }) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  let totalVideos = 0
  let totalDocuments = 0
  let totalModels = 0

  if(contents && contents?.length > 0){
    contents?.map((module) => {
      if(module?.totalVideos){
        totalVideos += module?.totalVideos
      }
      if(module?.totalDocuments){
        totalDocuments += module?.totalDocuments
      }
      if(module?.totalModels){
        totalModels += module?.totalModels
      }
    })
  }

  if (!modules?.length) return;
  return (
    <div className={styles.contentWrapper}>
      <Tabs
        size="xl"
        variant="button"
        index={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList>
          <Tab>Course Content</Tab>
          <Tab>Live Doubt Session</Tab>
          {!tabIndex ? (
            <Tab isDisabled marginLeft="auto">
              <span id={styles.longTab}>
                <span className={styles.gap}>
                  <p>{totalVideos}</p>
                  <AiOutlineVideoCamera />
                </span>
                <span className={styles.gap}>
                  <p>{totalModels}</p>
                  <BsLaptop />
                </span>
                <span className={styles.gap}>
                  <p>{totalDocuments}</p>
                  <AiOutlineFile />
                </span>
              </span>
            </Tab>
          ) : null}
        </TabList>

        <TabPanels>
          <TabPanel>
            <Modules modules={contents} />
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

function Modules({ modules }) {
  return (
    <div className={styles.modules}>
      {modules && modules.map((module, i) => (
        <Accordian key={i + 1} module={module} />
      ))}
    </div>
  );
}

function Accordian({ module }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ marginBottom: isOpen ? 16 : 0 }} className={styles.accordian}>
      <div onClick={handleClick} className={styles.accordianHeading}>
        <p>{module.courseContentName}</p>
        <span id={styles.longTab}>
          <span className={styles.gap}>
            <p>{module?.totalVideos}</p>
            <AiOutlineVideoCamera />
          </span>
          <span className={styles.gap}>
            <p>{module?.totalModels}</p>
            <BsLaptop />
          </span>
          <span className={styles.gap}>
            <p>{module?.totalDocuments}</p>
            <AiOutlineFile />
          </span>
        </span>
        {isOpen ? (
          <AiOutlineUp className={styles.accIcon} />
        ) : (
          <AiOutlineDown className={styles.accIcon} />
        )}
      </div>
      {isOpen && (
        <div className={styles.topics}>
          {module.courseSubContents && module.courseSubContents.map((topic, i) => (
            <Link
              href={"/course/blockchain-developer-course/SbW4TyVYeZrW73avAYbY"}
              key={i}
            >
              <div className={styles.topic}>
                {/* <IoIosRadioButtonOn className={styles.accIcon} /> */}
                <IoMdRadioButtonOff className={styles.accIcon} />
                <p>{topic.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
