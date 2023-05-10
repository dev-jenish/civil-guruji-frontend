/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import styles from "@/styles/Community.module.css";
import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlineHeart } from "react-icons/ai";
import { BsShareFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";

const text =
  "funny enough my story and opinion is pretty much the same as @ryanfox - but my mint number was higher 😂.\nI like your proposal a lot, I think finding the right criteria for „approval“ will be quite important. \n\nVery interested in theme focused forks. I think a music focused @mixtape fork would be awesome.";

export default function Post() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/post/7Ydf4jh9Z");
  };

  return (
    <div onClick={handleClick} className={styles.post}>
      <div className={styles.header}>
        <Image src="https://ik.imagekit.io/bayc/assets/ape4.png" />
        <VStack alignItems="flex-start">
          <Text>Harsh Pandey</Text>
          <Text color="whiteAlpha.400" marginTop="0 !important" fontSize="sm">
            Blockchain Developer · 01:56 AM · Feb 24, 2023
          </Text>
        </VStack>
        <button className={styles.option}>
          <BsThreeDotsVertical />
        </button>
      </div>
      <div className={styles.body}>
        <p>{text}</p>
        {/* <img
      src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjUxYzFmMmUzYTc0NWMyMWU5NTZlMjJhZTViYzlkYTYxZGJjM2Q5YiZjdD1n/ioopmOHLqIDfGxLLKG/giphy.gif"
      alt="gif"
    /> */}
        <img
          src="https://user-content.lenster.xyz/1000,fit/https://images.lens.phaver.com/insecure/raw:1/plain/a92c142aba5de287b3e811d7cb4ffaa6"
          alt="gif"
        />
      </div>
      <div className={styles.cta}>
        <HStack color="pink.400">
          <AiOutlineHeart className={styles.icon} />
          <Text fontSize="sm">20</Text>
        </HStack>
        <HStack color="blue.400">
          <FaRegComment className={styles.icon} />
          <Text fontSize="sm">5</Text>
        </HStack>
        <HStack color="purple.400">
          <BsShareFill className={styles.icon} />
        </HStack>
      </div>
    </div>
  );
}
