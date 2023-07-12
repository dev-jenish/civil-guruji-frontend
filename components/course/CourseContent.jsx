import { modules } from "@/helpers/constants";
import styles from "@/styles/CourseDetail.module.css";
import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
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
import { BiLock } from "react-icons/bi";

export default function CourseContent({ contents, style, meetingsData }) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  let totalVideos = 0
  let totalDocuments = 0
  let totalModels = 0

  if (contents && contents?.length > 0) {
    contents?.map((module) => {
      if (module?.totalVideos) {
        totalVideos += module?.totalVideos
      }
      if (module?.totalDocuments) {
        totalDocuments += module?.totalDocuments
      }
      if (module?.totalModels) {
        totalModels += module?.totalModels
      }
    })
  }
  const activeTabColor = useColorModeValue("#DE076E", "#DE076E");

  if (!modules?.length) return;

  

  return (
    <div style={style} className={styles.contentWrapper}>
      <Tabs
        size="xl"
        index={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList className={styles.contentWrapper} style={{marginTop: "20px"}}>
          <Tab _selected={{ color: activeTabColor, borderBottom: `2px solid ${activeTabColor}` }} >Course Content</Tab>
          <Tab _selected={{ color: activeTabColor, borderBottom: `2px solid ${activeTabColor}` }} >Live Doubt Session</Tab>
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
            {
              meetingsData?.length>0 ?
              meetingsData.map((meetingData, index) => {
                return <SessionCard key={index} meetingData={meetingData} fromDetails />
              })
              :
              <Text>No live sessions till now.</Text>
            }
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
  const [isVideoOpen, setIsVideoOpen] = useState(null)


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
          {module.courseSubContents && module.courseSubContents.map((topic, i) => {


            return <Box
              // href={"/course/blockchain-developer-course/SbW4TyVYeZrW73avAYbY"}
              key={i}
              borderBottom={'1px solid #1a1a1a'}
            >
              <div className={styles.topic}>
                <BiLock className={styles.accIcon} />
                <p>{topic.name}</p>
                {
                  topic?.type == 1 &&
                  <Button variant={'outline'} onClick={() => setIsVideoOpen(isVideoOpen == i ? null : i)} marginLeft={'auto'} size={'sm'} >Preview</Button>
                }
              </div>
              {
                topic?.type == 1 && (isVideoOpen == i) &&
                <div style={{ margin: '0.7rem' }} >
                  <iframe
                    src={'https://iframe.mediadelivery.net/embed/42375/03a64964-f428-4638-b044-6d172f48f4ea?autoplay=true'}
                    title="How does a blockchain work?"
                    // allow="autoplay"
                    allowFullScreen
                    controls="false"
                    borderRadius="8px"
                  ></iframe>
                </div>
              }
            </Box>
          })}
        </div>
        
      )}
    </div>
  );

}

