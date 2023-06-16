/* eslint-disable jsx-a11y/alt-text */
import styles from "@/styles/Community.module.css";
import { Box, Button, HStack, Input, Text, Textarea } from "@chakra-ui/react";
import GifIcon from "public/assets/GifIcon";
import { toast } from "react-hot-toast";
import { BsCardImage } from "react-icons/bs";
import ImageUpload from "../reusable/ImageUpload";
import { useContext, useEffect, useState } from "react";
import { userContext } from "@/context/userContext";
import { useRouter } from "next/router";
import { api } from "utils/urls";

export default function Comment({ isPost, postData, getPostData, getAllPosts }) {
  const router = useRouter()


  const [text, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const { userData } = useContext(userContext)

  useEffect(() => {
    if (!userData?._id) {
      router.push(`/login?previous=${router.asPath}`)
    }
  }, [])

  const handleUploadImage = (file) => {
    setSelectedImage(file);
  };


  const handleKeyDown = (e) => {
    setText(e.target.value)
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    e.target.style.height = `${Math.min(e.target.scrollHeight, 300)}px`;
  };

  const handleCreateComment = async () => {
    try{

      if(!text){ return toast.error('Comment cannnot be empty!') }

      let payload = {
        content: text,
        id: postData?._id,
        type: 'comment'
      }

      const response = await api('/community/comment/create', 'post', payload)
      toast.success('Comment added!')
      setText('')

      getPostData(postData?._id)

      console.log(response?.data)

    }catch(error){
      console.log(error)
      toast.error('Error happened while creating comment!')
    }
  }

  const handleCreatePost = async () => {
    try {

      if(!text){ return toast.error('Post cannot be empty!') }

      const formData = new FormData();
      formData.append("content", text);
      if (selectedImage) {
        formData.append("mediaType", "image"); // Assuming the media type is "image"
        formData.append("media", selectedImage);
      }

      const response = await api('/community/post/create', 'post', formData, {
        "Content-Type": "multipart/form-data",
        "x-access-token": localStorage.getItem('accessToken')
      })

      getAllPosts()
      setText('')
      setSelectedImage(null)
      console.log(response)

      // Handle the successful post creation and image upload
      toast.success("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Error happened while creating the post!");
    }
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
        value={text}
      />
      <HStack paddingBottom={4} paddingInline={6} gap={4}>
        {/* <BsCardImage onClick={handleUploadImage} id={styles.upload} />
        </Input> */}
        {
          isPost && 
        <ImageUpload onImageUpload={handleUploadImage} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
        }
        {/* <GifIcon color="#d6bcfa" size={21} /> */}
        <Button onClick={() => {
          if(isPost){
            handleCreatePost()
          }else{
            handleCreateComment()
          }
        }} marginLeft="auto !important" size="sm">
          {isPost ? "Post" : "Comment"}
        </Button>
      </HStack>
    </Box>
  );
}
