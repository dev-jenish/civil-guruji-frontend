import CourseCarousel from "@/components/course/CourseCarousel";
import CourseContent from "@/components/course/CourseContent";
import CourseFloatCard from "@/components/course/CourseFloatCard";
import CourseInfo from "@/components/course/CourseInfo";
import FeedbackCard from "@/components/course/FeedbackCard";
import Layout from "@/components/reusable/Layout";
import Stars from "@/components/Stars";
import useScrollObserver from "@/hooks/useScrollObserver";
import styles from "@/styles/CourseDetail.module.css";
import { Button, Image, Skeleton, Text } from "@chakra-ui/react";
import moment from "moment/moment";
// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Autoplay, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { api, baseURL } from "utils/urls";
import QuerysForm from "@/components/course/QuerysForm";

export default function CourseDetail({ }) {
  const { ref, visible } = useScrollObserver();
  const router = useRouter();
  const [courseId, setCourseId] = useState("");
  const [courseData, setCourseData] = useState({});
  const [learningDuration, setLearningDuration] = useState({})
  const [totalLearningHours, setTotalLearningHours] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [meetingsData, setMeetingsData] = useState([])


  const getMeetingsData = async () => {
    try {
      let response = await api(`/zoom/listMeetings/${courseId}`, 'get')
      if (response?.data?.length > 0) {
        setMeetingsData(response?.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (router?.query?.slug) {
      setCourseId(router.query?.slug);
    }
  }, [router.query]);

  const getCourseData = async (id) => {
    try {
      setIsLoading(true)
      let response = await api(`/course/course-details/${id}`, "get");
      if (response?.data) {
        setCourseData(response?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Course details fetching failed");
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (courseId) {
      getCourseData(courseId);
      getMeetingsData()
    }
  }, [courseId]);

  useEffect(() => {
    if (courseData?.courseDetail?.courseContents?.length > 0) {
      let totalHours = 0
      courseData?.courseDetail?.courseContents?.map((courseContent) => {
        if (courseContent?.totalDuration?.DD > 0) {
          totalHours += (courseContent?.totalDuration?.DD * 8)
        }
        if (courseContent?.totalDuration?.HH > 0) {
          totalHours += (courseContent?.totalDuration?.HH)
        }
        if (courseContent?.totalDuration?.MM > 0) {
          totalHours += parseInt(courseContent?.totalDuration?.MM / 60)
        }
      })


      if (totalHours > 0) {

        setTotalLearningHours(totalHours)

        let totalDays = parseInt(totalHours / 8)
        let leftHours = totalHours % 8

        let totalDuration = {
          days: 0,
          hours: 0
        }

        if (totalDays > 0) { totalDuration.days = totalDays }
        if (totalHours > 0) { totalDuration.hours = leftHours }

        setLearningDuration(totalDuration)
      }
    }
  }, [courseData])

  return (
    <Layout
      customHeader={!visible ? <></> : null}
      childrenHeight={!visible ? "100vh" : ""}
    >
      {!visible ? (
        <div className={styles.nav}>
          <div>
            <h3>{courseData?.name}</h3>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              id="rating"
            >
              <p style={{ display: "flex", alignItems: "center"  }}>
                {courseData?.rating} <Stars value={courseData?.rating} />
              </p>
              <p>Enrolled engineers ({courseData?.learnerCount})</p>
            </span>
          </div>
          {/* <Button>Enroll in Course</Button> */}
        </div>
      ) : null}
      <div className={`wrapper ${styles.container}`}>
        <div className={styles.breadcrumbs}>
          <Link href="/explore">Explore</Link>
          <span>{">"}</span>
          <Link href={`/course/${courseId}`}>{courseData?.name}</Link>
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.courseInfo}>
              <h1 ref={ref}>{courseData?.name}</h1>
              <p
                dangerouslySetInnerHTML={{
                  __html: courseData?.courseDetail?.description,
                }}
              >
                {/* {(courseData?.courseDetail?.description)} */}
              </p>

              <span
                style={{
                  display: "flex",
                  // flexDirection: "column",
                  alignItems: "flex-start",
                }}
                id="rating"
              >
                <p style={{ display: "flex", alignItems: "center" }}>
                  {courseData?.rating} <Stars value={courseData?.rating} />
                </p>
                <p>Enrolled engineers ({courseData?.learnerCount})</p>
              </span>
              <div className={styles.metaInfo}>
                {/* <p>Created by Civil Guruji</p> */}
                <p>
                  Last updated on{" "}
                  {moment(courseData?.updatedAt).format("MMMM DD, YYYY")}
                </p>
              </div>
            </div>
            {/* new added for box of three content box */}
            {/* <div className={styles.boxContainer} style={{display:"none"}}>
              <div className={styles.contentBox}>
                <h5 className={styles.boxHeading}>Learning Duration</h5>
                <span className={styles.durationValue}>{`${learningDuration?.days > 0 ? `${learningDuration?.days + ' days'}` : ''} & ${learningDuration?.hours > 0 ? `${learningDuration?.hours + ' hours'}` : ''}`}</span>
              </div>
              {
                courseData?.courseDetail?.crackJobs && courseData?.courseDetail?.crackJobs?.length > 0 &&
                <div className={styles.contentBox}>
                  <h5 className={styles.boxHeading}>Crack Jobs</h5>
                  <div className={styles.chipsPart}>
                    {
                      courseData?.courseDetail?.crackJobs.map((job, index) => {
                        return <div key={index} className={styles.chip}>{job.value}</div>
                      })
                    }
                  </div>
                </div>
              }
              {
                courseData?.skillsText &&
                <div className={styles.contentBox}>
                  <h5 className={styles.boxHeading}>Skills</h5>
                  <span className={styles.durationValue}>
                    {courseData?.skillsText}
                  </span>
                </div>
              }
            </div> */}
            <CourseInfo
              learnings={courseData?.courseDetail?.learningObjectives}
            />
            <CourseContent
              contents={courseData?.courseDetail?.courseContents}
              meetingsData={meetingsData}
            />
            <div style={{ margin: '2rem 0 2rem 0' }} >
              <h3 className={styles.jobHeading}>FeedBack</h3>
              <div className={styles.feedbacks}>
                <Text>Coming soon.</Text>
                {/* <FeedbackCard />
                <FeedbackCard />
                <FeedbackCard />
                <FeedbackCard />
                <FeedbackCard /> */}
              </div>
                          {/* new added for job container */}
            <div className={styles.jobContainer}>
              <h3 className={styles.jobHeading}>Student Got Job</h3>
              <div className={styles.jobCardContainer}>

                <Swiper
                  slidesPerView={"auto"}
                  spaceBetween={20}
                  // freeMode={true}
                  modules={[Autoplay]}
                  className="courseCards"
                  autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                  }}
                >
                  {courseData?.studentsGotJob && courseData?.studentsGotJob?.length > 0 && courseData?.studentsGotJob.map((student, idx) => (
                    <SwiperSlide key={idx} style={{ cursor: 'pointer' }}>
                      <div className={styles.jobCard}>
                        <div className={styles.Imagepart}>
                          <Image width={'80px'} height={'80px'} src={baseURL + `/${student?.image}`} />
                        </div>
                        <div className={styles.DetailsPart}>{student?.name}</div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <QuerysForm/>

            </div>
          </div>
          <CourseFloatCard totalLearningHours={totalLearningHours} courseData={courseData} />
        </div>
        <div style={{borderTop:"1px solid #FFFFFF", marginTop:"20px",marginBottom:"0px"}}>            
        <CourseCarousel
          title="Similar Related course"
          courses={courseData?.skills}
          parentCourseId={courseData?._id}
        />
      </div>
      </div>

    </Layout>
  );
}