import Quiz from "@/components/course/Quiz";
import SessionCard from "@/components/course/SessionCard";
import Layout from "@/components/reusable/Layout";
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
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
import ReactPlayer from "react-player";
import { api } from "utils/urls";
import { toast } from "react-hot-toast";
import QuizComponent from "@/components/course/QuizComponent";
import ZoomComponent from "@/components/zoom/ZoomComponent";

export default function Topic({ topic, course }) {
  const courseId = "64532c7adb65b45ce71ec505";
  // const courseId = "645f61fa62124b49514c2054";

  const [courseData, setCourseData] = useState({});
  const [selectedTopic, setSelectedTopic] = useState({
    module: {},
    subModule: {},
  });
  const [videoProgeress, setVideoProgress] = useState(0);
  const [learningPercentage, setLearningPercentage] = useState(0);
  const [savedPro, setSavedPro] = useState(0);

  const iframeRef = useRef(null);
  let playerRef = useRef(null);

  const getLearningPercentage = async () => {
    try {
      let response = await api(`/course/learningPercentage`, "get");
      if (response?.data?.learningPercentage) {
        setLearningPercentage(response?.data?.learningPercentage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCourseData = async () => {
    try {
      let response = await api(`/course/course-details/${courseId}`, "get");
      if (response?.data?._id) {
        setCourseData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveProgress = async (progress) => {
    try {
      let response = await api("/course/video/progress", "post", {
        progress,
        id: "645de6877a142bdcdbe3d9a4",
      });
      // toast.success("Progress saved!");
    } catch (error) {
      console.log(error);
      toast.error("Error happened while saving progress!");
    }
  };

  const handleProgress = async (event) => {
    const newPlayedPercent = event.played;
    // Check if the video has been played to 20%
    if (newPlayedPercent >= 0.2 && savedPro < 20 && videoProgeress < 0.2) {
      // Call method for 20% point
      await handleSaveProgress(0.2);
      setSavedPro(20);
    }

    // Check if the video has been played to 45%
    if (newPlayedPercent >= 0.45 && savedPro < 45 && videoProgeress < 0.45) {
      // Call method for 45% point
      await handleSaveProgress(0.45);
      setSavedPro(45);
    }

    // Check if the video has been played to 60%
    if (newPlayedPercent >= 0.6 && savedPro < 60 && videoProgeress < 0.6) {
      // Call method for 60% point
      await handleSaveProgress(0.6);
      setSavedPro(60);
    }

    // Check if the video has been played to 80%
    if (newPlayedPercent >= 0.8 && savedPro < 80 && videoProgeress < 0.8) {
      // Call method for 80% point
      await handleSaveProgress(0.8);
      setSavedPro(80);
    }

    // Check if the video has been played to 100%
    if (newPlayedPercent >= 1 && savedPro < 100 && videoProgeress < 1) {
      // Call method for 80% point
      await handleSaveProgress(1);
      setSavedPro(100);
    }
  };

  const getVideoProgress = async () => {
    try {
      let response = await api("/course/video/progress", "get");
      handleSeek(response?.data?.progress);
      setVideoProgress(response?.data?.[0]?.progress);
      // saved=response?.data?.[0]?.progress
      setSavedPro(response?.data?.[0]?.progress * 100);
    } catch (error) {
      console.log(error);
      toast.error("Error happened while fetching saved progress!");
    }
  };

  function handleSeek(progress) {
    if (playerRef.current) {
      playerRef.current.seekTo(progress, "fraction");
    }
  }

  let loaded = false;

  useEffect(() => {
    getCourseData();
    getVideoProgress();
    getLearningPercentage();
  }, []);

  useEffect(() => {
    if (courseData?.courseDetail?.courseContents?.length > 0) {
      setSelectedTopic({
        module: courseData?.courseDetail?.courseContents[0],
        subModule:
          courseData?.courseDetail?.courseContents[0]?.courseSubContents[0],
      });
    }
  }, [courseData]);

  // new added for customheader
  const customHeader = (
    <div className={styles.customHeader}>
      <Link href="/">
        <h1>Civil Guruji</h1>
      </Link>
      <h2>{courseData.name}</h2>
      <div className={styles.buttonWithDate}>
        <Button style={{ fontSize: "0.90rem" }}>PAY EMI</Button>
        <p style={{ fontSize: "0.75rem" }}>06 | May | 2023</p>
      </div>
    </div>
  );

  return (
    <Layout customHeader={customHeader}>
      <div className={styles.container}>
        <SideNav
          savedPro={savedPro}
          learningPercentage={learningPercentage}
          videoProgeress={videoProgeress}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          modules={courseData?.courseDetail?.courseContents || []}
        />
        <div className={styles.markdown}>
          <div className={styles.breadcrumbs}>
            <Link href="/explore">Explore</Link>
            <span>{">"}</span>
            <Link href="/course/blockchain-developer-course">
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

          <div className={styles.cta}>
            <div className={styles.prev}>
              <Button leftIcon={<BsArrowLeft />} variant="outline" isDisabled mt={2}>
                Previous
              </Button>
            </div>
            <div className={styles.next}>
              <p >Why do we need blockchain?</p>
              <Button
                rightIcon={<BsArrowRight />}
                disabled={false}
                variant="outline"
                mt={2}
                >
                Next
              </Button>
            </div>
          </div>
          {
            selectedTopic?.subModule?.type == 1 && (
              <div className={styles.iframe}>
                <ReactPlayer 
                  url={selectedTopic?.subModule?.url || selectedTopic?.subModule?.videoUrl}
                  width={"100%"}
                  height={"100%"}
                  playing={true}
                  controls={true}
                  onProgress={(event) => handleProgress(event)}
                  ref={playerRef}
                  onReady={() => {if(!loaded){
                    handleSeek(videoProgeress)
                    loaded=true
                  }}}
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload', // Disable download when right-clicking on the video
                        onContextMenu: (e) => e.preventDefault()
                      },
                    },
                  }}
                >
                </ReactPlayer>
                <div style={{ opacity: "0.2", position: "absolute", left: "50%", top: "50%", transform: 'translate(-50%, -50%)', color: "black" }} >
                  <p>7201021241</p>
                  <p>jenishdpc66@gmail.com</p>
                </div>
              </div>
            )
          }

          {selectedTopic?.subModule?.type == 5 && (
            <div className={styles.iframe}>
              <Quiz subModule={selectedTopic?.subModule} />
            </div>
          )}
          {selectedTopic?.subModule?.type == 2 && (
            <div className={styles.iframe}>
              <iframe src={selectedTopic?.subModule?.url || selectedTopic?.subModule?.documentUrl}></iframe>
            </div>
            // <ZoomComponent meetingNumber={'82240134111'} password={'H2r2SC'} username={"from lms"} />
          )}
          {selectedTopic?.subModule?.type == 3 && (
            <div className={styles.iframe}>
              <iframe
                allowfullscreen=""
                frameborder="0"
                height="480"
                loading="lazy"
                src={selectedTopic?.subModule?.url || selectedTopic?.subModule?.modelUrl}
                width="640"
              ></iframe>
            </div>
          )}

          <div className={styles.topicInfo}>
            <Tabs variant="button">
              <TabList>
                <Tab>
                  <span className={styles.tab}>
                    <AiOutlineBulb />
                    <p>Description</p>
                  </span>
                </Tab>
                {/* <Tab>
                  <span className={styles.tab}>
                    <BiCommentDetail />
                    <p>Comment</p>
                  </span>
                </Tab> */}
                {selectedTopic?.subModule?.type == 1 && selectedTopic?.subModule?.modelUrl && <Tab>
                  <span className={styles.tab}>
                    <BiCube />
                    <p>3D Models</p>
                  </span>
                </Tab>}
                {
                  selectedTopic?.subModule?.attachments && selectedTopic?.subModule?.attachments?.length>0 && <Tab>
                    <span className={styles.tab}>
                      <ImAttachment />
                      <p>Attachment</p>
                    </span>
                  </Tab>
                }
                
                {/* <Tab>
                  <span className={styles.tab}>
                    <BsPlayBtn />
                    <p>Live Class</p>
                  </span>
                </Tab> */}
              </TabList>

              <TabPanels>
                <TabPanel>
                  { selectedTopic?.subModule?.description && <p dangerouslySetInnerHTML={{ __html: selectedTopic?.subModule?.description}} ></p>}
                  { !selectedTopic?.subModule?.description && <p>No description...</p>}
                </TabPanel>
                {/* <TabPanel>
                  <p>Comment Coming Soon!</p>
                </TabPanel> */}
                {selectedTopic?.subModule?.type  == 1 && selectedTopic?.subModule?.modelUrl && <TabPanel>
                  <div className={styles.iframe}>
                    <iframe
                      allowfullscreen=""
                      frameborder="0"
                      height="480"
                      loading="lazy"
                      src={selectedTopic?.subModule?.modelUrl}
                      width="640"
                    ></iframe>
                  </div>
                </TabPanel>}
                <TabPanel>
                  {
                    selectedTopic?.subModule?.attachments && selectedTopic?.subModule?.attachments?.length>0 && selectedTopic?.subModule?.attachments.map((attachment, index) => {
                      return <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }} >
                        {/* <div> */}
                        <span>{index + 1 + ". "}</span>
                        <span style={{ marginRight: "1rem", marginLeft: '6px' }} >{attachment?.label}</span>
                        {/* </div> */}
                        <a target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#D6BCFA', padding: "5px 10px", color: "black", borderRadius: '5px' }} href={attachment?.data}>Download</a>
                      </div>
                    })
                  }
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>

          {/* <div className={styles.cta}>
            <div className={styles.prev}>
              <Button leftIcon={<BsArrowLeft />} variant="outline" isDisabled>
                Previous
              </Button>
            </div>
            <div className={styles.next}>
              <Button
                rightIcon={<BsArrowRight />}
                disabled={false}
                variant="outline"
                >
                Next
              </Button>
                <p>Why do we need blockchain?</p>
            </div>
          </div> */}
        </div>
        {/* <Navigator slug={topic.slug} /> */}
      </div>
    </Layout>
  );
}

function SideNav({
  savedPro,
  learningPercentage,
  videoProgeress,
  modules,
  selectedTopic,
  setSelectedTopic,
}) {
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
    module.courseSubContents.forEach((topic) => {
      if (topic?.name?.toLowerCase().includes(search.toLowerCase()))
        bool = true;
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
                    <Accordian
                      savedPro={savedPro}
                      learningPercentage={learningPercentage}
                      videoProgeress={videoProgeress}
                      key={i}
                      module={module}
                      selectedTopic={selectedTopic}
                      setSelectedTopic={setSelectedTopic}
                    />
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
          <Button className={styles.downloadBtn}>Attempt Final Quiz</Button>
        </div>
      </div>
    </>
  );
}

function Accordian({
  savedPro,
  learningPercentage,
  videoProgeress,
  module,
  selectedTopic,
  setSelectedTopic,
}) {
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
          <p>
            0/
            {module.courseSubContents &&
              (module.courseSubContents?.length || 0)}
          </p>
          <BsPlayBtn />
        </span>
      </div>
      {showTopics && (
        <div style={{ marginBottom: 20 }} className={styles.topics}>
          {module.courseSubContents.map((topic) => {
            return (
              <div
                key={topic._id}
                className={`${styles.topic} ${
                  selectedTopic?.subModule === topic
                    ? styles.activeSubmodule
                    : ""
                }`}
                onClick={() => {
                  setSelectedTopic({ module: module, subModule: topic });
                }}
              >
                {topic?.type == 1 ? (
                  <IoMdRadioButtonOn
                    className={styles.accIcon}
                    style={
                      savedPro > videoProgeress
                        ? savedPro >= learningPercentage
                          ? { color: "green" }
                          : savedPro < learningPercentage && savedPro > 0
                          ? { color: "orange" }
                          : {}
                        : videoProgeress * 100 >= learningPercentage
                        ? { color: "green" }
                        : videoProgeress * 100 < learningPercentage &&
                          videoProgeress * 100 > 0
                        ? { color: "orange" }
                        : {}
                    }
                  />
                ) : (
                  <IoMdRadioButtonOff className={styles.accIcon} />
                )}
                <p>{topic?.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
