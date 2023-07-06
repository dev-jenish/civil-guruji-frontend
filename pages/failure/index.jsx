import Layout from "@/components/reusable/Layout";
import React from "react";
import styles from "@/styles/Success.module.css";
import { Button, Center } from "@chakra-ui/react";

const Failure = () => {
  return (
    <>
      <Layout>
        <Center h={"100%" } >
                     
            <div className={styles.great}>
              
              <img className={styles.man} src="/assets/Robo.svg" alt="man" />
            </div>

            

        </Center>
      </Layout>
    </>
  );
};

export default Failure;
