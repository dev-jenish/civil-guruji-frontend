import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import Card from "./Card";
import styles from "@/styles/Swiper.module.css";

import "swiper/css/free-mode";
import { Button } from "@chakra-ui/react";

const packages = [1, 2, 3, 4, 5, 6];

export default function PackageCarousel({ title, className, hideBtn }) {
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
        {packages.map((idx) => (
          <SwiperSlide key={idx} style={{ zIndex: preview === idx ? 2 : 1 }}>
            <Card
              index={idx}
              showPreview={preview === idx}
              mouseOver={mouseOver}
              mouseOut={mouseOut}
              transformOrigin={
                idx == 1 ? "left" : packages.length == idx ? "right" : "center"
              }
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
