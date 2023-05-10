/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/PackageCourses.module.css";
import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlineTrophy } from "react-icons/ai";
import { BsLaptop } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";
import Stars from "../Stars";

export default function PackageCourses() {
  return (
    <div className={styles.container}>
      <Text>Course Included (5)</Text>
      <div className={styles.courses}>
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  );
}

function CourseCard() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/package/blockchain-development-bootcamp/1ty5a5f34");
  };

  return (
    <div onClick={handleClick} className={styles.card}>
      <img
        src="https://images.unsplash.com/photo-1674191362105-a5661aec326d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3NjU0NTc2Ng&ixlib=rb-4.0.3&q=80&w=600"
        alt="Course Image"
      />
      <div className={styles.details}>
        <Text as="h2">Blockchain Cryptography</Text>
        <Text noOfLines="2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
          accusantium assumenda ipsum doloremque quidem totam illum, eum
          voluptatibus nesciunt.
        </Text>
        <span style={{ marginTop: 4 }} id="rating">
          <p>
            3.5 <Stars />
          </p>
          <p>(1200)</p>
        </span>
        <div className={styles.more}>
          <p>
            <AiOutlineTrophy className={styles.icon} /> Certificate
          </p>
          <p>
            <BsLaptop className={styles.icon} /> 3 Hours
          </p>
          <p id={styles.price}>
            <FaRupeeSign className={styles.icon} />
            499
          </p>
        </div>
      </div>
    </div>
  );
}
