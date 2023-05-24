/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/PackageCourses.module.css";
import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlineDown, AiOutlineTrophy, AiOutlineUp } from "react-icons/ai";
import { BsLaptop, BsPlayBtn } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import Stars from "../Stars";
import { useState } from "react";
import { IoMdRadioButtonOn } from "react-icons/io";
import CourseContent from "../course/CourseContent";
import stylesAcc from "@/styles/Topic.module.css";

export default function PackageCourses({ packageData }) {
  return (
    <div className={styles.container}>
      <Text>Course Included ({packageData?.courses?.length || 0})</Text>
      <div className={styles.courses}>
        {
          packageData?.courses && packageData?.courses?.length>0 && packageData.courses.map((course, index) => {
            return <CourseCard key={index} courseData={course} />
          })
        }
        {/* <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard /> */}
      </div>
    </div>
  );
}

function CourseCard({ courseData }) {
  const router = useRouter();

  const handleClick = () => {
    // router.push("/package/blockchain-development-bootcamp/1ty5a5f34");
  };

  return (
    <div onClick={handleClick} className={styles.card}>
      <img
        src={courseData?.course?.thumbnail}
        alt="Course Image"
      />
      <div className={styles.details} >
        <Text as="h2">{courseData?.course?.name}</Text>
        <Text noOfLines="2" dangerouslySetInnerHTML={{
                  __html: courseData?.course?.courseDetail?.description,
                }} >
        </Text>
        <span id="rating" style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }} >
          <p>
          {courseData?.course?.rating} <Stars value={courseData?.course?.rating} />
          </p>
          <p>Enrolled engineers ({courseData?.course?.learnerCount})</p>
        </span>
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
        <Accordian courseData={courseData} />
      </div>
    </div>
  );
}

function Accordian({
  savedPro,
  learningPercentage,
  videoProgeress,
  module,
  selectedTopic,
  setSelectedTopic,
  courseData
}) {
  const [showTopics, setShowTopics] = useState(true);
  const router = useRouter();

  const handleSwitch = () => {
    setShowTopics(!showTopics);
  };

  const id = router.query.id;

  return (
    <>
      <div onClick={handleSwitch} className={stylesAcc.heading} style={{ marginTop: "1.2rem" }}>
        {showTopics ? (
          <AiOutlineUp className={stylesAcc.arrowDown} />
        ) : (
          <AiOutlineDown className={stylesAcc.arrowDown} />
        )}
        <p style={{ fontSize: "18px" }} >Show course contents</p>
      </div>
      {showTopics && (
        <div style={{ marginBottom: 20 }} className={stylesAcc.topics}>
          {/* {module.courseSubContents.map((topic) => { */}
            {/* return ( */}
              <div
                // key={topic._id}
                className={`${stylesAcc.topic} ${stylesAcc.activeSubmodule
                }`}
                onClick={() => {
                  // setSelectedTopic({ module: module, subModule: topic });
                }}
              >
                {/* {topic?.type == 1 ? (
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
                )} */}
                <CourseContent
              contents={courseData?.course?.courseDetail?.courseContents}
              style={{ width: "100%" }}
            />
              </div>
            {/* ); */}
          {/* })} */}
        </div>
      )}
    </>
  );
}
