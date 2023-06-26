/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/Swiper.module.css";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/navigation";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { baseURL } from "utils/urls";

export default function Banner({ bannersData }) {

  const router = useRouter()

  return (
    <div className={styles.courseBanner}>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        className="bannerSwiper"
      >
        {
          bannersData?.length > 0 && bannersData.map((banner, index) => {
            return <SwiperSlide key={index} >
              <Box className={styles.contentBox}>
                <div className={styles.contentBlock}>
                  <h2 className={styles.headingText}>{banner?.text}</h2>
                  <button onClick={() => {
                    if(banner?.link){
                      router.push(banner?.link)
                    }
                  }} className={styles.enrollBtn}>ENROLL NOW</button>
                </div>
                <img src={baseURL + `/${banner?.image}`} alt="banner" />
              </Box>

            </SwiperSlide>
          })
        }
      </Swiper>
      <Box className={styles.tabs}>
        {
          bannersData?.length > 0 && bannersData.map((banner, index) => {
            return <button key={index} onClick={() => {
              if(banner?.link){
                router.push(banner?.link)
              }
            }} className={styles.enrollBtn}>
            {banner?.text}
          </button>
          })
        }
      </Box>
    </div>
  );
}
