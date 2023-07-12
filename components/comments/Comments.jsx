import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import React, { useEffect, useState } from 'react';
import { Box, Text, Avatar, Button, Input, TabPanel, Tabs, TabList, Tab, TabPanels, useColorModeValue} from '@chakra-ui/react';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { api } from 'utils/urls';
import { toast } from 'react-hot-toast';

const Comment = ({ comment, onReplySubmit, getAllComm }) => {
    const { _id, userId, text, createdAt, replies } = comment;
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyText, setReplyText] = useState('');

    const handleReplyClick = () => {
        setShowReplyInput(!showReplyInput);
    };

    const handleReplySubmit = () => {
        // Prepare the reply object
        const reply = {
            _id: new Date().getTime().toString(),
            //   userId: userId._id,
            userId: 'Jenish',
            text: replyText,
            createdAt: new Date().toISOString(),
        };

        // Call the onReplySubmit callback function with the comment ID and the new reply
        onReplySubmit(_id, reply);

        // Reset reply input state
        setShowReplyInput(false);
        setReplyText('');
    };

    const handleAddReply = async () => {
        try {

            const payload = {
                userId: userId?._id,
                text: replyText,
                commentId: comment?._id
            }
            console.log(payload)

            let response = await api('/reply/create', 'post', payload)
            console.log(response?.data)

            await getAllComm()
            setReplyText('')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box display="flex" alignItems="flex-start" mb={'9rem'} padding={'1rem'} borderRadius={'1rem'} _hover={{ backgroundColor: '#3A3939' }} >
            <Avatar name={userId.userDetail.name} src={userId.userDetail.profile_picture} />
            <Box ml={3}>
                <Text fontWeight="bold">{userId.userDetail.name}</Text>
                <Text dangerouslySetInnerHTML={{ __html: text }} ></Text>
                <Text fontSize="sm" color="gray.500">{`Posted on ${new Date(createdAt).toLocaleString()}`}</Text>
                <Button variant="outline" size="sm" alignSelf="flex-end" onClick={handleReplyClick}>
                    Reply
                </Button>
                {showReplyInput && (
                    <Box mt={4}>
                        <ReactQuill
                            value={replyText}
                            onChange={setReplyText}
                            placeholder="Write your reply..."
                        />
                        <Button size="sm" onClick={handleAddReply} mt={2}>
                            Submit
                        </Button>
                    </Box>
                )}
                {console.log(replies)}
                {replies && replies.length > 0 && (
                    <Box mt={4} pl={6} borderLeft="1px solid gray">
                        {replies.map(reply => (
                            <Box key={reply._id} mt={2} display="flex" alignItems="flex-start">
                                <Avatar name={reply.userId?.userDetail?.name} src="" mr={2} />
                                <Box>
                                    <Text fontWeight="bold" mb={1}>{reply.userId?.userDetail?.name}</Text>
                                    <Box dangerouslySetInnerHTML={{ __html: reply.text }} />
                                    <Text fontSize="sm" color="gray.500" mt={1}>
                                        {`Posted on ${new Date(reply.createdAt).toLocaleString()}`}
                                    </Text>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

const CommentsSection = ({ comments, setCommentsData, userId, subModuleId }) => {


    const [text, setText] = useState("")
    const [commData, setCommData] = useState([])
    const [myCommentsData, setMyCommentsData] = useState([])
    const [myReplyCommentsData, setMyReplyCommentsData] = useState([])


    const handleReplySubmit = (commentId, reply) => {
        // Find the comment in the array and add the new reply to its replies array
        const updatedComments = comments.map(comment => {
            if (comment._id === commentId) {
                return {
                    ...comment,
                    replies: [...(comment.replies || []), reply],
                };
            }
            return comment;
        });

        // Update the comments state or trigger an API call to update the comments on the server
        console.log('Updated comments:', updatedComments);
        setCommentsData(updatedComments)
    };

    const getAllComm = async () => {
        try {
            let response = await api(`/comment/read/${subModuleId}`, 'get')
            console.log(response?.data)
            setCommData(response?.data)
        } catch (error) {
            console.log(error)
        }
    }


    const handleAddComment = async () => {
        try {

            if (!userId || !text || !subModuleId) { return toast.error('Faild to load comments!') }

            let payload = {
                userId,
                text: text,
                subModuleId
            }

            console.log(payload)

            let response = await api('/comment/create', 'post', payload)
            console.log(response?.data)

            await getAllComm()
            setText('')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (subModuleId) {
            getAllComm()
        }
    }, [subModuleId])

    useEffect(() => {
        if(commData?.length>0){
            let myComments = []
            let myReplyComments = []
            commData?.map((commentData) => {

                // for my comments
                if(commentData?.userId?._id == userId){
                    myComments.push(commentData)
                }

                // for my replies
                if(commentData?.replies?.length>0){
                    const myReply = commentData?.replies?.find((replyData) => {
                        return replyData?.userId?._id == userId
                    })
                    if(myReply){
                        // found atleast one my reply in comment
                        myReplyComments.push(commentData)
                    }
                }

            })

            if(myComments?.length>0){
                setMyCommentsData(myComments)
            }

            if(myReplyComments?.length>0){
                setMyReplyCommentsData(myReplyComments)
            }

        }
    }, [commData])

    const activeTabColor =  ("#DE076E", "#DE076E");

    return (
        <Box>
            {/* Render your content */}
            <Box my={'1rem'} >
                <ReactQuill
                    value={text}
                    onChange={setText}
                    placeholder="Write your comment here..."
                />
                <Button my={'0.7rem'} onClick={handleAddComment} >Add comment</Button>
            </Box>

            <Tabs>
                <TabList>
                    <Tab _selected={{ color: activeTabColor, borderBottom: `2px solid ${activeTabColor}` }}>All</Tab>
                    <Tab _selected={{ color: activeTabColor, borderBottom: `2px solid ${activeTabColor}` }}>My Questions</Tab>
                    <Tab _selected={{ color: activeTabColor, borderBottom: `2px solid ${activeTabColor}` }}>My replies</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        {/* Render the comments */}
                        { commData?.length >0 ? commData.map(comment => (
                            <Comment
                                key={comment._id}
                                comment={comment}
                                onReplySubmit={handleReplySubmit}
                                getAllComm={getAllComm}
                            />
                        ))
                        :
                        <Text>No comments found!</Text>
                    }
                    </TabPanel>
                    <TabPanel>
                        {
                            myCommentsData?.length>0 ?
                            myCommentsData.map(comment => (
                                <Comment
                                    key={comment._id}
                                    comment={comment}
                                    onReplySubmit={handleReplySubmit}
                                    getAllComm={getAllComm}
                                />
                            ))
                            :
                            <Text pb={'4rem'} >No comments found!</Text>
                        }
                    </TabPanel>
                    <TabPanel>
                        {
                            myReplyCommentsData?.length>0 ?
                            myReplyCommentsData.map(comment => (
                                <Comment
                                    key={comment._id}
                                    comment={comment}
                                    onReplySubmit={handleReplySubmit}
                                    getAllComm={getAllComm}
                                />
                            ))
                            :
                            <Text pb={'4rem'} >No comments found!</Text>
                        }
                    </TabPanel>
                </TabPanels>
            </Tabs>

            {/* Render the comments */}
            {/* {commData.map(comment => (
                <Comment
                    key={comment._id}
                    comment={comment}
                    onReplySubmit={handleReplySubmit}
                    getAllComm={getAllComm}
                />
            ))} */}
        </Box>
    );
};

export default CommentsSection;
