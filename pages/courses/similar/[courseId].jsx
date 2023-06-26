

import Card from '@/components/course/Card'
import Layout from '@/components/reusable/Layout'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { api } from 'utils/urls'

export default function SimilarCourses() {

    const [courseId, setCourseId] = useState('')
    const [coursesData, setCoursesData] = useState([])
    const [preview, setPreview] = useState(null);


    const router = useRouter()

    const getAllCourses = async () => {
        try {
            const courses = await api(`/course/similar-courses-list/${courseId}`, 'get')
            if (courses?.data) {
                setCoursesData(courses?.data)
            }
        } catch (error) {
            console.log(error)
            toast.error('Error happened while fetching courses!')
        }
    }

    useEffect(() => {
        if (router?.query?.courseId) {
            setCourseId(router?.query?.courseId)
        }
    }, [router?.query])

    useEffect(() => {
        if (courseId) {
            getAllCourses()
        }
    }, [courseId])

    let timer;


    const mouseOver = (num) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            setPreview(num);
            clearTimeout(timer);
        }, [1200]);
    };

    const mouseOut = () => {
        if (timer) clearTimeout(timer);
        setPreview(null);
    };

    return (
        <Layout>
            <h3 style={{paddingTop: '4rem', paddingLeft: '4rem', fontSize: '20px', fontWeight: '500'}} >Similar Related courses</h3>
            <Box display={'flex'} gap={'2rem'} padding={'4rem'} paddingTop={'2rem'} flexWrap={'wrap'} >
                {
                    coursesData?.length > 0 && coursesData.map((course, idx) => {
                        return <Card
                        key={idx}
                            index={idx}
                            showPreview={preview === idx}
                            mouseOver={mouseOver}
                            mouseOut={mouseOut}
                            transformOrigin={
                                idx == 1 ? "left" : coursesData.length == idx ? "right" : "center"
                            }
                            course={course}
                        />
                    })
                }
            </Box>
        </Layout>
    )
}
