import CourseCarousel from "@/components/course/CourseCarousel";
import PackageCarousel from "@/components/package/PackageCarousel";
import PackageCourses from "@/components/package/PackageCourses";
import PackageFloatCard from "@/components/package/PackageFloatCard";
import PackageInfo from "@/components/package/PackageInfo";
import Layout from "@/components/reusable/Layout";
import Stars from "@/components/Stars";
import useScrollObserver from "@/hooks/useScrollObserver";
import styles from "@/styles/PackageDetail.module.css";
import { Button } from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "utils/urls";

export default function Package({}) {
  const { ref, visible } = useScrollObserver();
  const router = useRouter();
  const [packageId, setPackageId] = useState('');
  const [packageData, setPackageData] = useState({})

  useEffect(() => {
    if (router?.query?.slug) {
      setPackageId(router.query?.slug);
    }
  }, [router.query]);

  const getPackageData = async (id) => {
    try {
      let response = await api(`/course/package-details/${id}`, "get");
      if (response?.data) {
        setPackageData(response?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Course details fetching failed");
    }
  };

  useEffect(() => {
    if(packageId){
      getPackageData(packageId)
    }
  }, [packageId])

  return (
    <Layout
      customHeader={!visible ? <></> : null}
      childrenHeight={!visible ? "100vh" : ""}
    >
      {!visible ? (
        <div className={styles.nav}>
          <div>
            <h3>{packageData?.name}</h3>
            <span id="rating">
              <p>
              {packageData?.rating} <Stars value={packageData?.rating} />
              </p>
              <p>Enrolled engineers ({packageData?.learnerCount})</p>
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
            <Link href={`/package/${packageId}`}>
            {packageData?.name}
            </Link>
          </div>
          <h1 ref={ref}>{packageData?.name}</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: packageData?.description,
            }}
          >
          </p>

          <span id="rating" style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }} >
            <p>
            {packageData?.rating} <Stars value={packageData?.rating} />
            </p>
            <p>Enrolled engineers ({packageData?.learnerCount})</p>
          </span>
          <div className={styles.metaInfo}>
            {/* <p>Created by Civil Guruji</p> */}
            <p>Last updated on{" "}
                  {moment(packageData?.updatedAt).format("MMMM DD, YYYY")}</p>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <PackageInfo packageData={packageData} />
            <PackageCourses packageData={packageData} />
          </div>
          <PackageFloatCard packageData={packageData} />
        </div>
        {/* <PackageCarousel
          className={styles.carouselWrapper}
          title="Similar Packages" 
          packagesData={packageData?.skills}
        /> */}
        <CourseCarousel className={styles.carouselWrapper} courses={packageData?.skills?.map((packageData) =>{
          return {
            isPackage: true,
            ...packageData
          }
        } )} />
      </div>
    </Layout>
  );
}
