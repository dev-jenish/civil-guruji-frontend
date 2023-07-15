/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/Card.module.css";
import { useRouter } from "next/router";
import { AiOutlineTrophy } from "react-icons/ai";
import { BsFillPlayFill, BsLaptop } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import Stars from "../Stars";
import { useContext, useEffect, useState } from "react";
import { userContext } from "@/context/userContext";

export default function Card({
  index,
  showPreview,
  mouseOver,
  mouseOut,
  transformOrigin,
  course,
  preview
}) {
  const router = useRouter();

  const [time, setTime] = useState(0)

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



  return (
    <div style={preview == 0 ? {} : {}} onClick={handleClick} className={styles.card}>
      <div
        className={`${styles.img} ${showPreview ? styles.scale : ""} `}
        style={{ transformOrigin }}
        onMouseOver={() => mouseOver(index)}
        onMouseOut={() => mouseOut(index)}
      >
        <div id={styles.overlay} />
        {showPreview ? (
          <>
            <iframe
              src={'https://iframe.mediadelivery.net/embed/42375/03a64964-f428-4638-b044-6d172f48f4ea?autoplay=true'}
              title="How does a blockchain work?"
              allow="autoplay"
              allowFullScreen
              controls="false"
              borderRadius="8px"
            ></iframe>
            <h2>{course?.name}</h2>
          </>
        ) : (
          <>
            {
              course?.isPackage &&
              <span id={styles.isLive}>
                Package
              </span>
            }
            <img
              src={course?.thumbnail ? course?.thumbnail : "https://public.bnbstatic.com/static/academy/uploads-original/37ba7ddb25b14d3e9eb4d36c54837976.png"}
              alt="Course Name"
            />
            <p id={styles.hvrMsg}>Keep hovering to preview</p>
          </>
        )}

        {/* {!showPreview ? (
          <span id={styles.isLive}>
            <BsFillPlayFill id={styles.icon} /> Live
          </span>
        ) : null} */}
      </div>
      <div className={styles.courseInfo}>
        <h2>{course?.name}</h2>
        <span id="rating">
          <p>
            {parseFloat(course?.rating).toFixed(1) || 4.3} <Stars value={course?.rating || 4.3} />
          </p>
          <p className={styles.enrolled}>
          <i>{course?.learnerCount || `1500`}+ Enrolled</i>
        </p>
        </span>
        
        
        {
          course?.isPackage &&
          <p>{course?.courses?.length} cources</p>
        }

        <div className={styles.more}>


          <div style={{ display: 'flex'}} >
            <p id={styles.line}>
              <FaRupeeSign className={styles.icon} />
              {course?.prices?.find((price) => {
                return price?.isDisplay == true
              })?.listPrice || 'Free'}
            </p>
            <p id={styles.price}>
              <FaRupeeSign className={styles.icon} />
              {/* {course?.prices?.find((price) => {
              return price?.isDisplay == true
            })?.discountedPrice || 'sFree'} */}
              {course?.prices?.find((price) => {
                return price?.isDisplay == true
              })?.discountedPrice || 'Free'}
            </p>
          </div>

          <p>
            {
              (
                (
                  ((course?.prices?.find((price) => {
                    return price?.isDisplay == true
                  })?.listPrice)
                    -
                    (course?.prices?.find((price) => {
                      return price?.isDisplay == true
                    })?.discountedPrice))
                  /
                  (course?.prices?.find((price) => {
                    return price?.isDisplay == true
                  })?.discountedPrice)
                )
                * 100
              ).toFixed(2) + '% OFF'
            }
          </p>


        </div>
      </div>
    </div>
  );
}
