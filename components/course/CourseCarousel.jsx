import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import Card from "./Card";
import styles from "@/styles/Swiper.module.css";

import "swiper/css/free-mode";
import { Button } from "@chakra-ui/react";

// const courses = [1, 2, 3, 4, 5, 6];

export default function CourseCarousel({ title, className, hideBtn, courses }) {
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

  useEffect(() => {
    console.log(courses, "<==== this are courses")
  }, [courses])

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.header}>
        <h3>{title}</h3>
        {!hideBtn ? <Button variant="ghost">View All</Button> : null}
      </div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={20}
        freeMode={true}
        modules={[FreeMode]}
        className="courseCards"
      >
        { courses && courses.map((course, idx) => (
          <SwiperSlide key={idx} style={{ zIndex: preview === idx ? 2 : 1 }}>
            <Card
              index={idx}
              showPreview={preview === idx}
              mouseOver={mouseOver}
              mouseOut={mouseOut}
              transformOrigin={
                idx == 1 ? "left" : courses.length == idx ? "right" : "center"
              }
              course={course}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
