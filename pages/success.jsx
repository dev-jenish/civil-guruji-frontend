import Layout from "@/components/reusable/Layout";
import React from "react";
import styles from "@/styles/Success.module.css";
import { Button, Center } from "@chakra-ui/react";

const success = () => {
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
                <p>Course Name</p>
                <Button>Lets Begin</Button>
              </div>
            </div>
          </div>
        </Center>
      </Layout>
    </>
  );
};

export default success;
