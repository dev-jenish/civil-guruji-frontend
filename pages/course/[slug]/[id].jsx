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
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsStar } from 'react-icons/bs';
import {AiOutlineLock, AiOutlineUnlock} from 'react-icons/ai';
import { Progress } from "@chakra-ui/react";


// import myImage from "./assets/learner-logo.png";

import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
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
import CommentsSection from "@/components/comments/Comments";
// import VideoPlayer from "@/components/Player";
import { userContext } from "@/context/userContext";
import moment from "moment";
import FinalQuizComponent from "@/components/course/FinalQuizComponent";

export default function Topic({ topic, course }) {
  const router = useRouter()

  const { userData } = useContext(userContext)

  // const courseId = "64532c7adb65b45ce71ec505";
  const [courseId, setCourseId] = useState('');
  const [courseProgressionId, setCourseProgressionId] = useState('')
  const [courseProgressionData, setCourseProgressionData] = useState({})
  // const courseId = "645f61fa62124b49514c2054";

  const [courseData, setCourseData] = useState({});
  const [selectedTopic, setSelectedTopic] = useState({
    module: {},
    subModule: {},
    moduleIndex: 0,
    subModuleIndex: 0,
    isLive: false,
    isFinalQuiz: false,
    finalQuizData: {},
    liveData: {}
  });
  const [videoProgeress, setVideoProgress] = useState(0);
  const [learningPercentage, setLearningPercentage] = useState(0);
  const [savedPro, setSavedPro] = useState(0);
  const [disableNext, setDisableNext] = useState(false);
  const [disablePrevious, setDisablePrevious] = useState(false)

  const [commentsData, setCommentsData] = useState([
    {
      "_id": "647f8077c26674498d37578f",
      "userId": {
        "_id": "6477c2dc8e0bfc4ca2b7a711",
        "phoneNumber": "7201021242",
        "userActivity": [
          "6477c2dc8e0bfc4ca2b7a716"
        ],
        "roles": [],
        "purchases": [
          "647cf4e63dd0adc62c7eded9",
          "647cf78d3fcd0c0ae6f46a8e"
        ],
        "userQuizDetail": [],
        "__v": 0,
        "userDetail": {
          "_id": "6477c2dc8e0bfc4ca2b7a714",
          "name": "Jenish Dobariya",
          "email": "jenishdpc66@gmail.com",
          "recommendations": [
            "6338f7a32fd6ad4b605b498c",
            "6338f7c12fd6ad4b605b498d",
            "6338f7a32fd6ad4b605b498c",
            "6338f93c113a31ae73c4b0ce",
            "63ce728e812316d47d3acf42",
            "63cf7f09ce7a758b4e50c24c"
          ],
          "username": "jenish12",
          "profile_picture": "",
          "location": "",
          "date_of_birth": "2003-12-06T00:00:00.000Z",
          "year_of_passing": 2024,
          "__v": 0
        }
      },
      "text": "good",
      "subModuleId": "638b958028a637752b73416c",
      "createdAt": "2023-06-06T18:52:40.005Z",
      "updatedAt": "2023-06-06T19:32:09.507Z",
      "__v": 0
    },
    {
      "_id": "647f821adfefc67a24920429",
      "userId": {
        "_id": "6477c2dc8e0bfc4ca2b7a711",
        "phoneNumber": "7201021242",
        "userActivity": [
          "6477c2dc8e0bfc4ca2b7a716"
        ],
        "roles": [],
        "purchases": [
          "647cf4e63dd0adc62c7eded9",
          "647cf78d3fcd0c0ae6f46a8e"
        ],
        "userQuizDetail": [],
        "__v": 0,
        "userDetail": {
          "_id": "6477c2dc8e0bfc4ca2b7a714",
          "name": "Jenish Dobariya",
          "email": "jenishdpc66@gmail.com",
          "recommendations": [
            "6338f7a32fd6ad4b605b498c",
            "6338f7c12fd6ad4b605b498d",
            "6338f7a32fd6ad4b605b498c",
            "6338f93c113a31ae73c4b0ce",
            "63ce728e812316d47d3acf42",
            "63cf7f09ce7a758b4e50c24c"
          ],
          "username": "jenish12",
          "profile_picture": "",
          "location": "",
          "date_of_birth": "2003-12-06T00:00:00.000Z",
          "year_of_passing": 2024,
          "__v": 0
        }
      },
      "text": "hii",
      "subModuleId": "638b958028a637752b73416c",
      "createdAt": "2023-06-06T18:59:38.310Z",
      "updatedAt": "2023-06-06T19:11:26.497Z",
      "__v": 0
    }
  ])

  const [meetingsData, setMeetingsData] = useState([])


  const getMeetingsData = async () => {
    try{
      let response = await api(`/zoom/listMeetings/${courseId}`, 'get')
      if(response?.data?.length>0){
        setMeetingsData(response?.data)
      }
    }catch(error){
      console.log(error)
    }
  }

  const saveSubModuleProgress = async (subModuleId) => {
    try{
      let response = await api('/course/save-subModule-progression', 'post', {
        subModuleId,
        courseId,
        courseProgressionId: courseProgressionData?._id
      })


      getCourseProgressionData()

    }catch(error){
      console.log(error)
    }
  }



  const getCourseProgressionData = async () => {
    try {
      let response = await api('/course/get-progress', 'post', {
        courseId
      })

      if(response?.data){
        setCourseProgressionData(response?.data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  let playerRef = useRef(null);

  const handleNextModule = () => {
    const nextSubModule = courseData?.courseDetail?.courseContents[selectedTopic?.moduleIndex]?.courseSubContents[selectedTopic?.subModuleIndex + 1]
    if (nextSubModule) {
      setSelectedTopic({
        module: courseData?.courseDetail?.courseContents[selectedTopic?.moduleIndex],
        subModule:
          courseData?.courseDetail?.courseContents[selectedTopic?.moduleIndex]?.courseSubContents[selectedTopic?.subModuleIndex + 1],
        moduleIndex: selectedTopic?.moduleIndex,
        subModuleIndex: selectedTopic?.subModuleIndex + 1,
        isLive: false
      });
    } else {
      const nextModule = courseData?.courseDetail?.courseContents[selectedTopic?.moduleIndex + 1]
      if (nextModule) {
        const subModuleExists = courseData?.courseDetail?.courseContents[selectedTopic?.moduleIndex + 1]?.courseSubContents[0]
        if (subModuleExists) {
          setSelectedTopic({
            module: courseData?.courseDetail?.courseContents[selectedTopic?.moduleIndex + 1],
            subModule:
              courseData?.courseDetail?.courseContents[selectedTopic?.moduleIndex + 1]?.courseSubContents[0],
            moduleIndex: selectedTopic?.moduleIndex + 1,
            subModuleIndex: 0,
            isLive: false
          });
        }
      }
    }
  }

  const handlePreviousModule = () => {
    const previousSubModule = courseData?.courseDetail?.courseContents[selectedTopic?.moduleIndex]?.courseSubContents[selectedTopic?.subModuleIndex - 1]
    // console.log(previousSubModule, selectedTopic?.moduleIndex)
    if (previousSubModule) {
      setSelectedTopic({
        module: courseData?.courseDetail?.courseContents[selectedTopic?.moduleIndex],
        subModule:
          courseData?.courseDetail?.courseContents[selectedTopic?.moduleIndex]?.courseSubContents[selectedTopic?.subModuleIndex - 1],
        moduleIndex: selectedTopic?.moduleIndex,
        subModuleIndex: selectedTopic?.subModuleIndex - 1,
        isLive: false
      });
    } else {
      const previousModule = courseData?.courseDetail?.courseContents[selectedTopic?.moduleIndex - 1]
      if (previousModule) {
        const subModuleExists = courseData?.courseDetail?.courseContents[selectedTopic?.moduleIndex - 1]?.courseSubContents[courseData?.courseDetail?.courseContents[selectedTopic?.moduleIndex - 1]?.courseSubContents?.length - 1]
        if (subModuleExists) {
          setSelectedTopic({
            module: courseData?.courseDetail?.courseContents[selectedTopic?.moduleIndex - 1],
            subModule:
              courseData?.courseDetail?.courseContents[selectedTopic?.moduleIndex - 1]?.courseSubContents[courseData?.courseDetail?.courseContents[selectedTopic?.moduleIndex - 1]?.courseSubContents?.length - 1],
            moduleIndex: selectedTopic?.moduleIndex - 1,
            subModuleIndex: courseData?.courseDetail?.courseContents[selectedTopic?.moduleIndex - 1]?.courseSubContents?.length - 1,
            isLive: false
          });
        }
      }
    }
  }

  useEffect(() => {
    if(selectedTopic?.subModule?._id && !selectedTopic?.subModule?.quiz){
      if(!(courseProgressionData?.subModules?.find((subModuleData) => {

        return subModuleData?.subModule == selectedTopic?.subModule?._id
      }))){
        saveSubModuleProgress(selectedTopic?.subModule?._id)
      }


    }
  }, [selectedTopic])

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
    if (courseId) {
      getCourseData();
      getVideoProgress();
      getLearningPercentage();
      getMeetingsData();
      getCourseProgressionData();
    }
  }, [courseId]);

  useEffect(() => {
    if (router?.query?.id) {
      setCourseId(router?.query?.id)
    }
  }, [router?.query])

  useEffect(() => {
    if (!userData?._id) {
      router.push(`/login?previous=${document.location.pathname}`)
    }
  }, [])

  useEffect(() => {
    if (courseData?.courseDetail?.courseContents?.length > 0) {
      setSelectedTopic({
        module: courseData?.courseDetail?.courseContents[0],
        subModule:
          courseData?.courseDetail?.courseContents[0]?.courseSubContents[0],
        moduleIndex: 0,
        subModuleIndex: 0,
        isLive: false
      });
    }
  }, [courseData]);

  useEffect(() => {
    if (courseData?.courseDetail?.courseContents?.length > 0) {
      if (selectedTopic?.module) {
        let maxModuleIndex = courseData?.courseDetail?.courseContents.length - 1
        let maxSubModuleIndex = courseData?.courseDetail?.courseContents[maxModuleIndex]?.courseSubContents?.length - 1

        if ((selectedTopic?.moduleIndex == maxModuleIndex) && (selectedTopic?.subModuleIndex == maxSubModuleIndex)) {
          setDisableNext(true)
        } else {
          disableNext && setDisableNext(false)
        }

        if ((selectedTopic?.moduleIndex == 0) && (selectedTopic?.subModuleIndex == 0)) {
          !disablePrevious && setDisablePrevious(true)
        } else {
          disablePrevious && setDisablePrevious(false)
        }

      }
    }
  }, [courseData, selectedTopic])

  // new added for customheader
  const customHeader = (
    <div>
    <div className={styles.customHeader}>
    <div style={{display:"flex"}}>
      <div>
        <Link href="/">
        <h1 style={{marginRight:"20px"}}>Logo</h1>
        {/* <img src={myImage} alt="alternative-text"></img> */}
        </Link>
      </div>
      <div>
       <h2>{courseData.name}</h2>
       <div style={{display:"flex", alignItems:"center"}}>       
        <p className={styles.rateFont}>Rate This Course</p>
        <span className={styles.headerSpan}>
        <BsStar />
        <BsStar />
        <BsStar />
        <BsStar />
        <BsStar />
        </span>
      </div>
      </div>
    </div>
      <div className={styles.buttonWithDate} >
      <div style={{display:"flex", alignItems:"center",gap:"10px"}}>
        <span style={{display:"flex", gap:"5px"}}>
          <AiOutlineUnlock/>
          <AiOutlineLock/>
          <AiOutlineLock/>
          <AiOutlineLock/>
        </span>
        <p style={{marginRight:"10px"}}>Lifetime</p>
        </div>
        <div>
          <Button style={{backgroundColor:"#E01C46", color:"white"}}>PAY EMI</Button>
          <p style={{ fontSize: "0.75rem" }}>06 | May | 2023</p>
        </div>
      </div>
    </div>
    <div>
    <Progress value={100} colorScheme="red" width={100} height={2}  />
    </div>    
    </div>
  );

  const data = [
    {
      userId: '02b',
      comId: '017',
      fullName: 'Lily',
      userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
      text: 'I think you have a point🤔',
      avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
      replies: []
    }
  ]

  const iframeRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {

    if (iframeRef?.current) {

      const iframe = iframeRef.current;

      const onLoad = () => {
        const iframeContent = iframe.contentWindow;
        const iframeDocument = iframeContent.document;
        const video = iframeDocument.getElementById('my-video');

        videoRef.current = video;

        // Work with the video element
        console.log(video.src); // Example: output the source URL of the video
      };

      const iframeContent = iframe.contentWindow;
      const iframeDocument = iframeContent.document;
      const video = iframeDocument.getElementById('my-video');

      videoRef.current = video;

      // Work with the video element
      console.log(video.src); // Example: output the source URL of the video

      iframe.addEventListener('load', onLoad);

      return () => {
        iframe.removeEventListener('load', onLoad);
      };
    }

  }, [iframeRef?.current]);

  return (
    <Layout customHeader={customHeader}>
      <div className={styles.container}>
        <SideNav
        courseData={courseData}
          savedPro={savedPro}
          learningPercentage={learningPercentage}
          videoProgeress={videoProgeress}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          modules={courseData?.courseDetail?.courseContents || []}
          meetingsData={meetingsData}
          setMeetingsData={setMeetingsData}
          courseProgressionData={courseProgressionData}
        />
        {
          selectedTopic?.isLive ?
          <ZoomComponent join_url={selectedTopic?.liveData?.join_url} liveData={selectedTopic?.liveData} meetingNumber={selectedTopic?.liveData?.id} username={userData?.userDetail?.name} password={selectedTopic?.liveData?.password} selectedTopic={selectedTopic} />
          :
          selectedTopic?.isFinalQuiz ?
          <FinalQuizComponent finalQuizData={selectedTopic?.finalQuizData} courseProgressionData={courseProgressionData} courseId={courseId} getCourseProgressionData={getCourseProgressionData} />
          :
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
              <Button leftIcon={<BsArrowLeft />} onClick={handlePreviousModule} variant="outline" mt={2} isDisabled={disablePrevious}>
                Previous
              </Button>
            </div>
            <div className={styles.next}>
              <Button
                rightIcon={<BsArrowRight />}
                isDisabled={disableNext}
                variant="outline"
                mt={2}
                onClick={handleNextModule}
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
                  // url={'https://d1wxh31cdpnls0.cloudfront.net/file_library/videos/channel_vod_non_drm_hls/168657483492057856100/168657483492057856100_7856100.m3u8'}
                  width={"100%"}
                  height={"100%"}
                  playing={true}
                  controls={true}
                  onProgress={(event) => handleProgress(event)}
                  ref={playerRef}
                  onReady={() => {
                    if (!loaded) {
                      handleSeek(videoProgeress)
                      loaded = true
                    }
                  }}
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload', // Disable download when right-clicking on the video
                        onContextMenu: (e) => e.preventDefault()
                      },
                    },
                    hlsOptions: {
                      maxBufferLength: 30,
                      maxMaxBufferLength: 600,
                      enableWorker: true,
                      enableSoftwareAES: false,
                      manifestLoadingTimeOut: 10000,
                      levelLoadingTimeOut: 10000,
                      levelController: {
                        enable: true,
                        enableLowestBitrate: true,
                      },
                    },
                  }}
                  
                >
                </ReactPlayer>



                {/* <VideoPlayer liveURL={'https://d1i60clb34cfd8.cloudfront.net/file_library/videos/vod_non_drm_ios/3379331/1681111896_7814626759912629/1681111660844_477738947662471940_video_VOD.m3u8'} /> */}

                {/* <iframe ref={iframeRef} src="https://www.videocrypt.com/website/player_code?id=3572813_0_4733329350030435" ></iframe> */}
                {/* <iframe src='https://www.videocrypt.com/website/player_code?id=3572813_0_4733329350030435' title="VideoCrypt Video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" style="width:100%"></iframe> */}
                <div style={{ opacity: "0.2", position: "absolute", left: "50%", top: "50%", transform: 'translate(-50%, -50%)', color: "black" }} >
                  <p>7201021241</p>
                  <p>jenishdpc66@gmail.com</p>
                </div>
              </div>
            )
          }

          {selectedTopic?.subModule?.type == 5 && (
            <div className={styles.iframe}>
              <QuizComponent saveSubModuleProgress={saveSubModuleProgress} courseProgressionData={courseProgressionData} subModule={selectedTopic?.subModule} courseId={courseId} getCourseProgressionData={getCourseProgressionData} />
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
                {selectedTopic?.subModule?.type == 1 && selectedTopic?.subModule?.modelUrl && <Tab>
                  <span className={styles.tab}>
                    <BiCube />
                    <p>3D Models</p>
                  </span>
                </Tab>}
                {
                  selectedTopic?.subModule?.attachments && selectedTopic?.subModule?.attachments?.length > 0 && <Tab>
                    <span className={styles.tab}>
                      <ImAttachment />
                      <p>Attachment</p>
                    </span>
                  </Tab>
                }

                <Tab>
                  <span className={styles.tab}>
                    <BsPlayBtn />
                    <p>Comments</p>
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
                  {selectedTopic?.subModule?.description && <p dangerouslySetInnerHTML={{ __html: selectedTopic?.subModule?.description }} ></p>}
                  {!selectedTopic?.subModule?.description && <p>No description...</p>}
                </TabPanel>
                {/* <TabPanel>
                  <p>Comment Coming Soon!</p>
                </TabPanel> */}
                {selectedTopic?.subModule?.type == 1 && selectedTopic?.subModule?.modelUrl && <TabPanel>
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
                {
                  selectedTopic?.subModule?.attachments && selectedTopic?.subModule?.attachments?.length > 0 &&
                  (<TabPanel>
                    {selectedTopic?.subModule?.attachments.map((attachment, index) => {
                      return <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }} >
                        {/* <div> */}
                        <span>{index + 1 + ". "}</span>
                        <span style={{ marginRight: "1rem", marginLeft: '6px' }} >{attachment?.label}</span>
                        {/* </div> */}
                        <a target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#D6BCFA', padding: "5px 10px", color: "black", borderRadius: '5px' }} href={attachment?.data}>Download</a>
                      </div>
                    })}
                  </TabPanel>)
                }
                <TabPanel>

                  <CommentsSection comments={commentsData} setCommentsData={setCommentsData} userId={userData?._id} subModuleId={selectedTopic?.subModule?._id} />


                  {/* <div>
                  <div className="comment_container" style={{ width: '100%', maxWidth: '500px' }} >
                    <div className="comment_doubt_container" style={{ display: 'flex' }} >
                      <div style={{ marginRight: '1rem' }}  >
                        <div className={styles.profile_container} >
                          <img src="https://ui-avatars.com/api/?background=random&name=John-fe&rounded=true" alt="" srcset="" />
                        </div>
                      </div>
                      <div className="details_container" style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '0.5rem' }} >
                        <div className="" style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }} >
                          <div style={{ display: 'flex', flexDirection: 'column' }} >
                            <span className="name" style={{ fontSize: '18px', fontWeight: '500' }} >Jenish</span>
                            <span className="date" style={{ fontSize: '14px' }} >Yesterday</span>
                          </div>
                          <div>
                            <span>reply</span>
                          </div>
                        </div>
                        <span className="comment_text">Member’s Comment XYZ</span>
                        <span>2 replies</span>
                      </div>
                    </div>
                    <div className="comment_reply_container" style={{ display: 'flex', paddingLeft: '3rem', marginTop: '2rem' }} >
                      <div style={{ marginRight: '1rem' }}  >
                        <div className={styles.profile_container} >
                          <img src="https://ui-avatars.com/api/?background=random&name=John-lo&rounded=true" alt="" srcset="" />

                        </div>
                      </div>
                      <div className="details_container" style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '0.5rem' }} >
                        <div className="" style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }} >
                          <div style={{ display: 'flex', flexDirection: 'column' }} >
                            <span className="name" style={{ fontSize: '18px', fontWeight: '500' }} >Jenish</span>
                            <span className="date" style={{ fontSize: '14px' }} >Yesterday</span>
                          </div>
                          <div>
                            <span style={{ display: 'flex', gap: '1rem' }} >
                              <button style={{ border: '1px solid white', padding: '0.2rem' }} >Add reply</button>
                              <button style={{ border: '1px solid white', padding: '0.2rem' }} >Satisfied</button>
                            </span>
                          </div>
                        </div>
                        <span className="comment_text">Member’s Comment XYZ</span>
                      </div>
                    </div>
                  </div>
                </div> */}
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

        }
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
  meetingsData,
  courseProgressionData,
  courseData
}) {
  const [showNav, setShowNav] = useState(false);
  const [canGiveFinalQuiz, setCanGiveFinalQuiz] = useState(false)
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const handleNav = () => {
    setShowNav(!showNav);
  };

  const handleBack = () => {
    router.push(`/course/Blockchain Developer course`);
  };

  useEffect(() => {
    
    let courseSubModulesLength = 0
    courseData?.courseDetail?.courseContents?.length>0 && courseData?.courseDetail?.courseContents.forEach((courseContent) => {
      if(courseContent?.courseSubContents?.length>0){
        courseSubModulesLength += courseContent?.courseSubContents?.length
      }
    })

    let savedProgressSubModulesLength = 0
    if(courseProgressionData?.subModules?.length>0){
      savedProgressSubModulesLength += courseProgressionData?.subModules?.length
    }
    console.log(courseSubModulesLength, savedProgressSubModulesLength)

    if(courseSubModulesLength == savedProgressSubModulesLength){
      if(!canGiveFinalQuiz){
        setCanGiveFinalQuiz(true)
      }
    }else{
      if(canGiveFinalQuiz){
        setCanGiveFinalQuiz(false)
      }
    }

  }, [courseData, courseProgressionData])

  let searchModules = modules.filter((module) => {
    let bool = false;
    module.courseSubContents.forEach((topic) => {
      if (topic?.name?.toLowerCase().includes(search.toLowerCase()))
        bool = true;
    });

    return bool;
  });

  const handleAttemptFinalQuiz = () => {
    setSelectedTopic({
      isFinalQuiz: true,
      finalQuizData: courseData?.finalQuiz
    })
  }

  const handleDownloadCertificate = async () => {
    try{
      setIsLoading(true)
      const response = await api(`/certificates/generate/${courseData?.courseDetail?.certificate?._id}`, 'post', {
        courseId: courseData?._id
      }, {}, {
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(response.data)
      console.log(url, ' <== = I am url')
      window.open(url);
    }catch(error){
      console.log(error)
      toast.error('Error happened while downloading certificate!')
    }finally{
      setIsLoading(false)
    }
  }

  const activeTabColor = useColorModeValue("#DE076E", "#DE076E");

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
        <Tabs
        size="xl"      >
            <TabList>
              <Tab _selected={{ color: activeTabColor, borderBottom: `2px solid ${activeTabColor}` }} >
                  <p>Content</p>
              </Tab>
              <Tab _selected={{ color: activeTabColor, borderBottom: `2px solid ${activeTabColor}` }} >
                  <p>Live Class</p>
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
                      moduleIndex={i}
                      module={module}
                      selectedTopic={selectedTopic}
                      setSelectedTopic={setSelectedTopic}
                      courseProgressionData={courseProgressionData}
                    />
                  ))}
                </div>
              </TabPanel>
              <TabPanel>
                {
                  meetingsData?.length>0 ?
                  meetingsData.map((meetingData, index) => {
                    return <SessionCard key={index} meetingData={meetingData} isLive={moment().isAfter(moment(meetingData?.start_time))} setSelectedTopic={setSelectedTopic} />
                  })
                  :
                  <Text>No meetings scheduled!</Text>
                }
                {/* <SessionCard />
                <SessionCard /> */}
              </TabPanel>
            </TabPanels>
          </Tabs>
          <div className={styles.stickyButton}>
          {
            canGiveFinalQuiz ?
            <Button onClick={handleAttemptFinalQuiz} className={styles.downloadBtn} style={{marginBottom:"0px"}}>Attempt Final Quiz</Button>
            :
            <Button isDisabled className={styles.downloadBtn} >Attempt Final Quiz</Button>
          }
          {
            courseProgressionData?.completedOn &&
            <Button isLoading={isLoading} onClick={handleDownloadCertificate} className={styles.downloadBtn}>Download Certificate</Button>
          }
        </div>
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
  moduleIndex,
  courseProgressionData
}) {
  const [showTopics, setShowTopics] = useState(true);
  const router = useRouter();

  const [doneTopics, setDoneTopics] = useState(0)

  const handleSwitch = () => {
    setShowTopics(!showTopics);
  };

  const id = router.query.id;

  useEffect(() => {

    let count = 0

    courseProgressionData?.subModules?.map((subModuleData) => {


      module.courseSubContents.map((topic) => {
        if(topic?._id == subModuleData?.subModule){
          count += 1
        }
      })
    })

    setDoneTopics(count)
  }, [courseProgressionData])

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
            {doneTopics}/
            {module.courseSubContents &&
              (module.courseSubContents?.length || 0)}
          </p>
          <BsPlayBtn />
        </span>
      </div>
      {showTopics && (
        <div style={{ marginBottom: 20 }} className={styles.topics}>
          {module.courseSubContents.map((topic, index) => {

            let isCompleted = courseProgressionData?.subModules?.find((subModuleData) => {
              return subModuleData?.subModule == selectedTopic?.subModule?._id
            })

            return (
              <div
                key={topic._id}
                className={`${styles.topic} ${selectedTopic?.subModule === topic
                  ? styles.activeSubmodule
                  : ""
                  }`}
                onClick={() => {
                  setSelectedTopic({ module: module, subModule: topic, subModuleIndex: index, moduleIndex, isLive: false });
                }}
              >
                {topic?.type == 1 ? (
                  <IoMdRadioButtonOn
                    className={styles.accIcon}
                    style={
                      courseProgressionData?.subModules?.find((subModuleData) => {
                        return subModuleData?.subModule == topic?._id
                      })
                      ?
                      { color: 'green' }
                      :
                      {}
                    }
                  />
                )
                :
                courseProgressionData?.subModules?.find((subModuleData) => {
                  return subModuleData?.subModule == topic?._id
                })
                ?
                (
                  <IoMdRadioButtonOn
                    className={styles.accIcon}
                    style={
                      { color: 'green' }
                    }
                  />
                )
                :
                (
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


// savedPro > videoProgeress
                      //   ? ((savedPro >= learningPercentage) || courseProgressionData?.subModules?.find((subModuleData) => {
                      //     return subModuleData?.subModule == selectedTopic?.subModule?._id
                      //   }))
                      //     ? { color: "green" }
                      //     : savedPro < learningPercentage && savedPro > 0
                      //       ? { color: "orange" }
                      //       : {}
                      //   : videoProgeress * 100 >= learningPercentage
                      //     ? { color: "green" }
                      //     : videoProgeress * 100 < learningPercentage &&
                      //       videoProgeress * 100 > 0
                      //       ? { color: "orange" }
                      //       (courseProgressionData?.subModules?.find((subModuleData) => {
                      //         return subModuleData?.subModule == selectedTopic?.subModule?._id
                      //       })) 
                      //       ?
                      //       { color: 'green' }
                      //       : 
                      //       {}
                      //       :
                      //       {}