import CourseCarousel from "@/components/course/CourseCarousel";
import CourseContent from "@/components/course/CourseContent";
import CourseFloatCard from "@/components/course/CourseFloatCard";
import CourseInfo from "@/components/course/CourseInfo";
import Layout from "@/components/reusable/Layout";
import Stars from "@/components/Stars";
import useScrollObserver from "@/hooks/useScrollObserver";
import styles from "@/styles/CourseDetail.module.css";
import { Button } from "@chakra-ui/react";
import moment from "moment/moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "utils/urls";

export default function CourseDetail({}) {
  const { ref, visible } = useScrollObserver();
  const router = useRouter();
  const [courseId, setCourseId] = useState('')
  const [courseData, setCourseData] = useState({})

  useEffect(() => {
    console.log(router?.query, "<== this is router query")
    if(router?.query?.slug){
      setCourseId(router.query?.slug)
    }
  }, [router.query])

  const getCourseData = async (id) => {
    try{
      let response = await api(`/course/course-details/${id}`, 'get')
      if(response?.data){
        console.log(response?.data, "<==== fetched course")
        setCourseData(response?.data)
      }
    }catch(error){
      console.log(error)
      toast.error("Course details fetching failed")
    }
  }

  useEffect(() => {
    if(courseId){
      getCourseData(courseId)
    }
  }, [courseId])

  return (
    <Layout
      customHeader={!visible ? <></> : null}
      childrenHeight={!visible ? "100vh" : ""}
    >
      {!visible ? (
        <div className={styles.nav}>
          <div>
            <h3>{courseData?.name}</h3>
            <span style={{ display: "flex", flexDirection: 'column', alignItems: 'flex-start' }} id="rating">
                <p style={{ display: 'flex', alignItems: 'center' }} >
                  {courseData?.rating} <Stars value={courseData?.rating} />
                </p>
                <p>Enrolled engineers ({courseData?.learnerCount})</p>
              </span>
          </div>
          <Button>Enroll in Course</Button>
        </div>
      ) : null}
      <div className={`wrapper ${styles.container}`}>
        <div className={styles.breadcrumbs}>
          <Link href="/explore">Explore</Link>
          <span>{">"}</span>
          <Link href={`/course/${courseId}`}>
            {courseData?.name}
          </Link>
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.courseInfo}>
              <h1 ref={ref}>{courseData?.name}</h1>
              <p dangerouslySetInnerHTML={{ __html: courseData?.courseDetail?.description}} >
                {/* {(courseData?.courseDetail?.description)} */}
              </p>

              <span style={{ display: "flex", flexDirection: 'column', alignItems: 'flex-start' }} id="rating">
                <p style={{ display: 'flex', alignItems: 'center' }} >
                  {courseData?.rating} <Stars value={courseData?.rating} />
                </p>
                <p>Enrolled engineers ({courseData?.learnerCount})</p>
              </span>
              <div className={styles.metaInfo}>
                {/* <p>Created by Civil Guruji</p> */}
                <p>Last updated on {moment(courseData?.updatedAt).format('MMMM DD, YYYY')}</p>
              </div>
            </div>
            {/* new added for box of three content box */}
            <div className={styles.boxContainer}>
              <div className={styles.contentBox}>
                <h5 className={styles.boxHeading}>Learning Duration</h5>
                <span className={styles.durationValue}>10 Days</span>
              </div>
              <div className={styles.contentBox}>
                <h5 className={styles.boxHeading}>Crack Jobs</h5>
                <div className={styles.chipsPart}>
                  <div className={styles.chip}>Product Owner</div>
                  <div className={styles.chip}>Site Engineer</div>
                </div>
              </div>
              <div className={styles.contentBox}>
                <h5 className={styles.boxHeading}>Skills</h5>
                <span className={styles.durationValue}>Autocad,3D,Revit etc.</span>
              </div>
            </div>
            {/* new added for job container */}
            <div className={styles.jobContainer}>
              <h3 className={styles.jobHeading}>Student Got Job</h3>
              <div className={styles.jobCardContainer}>
                <div className={styles.jobCard}>
                  <div className={styles.Imagepart}>
                    <Image width={180} height={250} src="/assets/Group 1.svg" alt="studentImage" />
                  </div>
                  <div className={styles.DetailsPart}></div>
                </div>
                <div className={styles.jobCard}>
                  <div className={styles.Imagepart}>
                    <Image width={180} height={250} src="/assets/Group 1.svg" alt="studentImage" />
                  </div>
                  <div className={styles.DetailsPart}></div>
                </div>
                <div className={styles.jobCard}>
                  <div className={styles.Imagepart}>
                    <Image width={180} height={250} src="/assets/Group 1.svg" alt="studentImage" />
                  </div>
                  <div className={styles.DetailsPart}></div>
                </div>
                <div className={styles.jobCard}>
                  <div className={styles.Imagepart}>
                    <Image width={180} height={250} src="/assets/Group 1.svg" alt="studentImage" />
                  </div>
                  <div className={styles.DetailsPart}></div>
                </div>
                <div className={styles.jobCard}>
                  <div className={styles.Imagepart}>
                    <Image width={180} height={250} src="/assets/Group 1.svg" alt="studentImage" />
                  </div>
                  <div className={styles.DetailsPart}></div>
                </div>
              </div>
            </div>
            <CourseInfo learnings={courseData?.courseDetail?.learningObjectives} />
            <CourseContent contents={courseData?.courseDetail?.courseContents} />
          </div>
          <CourseFloatCard courseData={courseData} />
        </div>
        <CourseCarousel title="Similar Related course" courses={courseData?.skills} />
      </div>
    </Layout>
  );
}
