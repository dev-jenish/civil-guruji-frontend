import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import Card from "./Card";
import styles from "@/styles/Swiper.module.css";

import "swiper/css/free-mode";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import LearningCard from "./LearningCard";

// const courses = [1, 2, 3, 4, 5, 6];

export default function CourseCarousel({
  title,
  className,
  hideBtn,
  courses,
  categoryId,
  parentCourseId,
  parentPackageId,
  learning,
}) {
  const router = useRouter();
  const [preview, setPreview] = useState(null);

  let timer;

  const mouseOver = (num) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      setPreview(num);
      clearTimeout(timer);
    }, [1200]);
  };

  const mouseOut = () => {
    if (timer) clearTimeout(timer);
    setPreview(null);
  };

  const handleViewAll = async () => {
    try {
      if (categoryId) {
        router.push(`/courses/${categoryId}`);
      }
      if (parentCourseId) {
        router.push(`/courses/similar/${parentCourseId}`);
      }
      if (parentPackageId) {
        router.push(`/packages/similar/${parentPackageId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.header}>
        <h3>{title}</h3>
        {!hideBtn ? (
          <Button
            variant="ghost"
            onClick={handleViewAll}
            style={{ color: "#DE076E" }}
          >
            View All
          </Button>
        ) : null}
      </div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={20}
        freeMode={true}
        navigation={true}
        modules={[FreeMode, Navigation]}
        className="courseCards"
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
        }}
        style={
          preview == 0
            ? {
                paddingLeft: "40px",
              }
            : {}
        }
      >
        {courses &&
          courses.map((course, idx) => {
            if (course?.listed) {
              return (
                <SwiperSlide
                  key={idx}
                  style={{ zIndex: preview === idx ? 2 : 1 }}
                >
                  {learning ? (
                    <LearningCard course={course} />
                  ) : (
                    <Card
                      index={idx}
                      showPreview={preview === idx}
                      mouseOver={mouseOver}
                      mouseOut={mouseOut}
                      preview={preview}
                      // transformOrigin={
                      //   idx == 1 ? "left" : courses.length == idx ? "right" : "center"
                      // }

                      course={course}
                      learning={learning}
                    />
                  )}
                </SwiperSlide>
              );
            }
          })}
      </Swiper>
    </div>
  );
}
