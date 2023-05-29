/* eslint-disable @next/next/no-img-element */
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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineFileText, AiOutlineTrophy } from "react-icons/ai";
import { BsLaptop, BsPhone } from "react-icons/bs";
import { IoIosInfinite } from "react-icons/io";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";

export default function CourseFloatCard({ isPackage, courseData }) {
  const router = useRouter();

  const [emiPlans, setEmiPlans] = useState([])
  const [oneTimePlans,setOneTimePlans] = useState([])
  const [freePlans, setFreePlans] = useState([])

  useEffect(() => {
    if(courseData && courseData?.prices && courseData?.prices?.length>0){
      courseData.prices.map((plan) => {
        if(plan.type == 'Emi subscription'){
          setEmiPlans([...emiPlans, plan])
        }
        if(plan?.type == 'One time payment'){
          setOneTimePlans([...oneTimePlans, plan])
        }
        if(plan?.type == 'Free'){
          setFreePlans([ ...freePlans, plan ])
        }
      })
    }
  }, [courseData])


  return (
    <div className={styles.container}>
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
            <HStack
              flexDirection="row"
              alignItems="flex-start"
              padding="10px"
              justifyContent="space-between"
            >
              <div className={styles.singleBox}>
                <div className={styles.pricePart}>
                  <Text className={styles.afterDiscountPrice}>₹14,847</Text>
                  <Text className={styles.originalPrice}>₹57,200</Text>
                  <Text className={styles.discountPercentage}>74.07% OFF</Text>
                </div>
                <div
                  className={styles.otherInfo}
                  alignItems="center"
                  rowGap="5px"
                  justifyContent="flex-start"
                >
                  <Text className={styles.validity}>Validity : 2 Year</Text>
                  <Text className={styles.emiAvalibility}>EMI Available</Text>
                </div>
              </div>
              <HStack justifyContent="flex-end" paddingTop="10px">
                <Button
                  onClick={() => router.push("/checkout/6Y73D9DGZ")}
                  borderRadius={2}
                  size="sm"
                  variant={isPackage ? "outline" : "solid"}
                >
                  Get Offer
                </Button>
              </HStack>
            </HStack>

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
                      <HStack
                        flexDirection="row"
                        alignItems="flex-start"
                        justifyContent="space-between"
                      >
                        <div className={styles.singleBox}>
                          <div className={styles.pricePart}>
                            <Text className={styles.afterDiscountPrice}>
                              ₹14,847
                            </Text>
                            <Text className={styles.originalPrice}>
                              ₹57,200
                            </Text>
                            <Text className={styles.discountPercentage}>
                              74.07% OFF
                            </Text>
                          </div>
                          <div
                            className={styles.otherInfo}
                            alignItems="center"
                            rowGap="5px"
                            justifyContent="flex-start"
                          >
                            <Text className={styles.validity}>
                              Validity : 2 Year
                            </Text>
                            <Text className={styles.emiAvalibility}>
                              EMI Available
                            </Text>
                          </div>
                        </div>
                        <HStack justifyContent="flex-end" paddingTop="10px">
                          <Button
                            onClick={() => router.push("/checkout/6Y73D9DGZ")}
                            borderRadius={2}
                            size="sm"
                            variant={isPackage ? "outline" : "solid"}
                          >
                            Get Offer
                          </Button>
                        </HStack>
                      </HStack>
                      <HStack
                        flexDirection="row"
                        alignItems="flex-start"
                        justifyContent="space-between"
                      >
                        <div className={styles.singleBox}>
                          <div className={styles.pricePart}>
                            <Text className={styles.afterDiscountPrice}>
                              ₹14,847
                            </Text>
                            <Text className={styles.originalPrice}>
                              ₹57,200
                            </Text>
                            <Text className={styles.discountPercentage}>
                              74.07% OFF
                            </Text>
                          </div>
                          <div
                            className={styles.otherInfo}
                            alignItems="center"
                            rowGap="5px"
                            justifyContent="flex-start"
                          >
                            <Text className={styles.validity}>
                              Validity : 2 Year
                            </Text>
                            <Text className={styles.emiAvalibility}>
                              EMI Available
                            </Text>
                          </div>
                        </div>
                        <HStack justifyContent="flex-end" paddingTop="10px">
                          <Button
                            onClick={() => router.push("/checkout/6Y73D9DGZ")}
                            borderRadius={2}
                            size="sm"
                            variant={isPackage ? "outline" : "solid"}
                          >
                            Get Offer
                          </Button>
                        </HStack>
                      </HStack>
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </HStack>
          </div>
        </VStack>
        <div className={styles.include}>
          {/* <p>This course includes:</p> */}
          <ul>
            <li>
              <BsLaptop className={styles.icon} />
              <p>5 hours of content</p>
            </li>
            <li>
              <AiOutlineFileText className={styles.icon} />
              <p>64 articles</p>
            </li>
            <li>
              <IoIosInfinite className={styles.icon} />
              <p>3 Month access</p>
            </li>
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
