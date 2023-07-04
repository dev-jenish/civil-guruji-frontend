import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import Card from "./Card";
import styles from "@/styles/Swiper.module.css";

import "swiper/css/free-mode";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

// const courses = [1, 2, 3, 4, 5, 6];

export default function CourseCarousel({ title, className, hideBtn, courses, categoryId, parentCourseId, parentPackageId, learning }) {
  const router = useRouter()
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
    try{
      if(categoryId){
        router.push(`/courses/${categoryId}`)
      }
      if(parentCourseId){
        router.push(`/courses/similar/${parentCourseId}`)
      }
      if(parentPackageId){
        router.push(`/packages/similar/${parentPackageId}`)
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.header}>
        <h3>{title}</h3>
        {!hideBtn ? <Button variant="ghost" onClick={handleViewAll} >View All</Button> : null}
      </div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={20}
        navigation={true}
        freeMode={true}
        modules={[FreeMode, Navigation]}
        className="courseCards"
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
        }}
      >
        { courses && courses.map((course, idx) => (
          <SwiperSlide key={idx} style={{ zIndex: preview === idx ? 2 : 1 }}>
            <Card
              index={idx}
              showPreview={preview === idx}
              mouseOver={mouseOver}
              mouseOut={mouseOut}
              // transformOrigin={
              //   idx == 1 ? "left" : courses.length == idx ? "right" : "center"
              // }

              course={course}
              learning={learning}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
