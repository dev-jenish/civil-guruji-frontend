import Quiz from "@/components/course/Quiz";
import SessionCard from "@/components/course/SessionCard";
import Layout from "@/components/reusable/Layout";
import { modules } from "@/helpers/constants";
import styles from "@/styles/Topic.module.css";
import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Link from "next/link";

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  AiOutlineBulb,
  AiOutlineDown,
  AiOutlineFile,
  AiOutlineUp,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import { BiCommentDetail, BiCube } from "react-icons/bi";
import {
  BsArrowLeft,
  BsArrowRight,
  BsLaptop,
  BsListNested,
  BsPlayBtn,
  BsSearch,
} from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { IoMdRadioButtonOff } from "react-icons/io";
import ReactPlayer from "react-player";
import { api } from "utils/urls";

export default function Topic({ topic, course }) {

  const courseId = "64532c7adb65b45ce71ec505"

  const [courseData, setCourseData] = useState({})
  const [currentTime, setCurrentTime] = useState()
  const [selectedTopic, setSelectedTopic] = useState({ module: {}, subModule: {} })

  const iframeRef = useRef(null)
    
  const getCourseData = async () => {
    try{
      let response = await api(`/course/course-details/${courseId}`, 'get');
      if(response?.data?._id){
        setCourseData(response?.data)
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getCourseData()
  }, [])

  useEffect(() => {
    if(courseData?.courseDetail?.courseContents?.length > 0){
      setSelectedTopic({
        module: courseData?.courseDetail?.courseContents[0],
        subModule: courseData?.courseDetail?.courseContents[0]?.courseSubContents[0]
      })
    }
  }, [courseData])



    // new added for customheader
    const customHeader = <div className={styles.customHeader}>
        <Link href="/">
        <h1>Civil Guruji</h1>
      </Link>
      <div className={styles.buttonWithDate}>
        <Button style={{ fontSize: "0.90rem", height: "1.80rem" }} >PAY EMI</Button>
        <p style={{ fontSize: "0.75rem" }} >06 | May | 2023</p>
      </div>
      </div>

  return (
    <Layout customHeader={customHeader}>
      <div className={styles.container}>
        <SideNav selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} modules={courseData?.courseDetail?.courseContents || []} />
        <div className={styles.markdown}>
          <div className={styles.breadcrumbs}>
            <Link href="/explore">Explore</Link>
            <span>{">"}</span>
            <Link href="/course/blockchain-developer-course">
              {console.log(courseData, "<==== this is course")}
              {courseData?.name}
            </Link>
            <span>{">"}</span>
            <Link
              href={`/course/blockchain-developer-course/SbW4TyVYeZrW73avAYbY`}
            >
              {selectedTopic?.subModule?.name}
            </Link>
          </div>
          <h1 id={styles.title}>{selectedTopic?.subModule?.name}</h1>
          {
            selectedTopic?.subModule?.type == 1 && (
              <div className={styles.iframe}>
                {/* <iframe
                  ref={iframeRef}
                  src="https://iframe.mediadelivery.net/embed/42375/03a64964-f428-4638-b044-6d172f48f4ea?autoplay=true"
                  title="How does a blockchain work?"
                  allow="autoplay"
                  allowFullScreen
                ></iframe> */}
                <ReactPlayer 
                  url='https://civilgurujipvtltd.b-cdn.net/play_720p.mp4'
                  playing={true}
                  controls={true}
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload', // Disable download when right-clicking on the video
                        onContextMenu: (e) => e.preventDefault()
                      },
                    },
                  }}
                />
              </div>
            )
          }

          {
            selectedTopic?.subModule?.type == 5 && (
              <div className={styles.iframe}>
                <Quiz subModule={selectedTopic?.subModule} />
              </div>
            )
          }
          

          <div className={styles.topicInfo}>
            <Tabs variant="button">
              <TabList>
                <Tab>
                  <span className={styles.tab}>
                    <AiOutlineBulb />
                    <p>Description</p>
                  </span>
                </Tab>
                <Tab>
                  <span className={styles.tab}>
                    <BiCommentDetail />
                    <p>Comment</p>
                  </span>
                </Tab>
                <Tab>
                  <span className={styles.tab}>
                    <BiCube />
                    <p>3D Models</p>
                  </span>
                </Tab>
                <Tab>
                  <span className={styles.tab}>
                    <ImAttachment />
                    <p>Attachment</p>
                  </span>
                </Tab>
                {/* <Tab>
                  <span className={styles.tab}>
                    <BsPlayBtn />
                    <p>Live Class</p>
                  </span>
                </Tab> */}
              </TabList>

              <TabPanels>
                <TabPanel>
                  <p>
                    {selectedTopic?.subModule?.description}
                  </p>
                </TabPanel>
                <TabPanel>
                  <p>Coming Soon!</p>
                </TabPanel>
                <TabPanel>
                  <p>Coming Soon!</p>
                </TabPanel>
                <TabPanel>
                  <p>Coming Soon!</p>
                </TabPanel>
                <TabPanel>
                  <SessionCard isLive />
                  <SessionCard />
                  <SessionCard />
                  <SessionCard />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>

          <div className={styles.cta}>
            <div className={styles.prev}>
              <Button leftIcon={<BsArrowLeft />} variant="outline" isDisabled>
                Previous
              </Button>
              <p>Why do we need blockchain?</p>
            </div>
            <div className={styles.next}>
              <Button
                rightIcon={<BsArrowRight />}
                disabled={false}
                variant="outline"
              >
                Next
              </Button>
              <p>Mempool, Polyscan, Etherscan</p>
            </div>
          </div>
        </div>
        {/* <Navigator slug={topic.slug} /> */}
      </div>
    </Layout>
  );
}

