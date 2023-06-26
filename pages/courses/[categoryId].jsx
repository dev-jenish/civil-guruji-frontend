

import Card from '@/components/course/Card'
import Layout from '@/components/reusable/Layout'
import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { api } from 'utils/urls'

export default function CategoryWiseCourse() {

    const [categoryId, setCategoryId] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [coursesData, setCoursesData] = useState([])
    const [preview, setPreview] = useState(null);


    const router = useRouter()

    const getAllCourses = async () => {
        try {
            const courses = await api(`/course/category-wise-list/${categoryId}`, 'get')
            if (courses?.data) {
                setCoursesData(courses?.data?.courses)
                setCategoryName(courses?.data?.categoryName)
            }
        } catch (error) {
            console.log(error)
            toast.error('Error happened while fetching courses!')
        }
    }

    useEffect(() => {
        if (router?.query?.categoryId) {
            setCategoryId(router?.query?.categoryId)
        }
    }, [router?.query])

    useEffect(() => {
        if (categoryId) {
            getAllCourses()
        }
    }, [categoryId])

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
            <h3 style={{paddingTop: '4rem', paddingLeft: '4rem', fontSize: '20px', fontWeight: '500'}} >{categoryName}</h3>
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
