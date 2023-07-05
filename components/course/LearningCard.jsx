/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/Card.module.css";
import { useRouter } from "next/router";
import { AiOutlineTrophy } from "react-icons/ai";
import { BsFillPlayFill, BsJournalBookmark, BsLaptop } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import Stars from "../Stars";
import { useContext, useEffect, useState } from "react";
import { Progress } from "@chakra-ui/react";
import { FaCertificate } from 'react-icons/fa';
import { BiCertification } from "react-icons/bi";
import { userContext } from "@/context/userContext";
import moment from "moment";
import { api } from "utils/urls";


export default function LearningCard({
    index,
    showPreview,
    mouseOver,
    mouseOut,
    transformOrigin,
    course
}) {
    const router = useRouter();

    const [time, setTime] = useState(0)
    const [purchasedData, setPurchasedData] = useState({})
    const [courseProgressionData, setCourseProgressionData] = useState({})
    const [learningPercentage, setLearningPercentage] = useState(0)
    const [isPurchased, setIsPurchased] = useState(false)




    const { userData } = useContext(userContext)

    useEffect(() => {
        if (userData?.purchases && userData?.purchases?.length > 0) {
            let purchasedPlan = userData.purchases.find((purchase) => {
                // console.log(purchase)
                return purchase?.courseDetail == course?._id
            })
            if (purchasedPlan) {
                setIsPurchased(true)
                console.log(purchasedPlan)
            }
        }
    }, [userData])

    const getCourseProgressionData = async () => {
        try {
            let response = await api('/course/get-progress', 'post', {
                courseId: course?._id
            })

            if (response?.data) {
                setCourseProgressionData(response?.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log('learning!')
        if(!Object.keys(courseProgressionData).length)
        getCourseProgressionData()
    }, [courseProgressionData])

    useEffect(() => {

        console.log(course)

        if (userData?.purchases && (userData?.purchases?.length > 0) && course?._id) {
            let purchasedPlan = userData.purchases.find((purchase) => {
                console.log(course?._id)
                return purchase?.courseDetail == course?._id
            })
            if (purchasedPlan) {
                setPurchasedData(purchasedPlan)
                console.log(purchasedPlan, "planp")
            }
        }
    }, [userData, course?._id])

    const handleClick = () => {

        if (course?.isPackage) {
            router.push({
                pathname: `/package/${course?._id}`,
                query: { id: course?._id }
            }, `/package/${course?._id}`);
        } else {
            if (isPurchased) {
                console.log('Purchased')
                router.push({
                    pathname: `/course/${course?.name}/${course?._id}`,
                    query: { id: course?._id }
                }, `/course/${course?.name}/${course?._id}`);
            } else {
                router.push({
                    pathname: `/course/${course?._id}`,
                    query: { id: course?._id }
                }, `/course/${course?._id}`);
            }
        }

    };




    useEffect(() => {

        if (course?.isPackage) {
            if (course?.courses?.length > 0) {

                let totalHours = 0
                course?.courses?.map((course) => {

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
                            setTime(totalHours)
                        }
                    }
                })
            }
        } else {
            if (course?.courseDetail?.courseContents?.length > 0) {
                let totalHours = 0
                course?.courseDetail?.courseContents?.map((courseContent) => {
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
                    setTime(totalHours)
                }
            }
        }



    }, [course])


    useEffect(() => {

        let courseSubModulesLength = 0
        course?.courseDetail?.courseContents?.length > 0 && course?.courseDetail?.courseContents.forEach((courseContent) => {
            if (courseContent?.courseSubContents?.length > 0) {
                courseSubModulesLength += courseContent?.courseSubContents?.length
            }
        })

        let savedProgressSubModulesLength = 0
        if (courseProgressionData?.subModules?.length > 0) {
            savedProgressSubModulesLength += courseProgressionData?.subModules?.length
        }
        console.log(courseSubModulesLength, savedProgressSubModulesLength)

        setLearningPercentage(((savedProgressSubModulesLength / courseSubModulesLength) * 100).toFixed(2))

        // if(courseSubModulesLength == savedProgressSubModulesLength){
        //   if(!canGiveFinalQuiz){
        //     setCanGiveFinalQuiz(true)
        //   }
        // }else{
        //   if(canGiveFinalQuiz){
        //     setCanGiveFinalQuiz(false)
        //   }
        // }

    }, [course, courseProgressionData])



    return (
        <div onClick={handleClick} className={styles.card}>
            <div
                className={`${styles.img} ${showPreview ? styles.scale : ""} `}
            // style={{ transformOrigin }}
            >
                <div id={styles.overlay} />
                {
                    <>
                        <img
                            src={course?.thumbnail ? course?.thumbnail : "https://public.bnbstatic.com/static/academy/uploads-original/37ba7ddb25b14d3e9eb4d36c54837976.png"}
                            alt="Course Name"
                        />
                        <p id={styles.hvrMsg}>Keep hovering to preview</p>
                    </>
                }

                {/* {!showPreview ? (
          <span id={styles.isLive}>
            <BsFillPlayFill id={styles.icon} /> Live
          </span>
        ) : null} */}
                {
                    course?.isPackage &&
                    <span id={styles.isLive}>
                        Package
                    </span>
                }
            </div>
            <Progress value={learningPercentage} colorScheme="red" width={'100%'} height={2} />
            <div className={styles.courseInfo}>

                <div className={styles.more}>
                    {/* <p>
            <AiOutlineTrophy className={styles.icon} /> Certificate
          </p>
          <p>
            <BsLaptop className={styles.icon} /> {time} Hours
          </p> */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} >
                        <div style={{ display: 'flex' }} >
                            <p id={styles.validtil}>
                                Valid TIL:
                            </p>
                            <p id={styles.date}  >
                                {purchasedData?.planDetail?.validity == 'limited' ? moment(purchasedData?.validityDate).format('DD | MMM | YYYY') : 'Lifetime'}
                                {/* {course?.prices?.find((price) => {
              return price?.isDisplay == true
            })?.discountedPrice || 'sFree'} */}
                            </p>
                        </div>
                        {
                            course?.courseDetail?.certificate &&
                            <BsJournalBookmark />
                        }
                    </div>

                </div>
            </div>
        </div>
    );
}