function SideNav({ modules, selectedTopic, setSelectedTopic }) {
  const [showNav, setShowNav] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleNav = () => {
    setShowNav(!showNav);
  };

  const handleBack = () => {
    router.push(`/course/Blockchain Developer course`);
  };

  let searchModules = modules.filter((module) => {
    let bool = false;
    console.log(module)
    module.courseSubContents.forEach((topic) => {
      if (topic?.name?.toLowerCase().includes(search.toLowerCase())) bool = true;
    });

    return bool;
  });

  return (
    <>
      <div onClick={handleNav} className={styles.floatBtn}>
        <BsListNested />
      </div>
      <div className={`${styles.nav} ${!showNav ? styles.hide : ""}`}>
        <div onClick={handleBack} className={styles.back}>
          <BsArrowLeft />
          <p>Back To Course Home</p>
        </div>
        <div className={styles.search}>
          <BsSearch className={styles.searchIcon} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search Topic"
          />
        </div>
        {/* new added for tab part and button */}
        <div className={styles.tabWrapper}>
          <Tabs variant="button">
              <TabList>
                <Tab>
                  <span className={styles.tab}>
                    <p>Content</p>
                  </span>
                </Tab>
                <Tab>
                  <span className={styles.tab}>
                    <p>Live Class</p>
                  </span>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                    <div className={styles.modules}>
                      {searchModules.map((module, i) => (
                        <Accordian key={i} module={module} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />
                      ))}
                    </div>
                </TabPanel>
                <TabPanel>
                  <SessionCard isLive />
                  <SessionCard />
                  <SessionCard />
                </TabPanel>
              </TabPanels>
          </Tabs>
          <Button className={styles.downloadBtn}>Download Certificate</Button>
        </div>
      </div>
    </>
  );
}

function Accordian({ module, selectedTopic, setSelectedTopic }) {
  const [showTopics, setShowTopics] = useState(true);
  const router = useRouter();

  const handleSwitch = () => {
    setShowTopics(!showTopics);
  };

  const id = router.query.id;

  return (
    <>
      <div onClick={handleSwitch} className={styles.heading}>
        {showTopics ? (
          <AiOutlineUp className={styles.arrowDown} />
        ) : (
          <AiOutlineDown className={styles.arrowDown} />
        )}
        <p>{module?.courseContentName}</p>
        <span className={styles.gap}>
          <p>0/10</p>
          <BsPlayBtn />
        </span>
      </div>
      {showTopics && (
        <div style={{ marginBottom: 20 }} className={styles.topics}>
          {/* {console.log(module, "<== debug this")} */}
          {module.courseSubContents.map((topic) => {
            
            
            return (
            <div
              key={topic._id}
              className={`${styles.topic} ${
                ''// topic.id === id ? styles.active : ""
              }`}
              onClick={() => {setSelectedTopic({ module: module, subModule: topic })}}
            >
              {/* <IoIosRadioButtonOn className={styles.accIcon} /> */}
              <IoMdRadioButtonOff className={styles.accIcon} />
              <p>{topic?.name}</p>
            </div>
          )})}
        </div>
      )}
    </>
  );
}
