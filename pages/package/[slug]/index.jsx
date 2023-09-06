import CourseCarousel from "@/components/course/CourseCarousel";
import CourseFloatCard from "@/components/course/CourseFloatCard";
import FeedbackCard from "@/components/course/FeedbackCard";
import PackageCarousel from "@/components/package/PackageCarousel";
import PackageCourses from "@/components/package/PackageCourses";
import PackageFloatCard from "@/components/package/PackageFloatCard";
import PackageInfo from "@/components/package/PackageInfo";
import Layout from "@/components/reusable/Layout";
import Stars from "@/components/Stars";
import useScrollObserver from "@/hooks/useScrollObserver";
import styles from "@/styles/PackageDetail.module.css";
import { Button, Image, Text } from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Autoplay } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { api, baseURL } from "utils/urls";

export default function Package({ }) {
  const { ref, visible } = useScrollObserver();
  const router = useRouter();
  const [packageId, setPackageId] = useState('');
  const [packageData, setPackageData] = useState({})
  const [totalLearningHours, setTotalLearningHours] = useState(0)
  const [learningDuration, setLearningDuration] = useState(0)

  useEffect(() => {

    if (packageData?.courses?.length > 0) {

      let totalHours = 0
      packageData?.courses?.map((course) => {

        let courseData = course?.course

        if (courseData?.courseDetail?.courseContents?.length > 0) {
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
      })

    }

  }, [packageData])

  useEffect(() => {
    if (router?.query?.slug) {
      setPackageId(router.query?.slug);
    }
  }, [router.query]);

  const getPackageData = async (id) => {
    try {
      let response = await api(`/course/package-details/${id}`, "get");
      if (response?.data) {
        setPackageData(response?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Course details fetching failed");
    }
  };

  useEffect(() => {
    if (packageId) {
      getPackageData(packageId)
    }
  }, [packageId])

  return (
    <Layout
      customHeader={!visible ? <></> : null}
      childrenHeight={!visible ? "100vh" : ""}
    >
      {!visible ? (
        <div className={styles.nav}>
          <div>
            <h3>{packageData?.name}</h3>
            <span id="rating">
              <p>
                {packageData?.rating} <Stars value={packageData?.rating} />
              </p>
              <p>Enrolled engineers ({packageData?.learnerCount})</p>
            </span>
          </div>
          <Button className={styles.packageBtn}>Enroll in Package</Button>
        </div>
      ) : null}
      <div className={`wrapper ${styles.container}`}>
        <div className={styles.breadcrumbs}>
          <Link href="/explore">Explore</Link>
          <span>{">"}</span>
          <Link href={`/package/${packageId}`}>
            {packageData?.name}
          </Link>
        </div>

        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.courseInfo}>
              <h1 ref={ref}>{packageData?.name}</h1>
              <p
                dangerouslySetInnerHTML={{
                  __html: packageData?.description,
                }}
              >
              </p>

              <span id="rating" style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }} >
                <p>
                  {packageData?.rating} <Stars value={packageData?.rating} />
                </p>
                <p>Enrolled engineers ({packageData?.learnerCount})</p>
              </span>
              <div className={styles.metaInfo}>
                {/* <p>Created by Civil Guruji</p> */}
                <p>Last updated on{" "}
                  {moment(packageData?.updatedAt).format("MMMM DD, YYYY")}</p>
              </div>
            </div>
            {/* new added for box of three content box */}
            {(learningDuration>0||(packageData?.crackJobs && packageData?.crackJobs?.length > 0)||packageData?.skillsText )&&(
            <div className={styles.boxContainer}>
             {learningDuration>0 &&(<div className={styles.contentBox}>
                <h5 className={styles.boxHeading}>Learning Duration</h5>
                <span className={styles.durationValue}>{`${learningDuration?.days > 0 ? `${learningDuration?.days + ' days'}` : ''} & ${learningDuration?.hours > 0 ? `${learningDuration?.hours + ' hours'}` : ''}`}</span>
              </div>)}
              {
                packageData?.crackJobs && packageData?.crackJobs?.length > 0 &&
                <div className={styles.contentBox}>
                  <h5 className={styles.boxHeading}>Crack Jobs</h5>
                  <div className={styles.chipsPart}>
                    {
                      packageData?.crackJobs.map((job, index) => {
                        return <div key={index} className={styles.chip}>{job.value}</div>
                      })
                    }
                  </div>
                </div>
              }
              {
                packageData?.skillsText &&
                <div className={styles.contentBox}>
                  <h5 className={styles.boxHeading}>Skills</h5>
                  <span className={styles.durationValue}>
                    {packageData?.skillsText}
                  </span>
                </div>
              }
            </div>
            )
            }
            {/* new added for job container */}
          {(packageData?.studentsGotJob && packageData?.studentsGotJob?.length > 0 )&&
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
                  { packageData?.studentsGotJob.map((student, idx) => (
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
            </div>}


            <PackageInfo packageData={packageData} />



            <PackageCourses packageData={packageData} />
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
            </div>
            <CourseCarousel title={'Similar Related packages'} parentPackageId={packageData?._id} className={styles.carouselWrapper} courses={packageData?.skills?.map((packageData) => {
              return {
                isPackage: true,
                ...packageData
              }
            })} />
          </div>
          <CourseFloatCard totalLearningHours={totalLearningHours} isPackage={true} courseData={packageData} />
          {/* <PackageFloatCard packageData={packageData} /> */}
        </div>
        {/* <PackageCarousel
          className={styles.carouselWrapper}
          title="Similar Packages" 
          packagesData={packageData?.skills}
        /> */}
        {/* <CourseCarousel className={styles.carouselWrapper} courses={packageData?.skills?.map((packageData) => {
          return {
            isPackage: true,
            ...packageData
          }
        })} /> */}
      </div>
    </Layout>
  );
}
