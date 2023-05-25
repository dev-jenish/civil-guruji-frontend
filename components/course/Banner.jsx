/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/Swiper.module.css";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/navigation";
import { Box } from "@chakra-ui/react";

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
          <Box className={styles.contentBox}>
            <div className={styles.contentBlock}>
              <h2 className={styles.headingText}>Practical Training Offline</h2>
              <button className={styles.enrollBtn}>ENROLL NOW</button>
            </div>
            <img src="/assets/image 19.png" alt="banner" />
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box className={styles.contentBox}>
            <div className={styles.contentBlock}>
              <h2 className={styles.headingText}>Practical Training Offline</h2>
              <button className={styles.enrollBtn}>ENROLL NOW</button>
            </div>
            <img src="/assets/image 19.png" alt="banner" />
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box className={styles.contentBox}> 
            <div className={styles.contentBlock}>
              <h2 className={styles.headingText}>Practical Training Offline</h2>
              <button className={styles.enrollBtn}>ENROLL NOW</button>
            </div>
            <img src="/assets/image 19.png" alt="banner" />
          </Box>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
