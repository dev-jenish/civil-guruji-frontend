/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/CourseFloatCard.module.css";
import { Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlineFileText, AiOutlineTrophy } from "react-icons/ai";
import { BsLaptop, BsPhone } from "react-icons/bs";
import { IoIosInfinite } from "react-icons/io";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";

export default function CourseFloatCard({ isPackage, courseData }) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img
          src={courseData?.thumbnail ? courseData?.thumbnail : "https://public.bnbstatic.com/static/academy/uploads-original/37ba7ddb25b14d3e9eb4d36c54837976.png"}
          alt="thumbnail"
        />
      </div>
      <div style={{ paddingTop: 8 }} className={styles.content}>
        <p id={styles.price}>₹3,499</p>
        <VStack>
          <Button
            onClick={() => router.push("/checkout/6Y73D9DGZ")}
            borderRadius={2}
            w="full"
            variant={isPackage ? "outline" : "solid"}
          >
            Enroll in Course
          </Button>
          {isPackage ? (
            <Button
              onClick={() =>
                router.push("/package/blockchain-development-bootcamp")
              }
              borderRadius={2}
              w="full"
            >
              Checkout Package
            </Button>
          ) : null}
        </VStack>

        <div className={styles.include}>
          {/* <p>This course includes:</p> */}
          <ul>
            <li>
              <BsLaptop className={styles.icon} />
              <p>5 hours of content</p>
            </li>
            <li>
              <AiOutlineFileText className={styles.icon} />
              <p>64 articles</p>
            </li>
            <li>
              <IoIosInfinite className={styles.icon} />
              <p>3 Month access</p>
            </li>
            {/* <li id={styles.highlight}> */}
            <li>
              <AiOutlineTrophy className={styles.icon} />
              <p>Certification</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
