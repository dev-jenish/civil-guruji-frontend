/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import Layout from "@/components/reusable/Layout";
import styles from "@/styles/Explore.module.css";
import CourseCarousel from "@/components/course/CourseCarousel";
import Banner from "@/components/course/Banner";
import PackageCarousel from "@/components/package/PackageCarousel";
import { toast } from "react-hot-toast";
import { api } from "utils/urls";
import { userContext } from "@/context/userContext";
import { useRouter } from "next/router";

export default function ForYou() {
  const router = useRouter()

  const [courses, setCourses] = useState([])
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(false)
  const [recommendedCourses, setReccomendedCourses] = useState([])
  const [purchasedCourses, setPurchasedCourses] = useState([])

  const { userData } = useContext(userContext)


  

  const getAllCourses = async () => {
    try{
      let coursesResult = await api('/course/landing-page-courses', 'get')
      // if(Object?.keys(coursesResult?.data)?.length > 0){
      //   setCourses(coursesResult?.data)
      // }
      let priorityWiseCourses = []
      coursesResult?.data && Object.keys(coursesResult?.data).map((key) => {
        priorityWiseCourses[coursesResult?.data?.[key]?.priority] = { name: key, data: coursesResult?.data?.[key]?.data }
      })
      setCourses(priorityWiseCourses)
    }catch(error){
      console.log(error)
      toast.error('Error while fetching courses')
    }
  }

  const getAllPurchasedCourse = async (userId) => {
    try{
      let response = await api('/course/list-purchased-courses', 'post', {
        userId
      })
      if(response?.data && response?.data?.length>0){
        setPurchasedCourses(response?.data)
      }
    }catch(error){
      console.log(error)
    }
  }
    
    const getRecoomendedCourses = async () => {
        try{
        let phoneNumber = localStorage.getItem('phoneNumber')
        let email = localStorage.getItem('email')


        if(phoneNumber){
          let user = await api('/user/mobile', 'post', {
            phoneNumber: phoneNumber
          })
  
          if(!user?.data?._id){ return toast.error("No saved user found!") }
          let coursesResult = await api(`/course/foryou/${user?.data?._id}`, 'get')
          // let priorityWiseCourses = []
        // coursesResult?.data && Object.keys(coursesResult?.data).map((key) => {
        //   priorityWiseCourses[coursesResult?.data?.[key]?.priority] = { name: key, data: coursesResult?.data?.[key]?.data }
        // })
        setReccomendedCourses(coursesResult?.data)
        }
    }catch(error){
        console.log(error)
    }
  }

  useEffect(() => {
    if(!userData?._id){
    router.push(`/login?previous=${router.asPath}`)
  }
    getRecoomendedCourses()
    getAllCourses()
    if (userData?._id) {
      getAllPurchasedCourse(userData?._id)
  }
  }, [])


  return (
    <Layout>
      <div className={`wrapper ${styles.container}`}>
        <Banner />
        <div className={styles.content}>
          {/* {
            Object.keys(courses)?.length > 0 && Object.keys(courses)?.map((category) => {
              return <CourseCarousel title={category} courses={courses?.[category]?.data || []} />
            })
          } */}
          {
            purchasedCourses && purchasedCourses?.length>0 &&
            <CourseCarousel title={"Start learning"} courses={purchasedCourses} />
          }
          {
              // if(course){
              //   return <CourseCarousel key={index} title={"Reccomendations"} courses={recommendedCourses || []} />
              // }
              recommendedCourses && recommendedCourses?.length>0 && <CourseCarousel key={'reccomendations'} title={"Reccomendations"} courses={recommendedCourses || []} />
              
          }
          {
            courses && courses?.map((course, index) => {
              if(course){
                return <CourseCarousel key={index} title={course?.name} courses={course?.data || []} />
              }
            })
          }
          
          {/* <CourseCarousel title="Online Courses" courses={courses?.onlineCourses || []} />
          <PackageCarousel title="Top Packages" />
          <CourseCarousel title="Free Courses" courses={courses?.['freeCourses'] || []} /> */}
        </div>
      </div>
    </Layout>
  );
}
