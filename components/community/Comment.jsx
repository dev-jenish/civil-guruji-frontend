/* eslint-disable jsx-a11y/alt-text */
import styles from "@/styles/Community.module.css";
import { Box, Button, HStack, Text, Textarea } from "@chakra-ui/react";
import GifIcon from "public/assets/GifIcon";
import { BsCardImage } from "react-icons/bs";

export default function Comment({ isPost }) {
  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    e.target.style.height = `${Math.min(e.target.scrollHeight, 300)}px`;
  };

  return (
    <Box
      className={styles.post}
      _hover={{ backgroundColor: "#151515" }}
      padding={0}
    >
      <Box
        paddingBlock={4}
        paddingInline={6}
        borderBottom="1px solid"
        borderColor="#1a1a1a"
      >
        <Text fontSize="sm">{isPost ? "Post" : "Comment"}</Text>
      </Box>
      <Textarea
        border={0}
        focusBorderColor="transparent"
        fontFamily="'Poppins', sans-serif !important"
        paddingInline={6}
        placeholder="Write Something"
        resize="none"
        onChange={handleKeyDown}
      />
      <HStack paddingBottom={4} paddingInline={6} gap={4}>
        <BsCardImage id={styles.upload} />
        <GifIcon color="#d6bcfa" size={21} />
        <Button marginLeft="auto !important" size="sm">
          {isPost ? "Post" : "Comment"}
        </Button>
      </HStack>
    </Box>
  );
}
