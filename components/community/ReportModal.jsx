import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { api } from 'utils/urls'

export default function ReportModal({ isOpen, onClose, onOpen, postId, getAllPosts }) {

    const [reportType, setReportType] = useState('')
    const [reportText, setReportText] = useState('')
    const [loading, setLoading] = useState(false)



    const handleSubmitReport = async () => {
        try{

            setLoading(true)

            let payload = {
                type: reportType,
                postId
            }

            if(reportType == ''){ return toast.error('Please select report reason!')}

            if(reportType == 'Something else'){
                if(!reportText){
                    return toast.error('Please enter report reason!')
                }
                payload['text'] = reportText
            }

            let response = await api('/community/post/report', 'post', payload)

            if(response?.data?._id){
                toast.success('Reported successfully!')
                if(getAllPosts){
                    await getAllPosts(response?.data?._id)
                }
                setReportText('')
                setReportType('')
                onClose()
            }


        }catch(error){
            console.log(error)
            toast.error('Error happened while reporting post!')
        }finally{
            setLoading(false)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Report Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <RadioGroup onChange={setReportType} value={reportType}>
                        <Stack direction='column'>
                            <Radio value='it’s spam'>it’s spam</Radio>
                            <Radio value='Nudity or sexual activity'>Nudity or sexual activity</Radio>
                            <Radio value='Hate speech or symbols'>Hate speech or symbols</Radio>
                            <Radio value='Violence or danger'>Violence or danger</Radio>
                            <Radio value='bullying or harassment'>bullying or harassment</Radio>
                            <Radio value='False information'>False information</Radio>
                            <Radio value='Scam or fraud'>Scam or fraud</Radio>
                            <Radio value='Intellectual proprty violation'>Intellectual proprty violation</Radio>
                            <Radio value='Something else'>Something else</Radio>
                        </Stack>
                    </RadioGroup>
                    {
                        reportType == 'Something else' &&
                        <Input mt={'1rem'} type='text' onChange={(event) => { setReportText(event?.target?.value) }} value={reportText} placeholder='Write here...' />
                    }
                </ModalBody>

                <ModalFooter>
                    <Button isLoading={loading} colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button isLoading={loading} onClick={handleSubmitReport} variant='outline'>Report</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
