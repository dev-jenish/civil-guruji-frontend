/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Layout from "@/components/reusable/Layout";
import styles from "@/styles/Explore.module.css";
import CourseCarousel from "@/components/course/CourseCarousel";
import Banner from "@/components/course/Banner";
import PackageCarousel from "@/components/package/PackageCarousel";
import { toast } from "react-hot-toast";
import { api } from "utils/urls";
import { Center, Spinner } from "@chakra-ui/react";

export default function Explore() {

  const [courses, setCourses] = useState([])
  const [bannersData, setBannersData] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState()


  const getAllCourses = async () => {
    try{
      let coursesResult = await api('/course/landing-page-courses', 'get')
      // if(Object?.keys(coursesResult?.data)?.length > 0){
      //   setCourses(coursesResult?.data)
      // }
      let priorityWiseCourses = []
      coursesResult?.data && Object.keys(coursesResult?.data).map((key) => {
        priorityWiseCourses[coursesResult?.data?.[key]?.priority] = { name: key.split('-Id-')[0], data: coursesResult?.data?.[key]?.data, categoryId: key.split('-Id-')[1] }
      })

      let listedCourses = []

      priorityWiseCourses.forEach((category) => {
        if(category?.data){
          let course = category.data.find((course) => {
            return course?.listed == true
          })

          if(course){
            console.log(category)
            listedCourses.push(category)
          }

        }
      })

      setCourses(listedCourses)
    }catch(error){
      console.log(error)
      toast.error('Error while fetching courses')
    }
  }

  const getAllBanners = async () => {
    try{
      let response = await api('/assets/list-banners', 'get')
      if(response?.data?.length>0){
        setBannersData(response?.data)
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getAllBanners()
    getAllCourses()
  }, [])

  useEffect(() => {
    // Function to set filtered courses after a delay
    const setFilteredCoursesWithDelay = (filteredCourses) => {
      setLoading(true); // Set loading to true when the callback starts
      setTimeout(() => {
        setFilteredCourses(filteredCourses);
        setLoading(false); // Set loading to false after the callback finishes
      }, 1500); // 1.5 seconds delay
    };

    if (selectedCategory === 'All') {
      setFilteredCoursesWithDelay(courses);
    } else {
      const filtered = courses.filter((course) => course?.categoryId === selectedCategory);
      setFilteredCoursesWithDelay(filtered);
    }
  }, [selectedCategory, courses]);


  return (
    <Layout>
      <div className={`wrapper ${styles.container}`}>
        <Banner selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={courses.map((course) => ({name: course?.name, id: course?.categoryId }))} bannersData={bannersData} />
        <div className={styles.content}>
          {/* {
            Object.keys(courses)?.length > 0 && Object.keys(courses)?.map((category) => {
              return <CourseCarousel title={category} courses={courses?.[category]?.data || []} />
            })
          } */}
          {
            loading ?
            <Center height={'10rem'} >
              <Spinner />
            </Center>
            :
            filteredCourses && filteredCourses?.map((course, index) => {
              if(course){
                return <CourseCarousel key={index} title={course?.name} courses={course?.data || []} categoryId={course?.categoryId} />
              }
            })
          }
          {/* { packages && <PackageCarousel title={"Packages"} packagesData={packagesData} /> } */}
          {/* <CourseCarousel title="Online Courses" courses={courses?.onlineCourses || []} />
          <PackageCarousel title="Top Packages" />
          <CourseCarousel title="Free Courses" courses={courses?.['freeCourses'] || []} /> */}
        </div>
      </div>
    </Layout>
  );
}
