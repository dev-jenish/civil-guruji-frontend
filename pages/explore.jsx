/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Layout from "@/components/reusable/Layout";
import styles from "@/styles/Explore.module.css";
import CourseCarousel from "@/components/course/CourseCarousel";
import Banner from "@/components/course/Banner";
import PackageCarousel from "@/components/package/PackageCarousel";
import { toast } from "react-hot-toast";
import { api } from "utils/urls";

export default function Explore() {

  const [courses, setCourses] = useState([])


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
      console.log(priorityWiseCourses, "course result")
    }catch(error){
      console.log(error)
      toast.error('Error while fetching courses')
    }
  }

  useEffect(() => {
    getAllCourses()
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
