/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { userContext } from "@/context/userContext";
import styles from "@/styles/Community.module.css";
import { Box, Button, HStack, IconButton, Image, Link, Menu, MenuButton, MenuItem, MenuList, Spinner, Stack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsShareFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { refreshUser } from "utils/authentication";
import { api, baseURL } from "utils/urls";
import ReportModal from "./ReportModal";

const text =
  "funny enough my story and opinion is pretty much the same as @ryanfox - but my mint number was higher 😂.\nI like your proposal a lot, I think finding the right criteria for „approval“ will be quite important. \n\nVery interested in theme focused forks. I think a music focused @mixtape fork would be awesome.";

export default function Post({ postData, getAllPosts, setPostData, hideShare, type }) {
  const router = useRouter();
  const { userData, setUserData } = useContext(userContext)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [loading, setLoading] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const handleClick = () => {
    router.push(`/post/${postData?._id}`);
  };

  const handleLikePost = async () => {
    try {
      setLoading(true)

      if(!userData?._id){
        let user = await refreshUser()
        setUserData(user.data)
      }

      if (!postData?._id) {
        return toast.error('Something went wrong! Please refresh.')
      }

      let response = await api( hideShare ? '/community/comment/like' : '/community/post/like', 'post', {
        postId: postData?._id
      })

      if (response?.data?._id) {
        await getAllPosts( hideShare? response?.data?.parent : response?.data?._id)
      } else {
        toast.error('Something went wrong while liking post!')
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCopyPostUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.host + '/post/' + postData?._id)
      toast.success('Post url copied to clipboard!')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (postData?.likes?.length > 0) {
      let currentUser = postData.likes.find((userId) => {
        return userId == userData?._id
      })
      if (currentUser) {
        !isLiked && setIsLiked(true)
      } else {
        isLiked && setIsLiked(false)
      }
    } else {
      isLiked && setIsLiked(false)
    }
  }, [postData])

  // useEffect(() => {
  //   if (!userData?._id) {
  //     (async () => {
  //       let response = await refreshUser('post')
  //       setUserData(response?.data)
  //     })()
  //   }
  // }, [userData])

  return (
    <div onClick={handleClick} className={styles.post}>
      <div className={styles.header}>
        <Image src="https://ik.imagekit.io/bayc/assets/ape4.png" />
        <VStack alignItems="flex-start">
          <Text>{postData?.author?.userDetail?.username}</Text>
          {
            type == 'event' && postData?.eventDate &&
            <Text color="whiteAlpha.400" marginTop="0 !important" fontSize="sm">
              Event Time · {moment(postData?.eventDate).format('hh:mm A')} · {moment(postData?.eventDate).format('MMM DD, YYYY')}
            </Text>
          }
        </VStack>
        {
          !hideShare &&
          <Menu isLazy>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<BsThreeDotsVertical />}
              variant='ghost'
              isRound
              marginLeft={'auto'}
              onClick={(event) => { event.stopPropagation() }}
            />
            {/* <button onClick={(event) => { onOpen(); event.stopPropagation() }} className={styles.option}>
              <BsThreeDotsVertical />
            </button> */}
            <MenuList>
              {/* MenuItems are not rendered unless Menu is open */}
              <MenuItem onClick={(event) => { onOpen(); event.stopPropagation() }} >Report</MenuItem>
            </MenuList>
          </Menu>
        }

        <ReportModal getAllPosts={getAllPosts} isOpen={isOpen} onClose={onClose} onOpen={onOpen} postId={postData?._id} />
      </div>
      <div className={styles.body}>
        <p>{postData?.content}</p>
        {
          type == 'learning' && postData?.contentUrl &&
          <Button size={'sm'} style={{ margin: '1.5rem 0' }} variant={'outline'} >
            <Link href={postData?.contentUrl} >Visit content</Link>
          </Button>
        }
        {
          type == 'event' && postData?.eventUrl &&
          <Button size={'sm'} style={{ margin: '1.5rem 0' }} variant={'outline'} >
            <Link href={postData?.eventUrl} >Visit event</Link>
          </Button>
        }
        {/* <img
      src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjUxYzFmMmUzYTc0NWMyMWU5NTZlMjJhZTViYzlkYTYxZGJjM2Q5YiZjdD1n/ioopmOHLqIDfGxLLKG/giphy.gif"
      alt="gif"
    /> */}
        {
          postData?.mediaType == 'image' &&
          <Image src={baseURL + `/media/${postData?.media[0]}`} />
        }
        {
          type == 'event' && postData?.buttons?.length > 0 &&
          <Stack style={{ margin: '1.5rem 0' }} >
            {postData?.buttons?.map((buttonData, index) => {
              return <Box key={index} ><Button size={'sm'} variant={'outline'} >
                <Link href={buttonData?.data} >{buttonData?.label}</Link>
              </Button></Box>
            })}
          </Stack>
        }
      </div>
      <div className={styles.cta}>
        <HStack color="pink.400">
          <button style={{ color: 'inherit' }} onClick={(event) => { handleLikePost(); event.stopPropagation() }} className={styles.option} >
            {
              loading ?
                <Spinner size={'xs'} />
                :
                isLiked ?
                  <AiFillHeart className={styles.icon} />
                  :
                  <AiOutlineHeart className={styles.icon} />
            }
          </button>
          <Text fontSize="sm">{postData?.likes?.length || 0}</Text>
        </HStack>
        {
          !hideShare &&
          <HStack color="blue.400">
            <button className={styles.option} style={{ color: 'inherit' }} >
              <FaRegComment className={styles.icon} />
            </button>
            <Text fontSize="sm">{postData?.comments?.length || 0}</Text>
          </HStack>
        }
        {
          !hideShare &&
          <HStack color="purple.400">
            <button onClick={(event) => { handleCopyPostUrl(); event.stopPropagation() }} className={styles.option} style={{ color: 'inherit' }} >
              <BsShareFill className={styles.icon} />
            </button>
          </HStack>
        }
      </div>
    </div>
  );
}
