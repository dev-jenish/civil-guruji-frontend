/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/Card.module.css";
import { useRouter } from "next/router";
import { AiOutlineTrophy } from "react-icons/ai";
import { BsFillPlayFill, BsLaptop } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import Stars from "../Stars";

export default function Card({
  index,
  showPreview,
  mouseOver,
  mouseOut,
  transformOrigin,
  course
}) {
  const router = useRouter();

  console.log(course, "needed")

  const handleClick = () => {
    console.log(course?._id)
    router.push({
      pathname: `/course/${course?._id}`,
      query: {id: course?._id}
    }, `/course/${course?._id}`);
  };

  return (
    <div onClick={handleClick} className={styles.card}>
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
              src="https://iframe.mediadelivery.net/embed/1159/08f6a19c-2bbd-485d-a9cb-8474b434373b"
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
            <img
              src={course?.thumbnail ? course?.thumbnail : "https://public.bnbstatic.com/static/academy/uploads-original/37ba7ddb25b14d3e9eb4d36c54837976.png"}
              alt="Course Name"
            />
            <p id={styles.hvrMsg}>Keep hovering to preview</p>
          </>
        )}

        {!showPreview ? (
          <span id={styles.isLive}>
            <BsFillPlayFill id={styles.icon} /> Live
          </span>
        ) : null}
      </div>
      <div className={styles.courseInfo}>
        <h2>{course?.name}</h2>
        <span id="rating">
          <p>
            {course?.rating || 4.3} <Stars value={course?.rating || 4.3} />
          </p>
        </span>
        <p>
          <i>{ course?.learnerCount || `1500`}+ Enrolled</i>
        </p>
        <div className={styles.more}>
          <p>
            <AiOutlineTrophy className={styles.icon} /> Certificate
          </p>
          <p>
            <BsLaptop className={styles.icon} /> 3 Hours
          </p>
          <p id={styles.price}>
            <FaRupeeSign className={styles.icon} />
            499
          </p>
        </div>
      </div>
    </div>
  );
}
