/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/PackageFloatCard.module.css";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlineFileText, AiOutlineTrophy } from "react-icons/ai";
import { BsLaptop, BsPhone } from "react-icons/bs";
import { IoIosInfinite } from "react-icons/io";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";

export default function PackageFloatCard({}) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img
          src="https://public.bnbstatic.com/static/academy/uploads-original/37ba7ddb25b14d3e9eb4d36c54837976.png"
          alt="thumbnail"
        />
      </div>
      <div style={{ paddingTop: 8 }} className={styles.content}>
        <HStack>
          <p id={styles.price}>₹3,499</p>
          <Text as="s">₹14,999</Text>
        </HStack>
        <Button
          onClick={() => router.push("/checkout/6Y73D9DGZ")}
          borderRadius={2}
          w="full"
        >
          Enroll Now
        </Button>
        <div className={styles.include}>
          {/* <p>This course includes:</p> */}
          <ul>
            <li id={styles.highlight}>
              <AiOutlineTrophy className={styles.icon} />
              <p>Certification</p>
            </li>

            <li>
              <BsLaptop className={styles.icon} />
              <p>5 hours of content</p>
            </li>
            <li>
              <AiOutlineFileText className={styles.icon} />
              <p>64 articles</p>
            </li>
            <li>
              <TiSortAlphabeticallyOutline
                className={styles.icon}
                style={{ width: 24 }}
              />
              <p>Hindi</p>
            </li>
            <li>
              <IoIosInfinite className={styles.icon} />
              <p>Full lifetime access</p>
            </li>
            <li>
              <BsPhone className={styles.icon} />
              <p>Access on mobile</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
