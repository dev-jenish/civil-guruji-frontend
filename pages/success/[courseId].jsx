import Layout from "@/components/reusable/Layout";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Success.module.css";
import { Button, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { api } from "utils/urls";

const Success = () => {

  const router = useRouter()
  const [courseId, setCourseId] = useState('')
  const [courseData, setCourseData] = useState({})

  useEffect(() => {
    if (router?.query?.courseId) {
      setCourseId(router?.query?.courseId)
    }
  }, [router?.query])

  const getCourseData = async () => {
    try {
      let response = await api(`/course/course-details/${courseId}`, "get");
      if (response?.data?._id) {
        setCourseData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(courseId){
      getCourseData()
    }
  }, [courseId])

  return (
    <>
      <Layout>
        <Center h={"100%"} position={"relative"}>
          <div className={styles.main} style={{ position: "absolute" }}>
            {" "}
          </div>
          <div className={styles.maingreat}>
            <div className={styles.great}>
              <h1 className={styles.hading}>Great Success</h1>
              <p className={styles.text}>Thanks for buying the course</p>
              <img className={styles.man} src="/assets/group.svg" alt="man" />
            </div>
            <div>
              <div className={styles.coursename}>
                <p>{courseData?.name}</p>
                <Button onClick={() => { router.push(`/course/learning/${courseId}`) }} >Lets Begin</Button>
              </div>
            </div>
          </div>
        </Center>
      </Layout>
    </>
  );
};

export default Success;
