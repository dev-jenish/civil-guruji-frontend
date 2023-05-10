import PackageCarousel from "@/components/package/PackageCarousel";
import PackageCourses from "@/components/package/PackageCourses";
import PackageFloatCard from "@/components/package/PackageFloatCard";
import PackageInfo from "@/components/package/PackageInfo";
import Layout from "@/components/reusable/Layout";
import Stars from "@/components/Stars";
import useScrollObserver from "@/hooks/useScrollObserver";
import styles from "@/styles/PackageDetail.module.css";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Package({}) {
  const { ref, visible } = useScrollObserver();

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
          <Button>Enroll in Package</Button>
        </div>
      ) : null}
      <div className={styles.container}>
        <div className={styles.courseInfo}>
          <div className={styles.breadcrumbs}>
            <Link href="/explore">Explore</Link>
            <span>{">"}</span>
            <Link href={`/package/blockchain-development-bootcamp`}>
              Blockchain Development Bootcamp
            </Link>
          </div>
          <h1 ref={ref}>Blockchain Development Bootcamp</h1>
          <p>
            Learn the cryptography fundamentals. What are hash functions? How
            are they important to blockchains? What exactly is Mining and Proof
            of work? What makes blockchains work?
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
        <div className={styles.content}>
          <div className={styles.left}>
            <PackageInfo />
            <PackageCourses />
          </div>
          <PackageFloatCard />
        </div>
        <PackageCarousel
          className={styles.carouselWrapper}
          title="Similar Packages"
        />
      </div>
    </Layout>
  );
}
