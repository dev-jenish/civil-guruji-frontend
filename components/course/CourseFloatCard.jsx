/* eslint-disable @next/next/no-img-element */
import { userContext } from "@/context/userContext";
import styles from "@/styles/CourseFloatCard.module.css";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AiOutlineFileText, AiOutlineTrophy } from "react-icons/ai";
import { BsLaptop, BsPhone } from "react-icons/bs";
import { IoIosInfinite } from "react-icons/io";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";

export default function CourseFloatCard({ isPackage, courseData, totalLearningHours }) {
  const router = useRouter();

  const [emiPlans, setEmiPlans] = useState([])
  const [oneTimePlans, setOneTimePlans] = useState([])
  const [freePlans, setFreePlans] = useState([])
  const [displayPlan, setDisplayPlan] = useState({})
  const [pricePlans, setPricePlans] = useState([])
  const [purchased, setPurchased] = useState([])
  const [emiPurchased, setEmiPurchased] = useState([])

  const { userData } = useContext(userContext)


  let totalDocuments = 0

  if (courseData?.courseDetail?.courseContents && courseData?.courseDetail?.courseContents?.length > 0) {
    courseData?.courseDetail?.courseContents?.map((module) => {
      // if (module?.totalVideos) {
      //   totalVideos += module?.totalVideos
      // }
      if (module?.totalDocuments) {
        totalDocuments += module?.totalDocuments
      }
      // if (module?.totalModels) {
      //   totalModels += module?.totalModels
      // }
    })
  }



  useEffect(() => {

    if (userData?._id && userData?.purchases && userData?.purchases?.length > 0) {
      console.log(userData)

      let purchasedPlans = []
      let emiLeftPlans = []
      userData.purchases.forEach((plan) => {

        let currentTime = moment()

        if (plan.expiresOn && plan.emisPaid >= 0 && plan.emisPaid < 3 && currentTime.isBefore(moment(plan.validityDate))) {
          return emiLeftPlans.push(plan?.planDetail?._id)
        } else if (currentTime.isBefore(moment(plan.validityDate))) {
          return purchasedPlans.push(plan?.planDetail?._id)
        }
      })

      setEmiPurchased(emiLeftPlans)
      setPurchased(purchasedPlans)

    }

    if (courseData && courseData?.prices && courseData?.prices?.length > 0) {
      // courseData.prices.map((plan) => {
      //   if(plan.type == 'Emi subscription'){
      //     setEmiPlans([...emiPlans, plan])
      //   }
      //   if(plan?.type == 'One time payment'){
      //     setOneTimePlans([...oneTimePlans, plan])
      //   }
      //   if(plan?.type == 'Free'){
      //     setFreePlans([ ...freePlans, plan ])
      //   }
      // })
      let plans = []
      courseData.prices.map((plan) => {
        if (plan?.isDisplay) {
          setDisplayPlan({ ...plan })
        } else {
          return plans.push(plan)
        }
      })

      if (plans && plans?.length > 0) {
        setPricePlans(plans)
      }


    }
  }, [courseData])


  return (
    <div className={styles.container} style={isPackage ? { marginTop: "-12rem" } : {}} >
      <div className={styles.img}>
        <img
          src={
            courseData?.thumbnail
              ? courseData?.thumbnail
              : "https://public.bnbstatic.com/static/academy/uploads-original/37ba7ddb25b14d3e9eb4d36c54837976.png"
          }
          alt="thumbnail"
        />
      </div>
      <Box className={styles.content}>
        <VStack gap="10px" backgroundColor="#0D0D0D" width="full">
          <div className={styles.insider}>
            {
              displayPlan && Object.keys(displayPlan)?.length > 0 ?
                <HStack
                  flexDirection="row"
                  alignItems="flex-start"
                  padding="10px"
                  justifyContent="space-between"
                >
                  <div className={styles.singleBox}>
                    <div className={styles.pricePart}>
                      <Text className={styles.afterDiscountPrice}>₹{`${displayPlan?.discountedPrice || 'Free'}`}</Text>
                      {
                        displayPlan?.listPrice ?
                          <Text className={styles.originalPrice}>₹{`${displayPlan?.listPrice}`}</Text>
                          :
                          null
                      }
                      {
                        displayPlan?.discountedPrice ?
                          <Text className={styles.discountPercentage}>{(((displayPlan?.listPrice - displayPlan?.discountedPrice) / displayPlan?.listPrice) * 100).toFixed(2)}% OFF</Text>
                          :
                          null
                      }
                    </div>
                    <div
                      className={styles.otherInfo}
                      style={{
                        alignItems: "center",
                        rowGap: "5px",
                        justifyContent: "flex-start"
                      }}
                    >
                      <Text className={styles.validity}>Validity : {displayPlan?.validity == 'lifetime' ? 'Lifetime' : displayPlan?.validity == 'limited' ? `${displayPlan?.validityYears > 0 ? (displayPlan?.validityYears + ' Years') : ''} ${displayPlan?.validityMonths > 0 ? (displayPlan?.validityMonths + ' Months') : ''}` : 'Error'}</Text>
                      {
                        displayPlan?.type == 'Emi subscription' ?
                          <Text className={styles.emiAvalibility}>EMI Available</Text>
                          :
                          null
                      }
                    </div>
                  </div>
                  <HStack justifyContent="flex-end" paddingTop="10px">
                    <Button
                      onClick={() => router.push(`/checkout/${courseData?._id}/${displayPlan?._id}`)}
                      borderRadius={2}
                      size="sm"
                      variant={"solid"}
                      isDisabled={purchased.includes(displayPlan?._id)}
                    >
                      {emiPurchased.includes(displayPlan?._id) ? 'Pay EMI' : purchased.includes(displayPlan?._id) ? 'Already purchased' : 'Get Offer'}
                    </Button>
                  </HStack>
                </HStack>
                :
                <HStack
                  flexDirection="row"
                  alignItems="flex-start"
                  padding="10px"
                  justifyContent="space-between"
                >
                  <div className={styles.singleBox}>
                    <div className={styles.pricePart}>
                      <Text className={styles.afterDiscountPrice}>Not available for sale!</Text>
                    </div>
                  </div>
                </HStack>
            }

            {
              pricePlans && pricePlans?.length > 0 &&
              <HStack>
                <Accordion width="full" defaultIndex={[0]} allowMultiple>
                  <AccordionItem width="full">
                    <AccordionButton
                      width="full"
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Text>More Offers</Text>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <div className={styles.accordianInsider}>
                        {
                          pricePlans && pricePlans?.length > 0 && pricePlans.map((plan, index) => {

                            return <HStack
                              flexDirection="row"
                              alignItems="flex-start"
                              justifyContent="space-between"
                              key={index}
                            >
                              <div className={styles.singleBox}>
                                <div className={styles.pricePart}>
                                  <Text className={styles.afterDiscountPrice}>
                                    ₹{`${plan?.discountedPrice || 'Free'}`}
                                  </Text>
                                  {
                                    plan?.type !== 'Free' ?
                                      <Text className={styles.originalPrice}>
                                        ₹{plan?.listPrice}
                                      </Text>
                                      :
                                      null
                                  }
                                  {
                                    plan?.type !== 'Free' ?
                                      <Text className={styles.discountPercentage}>
                                        {(((plan?.listPrice - plan?.discountedPrice) / plan?.listPrice) * 100).toFixed(2)}% OFF
                                      </Text>
                                      :
                                      null
                                  }
                                </div>
                                <div
                                  className={styles.otherInfo}
                                  style={{
                                    alignItems: "center",
                                    rowGap: "5px",
                                    justifyContent: "flex-start"
                                  }}
                                >
                                  <Text className={styles.validity}>
                                    Validity : {plan?.validity == 'lifetime' ? 'Lifetime' : plan?.validity == 'limited' ? `${plan?.validityYears > 0 ? (plan?.validityYears + ' Years') : ''} ${plan?.validityMonths > 0 ? (plan?.validityMonths + ' Months') : ''}` : 'Error'}
                                  </Text>
                                  {
                                    plan?.type == 'Emi subscription' ?
                                      <Text className={styles.emiAvalibility}>EMI Available</Text>
                                      :
                                      null
                                  }
                                </div>
                              </div>
                              <HStack justifyContent="flex-end" paddingTop="10px">
                                <Button
                                  onClick={() => router.push(`/checkout/${courseData?._id}/${plan?._id}`)}
                                  borderRadius={2}
                                  size="sm"
                                  variant={"solid"}
                                  isDisabled={purchased.includes(plan?._id)}
                                >
                                  {emiPurchased.includes(plan?._id) ? 'Pay EMI' : purchased.includes(plan?._id) ? 'Already purchased' : 'Get Offer'}
                                </Button>
                              </HStack>
                            </HStack>
                          })
                        }
                      </div>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </HStack>
            }

          </div>
        </VStack>
        <div className={styles.include}>
          {/* <p>This course includes:</p> */}
          <ul>
            <li>
              <BsLaptop className={styles.icon} />
              <p>{totalLearningHours} hours of content</p>
            </li>
            {
              !isPackage &&
              <li>
                <AiOutlineFileText className={styles.icon} />
                <p>{totalDocuments} articles</p>
              </li>
            }
            {/* <li>
              <IoIosInfinite className={styles.icon} />
              <p>3 Month access</p>
            </li> */}
            {/* <li id={styles.highlight}> */}
            <li>
              <AiOutlineTrophy className={styles.icon} />
              <p>Certification</p>
            </li>
          </ul>
        </div>
      </Box>
    </div>
  );
}
