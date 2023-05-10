import CourseCarousel from "@/components/course/CourseCarousel";
import CourseContent from "@/components/course/CourseContent";
import CourseFloatCard from "@/components/course/CourseFloatCard";
import CourseInfo from "@/components/course/CourseInfo";
import Layout from "@/components/reusable/Layout";
import Stars from "@/components/Stars";
import useScrollObserver from "@/hooks/useScrollObserver";
import styles from "@/styles/CourseDetail.module.css";
import { Button, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function PackageCourse({}) {
  const { ref, visible } = useScrollObserver();
  const router = useRouter();

  return (
    <Layout
      customHeader={!visible ? <></> : null}
      childrenHeight={!visible ? "100vh" : ""}
    >
      {!visible ? (
        <div className={styles.nav}>
          <div>
            <h3>Blockchain Developer course</h3>
            <span id="rating">
              <p>
                3.5 <Stars />
              </p>
              <p>(1200)</p>
            </span>
          </div>
          <HStack>
            <Button variant="outline">Enroll in Course</Button>
            <Button>Enroll in Package</Button>
          </HStack>
        </div>
      ) : null}
      <div className={`wrapper ${styles.container}`}>
        <div className={styles.breadcrumbs}>
          <Link href="/explore">Explore</Link>
          <span>{">"}</span>
          <Link href={`/package/blockchain-development-bootcamp`}>
            Blockchain Development Bootcamp
          </Link>
          <span>{">"}</span>
          <Link href={`/package/blockchain-development-bootcamp/1ty5a5f34`}>
            Solidity
          </Link>
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.courseInfo}>
              <p>
                This course is part of the{" "}
                <Text
                  as="b"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                  onClick={() =>
                    router.push("/package/blockchain-development-bootcamp")
                  }
                >
                  Blockchain Development Bootcamp Package
                </Text>
              </p>
              <h1 ref={ref}>Smart Contract Development</h1>
              <p>
                Learn how to write Smart contracs with solidity from basic and
                become an high paid blockchain developer.
              </p>

              <span id="rating">
                <p>
                  3.5 <Stars />
                </p>
                <p>(1200)</p>
              </span>
              <div className={styles.metaInfo}>
                {/* <p>Created by Civil Guruji</p> */}
                <p>Last updated December 10, 2022</p>
              </div>
            </div>
            <CourseInfo />
            <CourseContent />
          </div>
          <CourseFloatCard isPackage />
        </div>
        <CourseCarousel title="Other courses in Package" hideBtn />
      </div>
    </Layout>
  );
}
