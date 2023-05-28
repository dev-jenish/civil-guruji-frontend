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
          <Box className={styles.tabs}>
            <button className={styles.enrollBtn}>
              Practicle Training - Offline
            </button>
            <button className={styles.primaryBtn}>
              Practicle Training - Online
            </button>
            <button className={styles.primaryBtn}>
              Individual Training - Online
            </button>
            <button className={styles.primaryBtn}>
              Free Training - Online
            </button>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box className={styles.contentBox}>
            <div className={styles.contentBlock}>
              <h2 className={styles.headingText}>Practicle Training Online</h2>
              <button className={styles.enrollBtn}>ENROLL NOW</button>
            </div>
            <img src="/assets/image 19.png" alt="banner" />
          </Box>
          <Box className={styles.tabs}>
            <button className={styles.primaryBtn}>
              Practicle Training - Offline
            </button>
            <button className={styles.enrollBtn}>
              Practicle Training - Online
            </button>
            <button className={styles.primaryBtn}>
              Individual Training - Online
            </button>
            <button className={styles.primaryBtn}>
              Free Training - Online
            </button>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box className={styles.contentBox}>
            <div className={styles.contentBlock}>
              <h2 className={styles.headingText}>Individual Training Online</h2>
              <button className={styles.enrollBtn}>ENROLL NOW</button>
            </div>
            <img src="/assets/image 19.png" alt="banner" />
          </Box>
          <Box className={styles.tabs}>
            <button className={styles.primaryBtn}>
              Practicle Training - Offline
            </button>
            <button className={styles.primaryBtn}>
              Practicle Training - Online
            </button>
            <button className={styles.enrollBtn}>
              Individual Training - Online
            </button>
            <button className={styles.primaryBtn}>
              Free Training - Online
            </button>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box className={styles.contentBox}>
            <div className={styles.contentBlock}>
              <h2 className={styles.headingText}>Free Training Online</h2>
              <button className={styles.enrollBtn}>ENROLL NOW</button>
            </div>
            <img src="/assets/image 19.png" alt="banner" />
          </Box>
          <Box className={styles.tabs}>
            <button className={styles.primaryBtn}>
              Practicle Training - Offline
            </button>
            <button className={styles.primaryBtn}>
              Practicle Training - Online
            </button>
            <button className={styles.primaryBtn}>
              Individual Training - Online
            </button>
            <button className={styles.enrollBtn}>
              Free Training - Online
            </button>
          </Box>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
