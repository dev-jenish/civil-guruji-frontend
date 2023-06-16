/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import styles from "@/styles/Community.module.css";
import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlineHeart } from "react-icons/ai";
import { BsShareFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { baseURL } from "utils/urls";

const text =
  "funny enough my story and opinion is pretty much the same as @ryanfox - but my mint number was higher 😂.\nI like your proposal a lot, I think finding the right criteria for „approval“ will be quite important. \n\nVery interested in theme focused forks. I think a music focused @mixtape fork would be awesome.";

export default function Post({ postData }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/post/${postData?._id}`);
  };

  return (
    <div onClick={handleClick} className={styles.post}>
      <div className={styles.header}>
        <Image src="https://ik.imagekit.io/bayc/assets/ape4.png" />
        <VStack alignItems="flex-start">
          <Text>{postData?.author?.userDetail?.username}</Text>
          {/* <Text color="whiteAlpha.400" marginTop="0 !important" fontSize="sm">
            Blockchain Developer · 01:56 AM · Feb 24, 2023
          </Text> */}
        </VStack>
        <button className={styles.option}>
          <BsThreeDotsVertical />
        </button>
      </div>
      <div className={styles.body}>
        <p>{postData?.content}</p>
        {/* <img
      src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjUxYzFmMmUzYTc0NWMyMWU5NTZlMjJhZTViYzlkYTYxZGJjM2Q5YiZjdD1n/ioopmOHLqIDfGxLLKG/giphy.gif"
      alt="gif"
    /> */}
    {
          postData?.mediaType == 'image' &&
        <Image src={baseURL + `/media/${postData?.media[0]}`} />
        }
      </div>
      <div className={styles.cta}>
        <HStack color="pink.400">
          <AiOutlineHeart className={styles.icon} />
          <Text fontSize="sm">20</Text>
        </HStack>
        <HStack color="blue.400">
          <FaRegComment className={styles.icon} />
          <Text fontSize="sm">{postData?.comments?.length || 0}</Text>
        </HStack>
        <HStack color="purple.400">
          <BsShareFill className={styles.icon} />
        </HStack>
      </div>
    </div>
  );
}
