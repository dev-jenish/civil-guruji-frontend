/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/Swiper.module.css";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/navigation";

export default function Banner({}) {
  return (
    <div className={styles.courseBanner}>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        className="bannerSwiper"
      >
        <SwiperSlide>
          <img
            src="https://images.unsplash.com/photo-1675456110416-53a9df455bae?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3NjU0NTI4MQ&ixlib=rb-4.0.3&q=80&w=800"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://images.unsplash.com/photo-1675456110416-53a9df455bae?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3NjU0NTI4MQ&ixlib=rb-4.0.3&q=80&w=800"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://images.unsplash.com/photo-1675456110416-53a9df455bae?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3NjU0NTI4MQ&ixlib=rb-4.0.3&q=80&w=800"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
