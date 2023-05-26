/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/reusable/Layout";
import styles from "@/styles/Checkout.module.css";
import {
  Button,
  Checkbox,
  FormLabel,
  HStack,
  Image,
  Input,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { FaCircle, FaTag } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function Checkout() {
  const [discount, setDiscount] = useState("Civil20");
  const [oneTImeActiveTab, setOneTimeActiveTab] = useState(false);
  const [emiActiveTab, setEmiActiveTab] = useState(false);

  const handleDiscountClick = (fieldName, value) => {
    if (fieldName === "oneTimeActiveTab") {
      if (value === "apply") {
        setOneTimeActiveTab(true);
      } else if (value === "remove") {
        setOneTimeActiveTab(false);
      }
    } else if (fieldName === "emiActiveTab") {
      if (value === "apply") {
        setEmiActiveTab(true);
      } else if (value === "remove") {
        setEmiActiveTab(false);
      }
    }
  };
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.content}>
            <Text fontSize="3xl" fontWeight="500">
              Checkout
            </Text>
            <div className={styles.section}>
              <Text fontSize="xl" marginBottom="16px">
                Billing Address
              </Text>
              <VStack>
                <HStack width="full">
                  <VStack alignItems="flex-start" flex={1}>
                    <Text color="gray.400">Country</Text>
                    <Select placeholder="Select Country">
                      <option selected value="india">
                        India
                      </option>
                    </Select>
                  </VStack>
                  <VStack alignItems="flex-start" flex={1}>
                    <Text color="gray.400">State / Union Territory</Text>
                    <Select placeholder="Select State">
                      <option value="maharashtra">Maharashtra</option>
                      <option value="karnataka">Karnataka</option>
                      <option value="west bengal">West Bengal</option>
                    </Select>
                  </VStack>
                </HStack>
                <Text fontSize="xs" color="gray.500">
                  Civil Guruji is required by law to collect applicable
                  transaction taxes for purchases made in certain tax
                  jurisdictions.
                </Text>
              </VStack>
            </div>
            <div className={styles.section}>
              <Text fontSize="xl" marginBottom="16px">
                We Recommend
              </Text>
              <PackageDetail />
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.content}>
            <Tabs size="sm" variant="button">
              <div className={styles.section}>
                <p className={styles.headText}>Order details</p>
                <TabList>
                  <Tab style={{ fontSize: "14px" }}>One Time Payment</Tab>
                  <Tab style={{ fontSize: "14px" }}>EMI Options</Tab>
                </TabList>
              </div>
              <TabPanels>
                <TabPanel>
                  {!oneTImeActiveTab ? (
                    <div className={styles.tabInnerContent}>
                      <CourseDetail price={"₹499"} />
                      <span className={styles.liner}></span>
                      <h6 className={styles.summary}>Summary</h6>
                      <VStack alignItems="flex-start">
                        <HStack
                          width="full"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          marginBottom="20px"
                        >
                          <Text>Original Price:</Text>
                          <Text>₹499</Text>
                        </HStack>
                        <HStack
                          width="full"
                          justifyContent="space-between"
                          marginTop="0 !important"
                          borderTop="1px solid"
                          borderColor="gray.700"
                          paddingTop={4}
                          marginBottom="24px !important"
                        >
                          <Text as="b">Total:</Text>
                          <Text as="b">₹499</Text>
                        </HStack>
                        <HStack
                          width="full"
                          justifyContent="space-between"
                          marginTop="0 !important"
                          marginBottom="24px !important"
                        >
                          <Input placeholder="Promo Code" value={discount} />
                          <Button
                            variant="outline"
                            onClick={() =>
                              handleDiscountClick("oneTimeActiveTab", "apply")
                            }
                          >
                            Apply
                          </Button>
                        </HStack>
                        <HStack width="full" marginTop="0 !important">
                          <Checkbox
                            size="sm"
                            colorScheme="gray"
                            id="purchase-terms"
                          />
                          <FormLabel
                            htmlFor="purchase-terms"
                            fontSize="xs"
                            color="gray.500"
                            cursor="pointer"
                          >
                            <Text as="span" marginLeft={1}>
                              By completing your purchase you agree to these
                              Terms of Service.
                            </Text>
                          </FormLabel>
                        </HStack>
                        <Button borderRadius={4} height={12} width="full">
                          Checkout
                        </Button>
                      </VStack>
                    </div>
                  ) : (
                    <div className={styles.tabInnerContent}>
                      <CourseDetail price={"₹499"} />
                      <span className={styles.liner}></span>
                      <h6 className={styles.summary}>Summary</h6>
                      <VStack alignItems="flex-start">
                        <HStack
                          width="full"
                          justifyContent="space-between"
                          alignItems="flex-start"
                        >
                          <Text>Original Price:</Text>
                          <Text>₹499</Text>
                        </HStack>
                        <HStack
                          width="full"
                          justifyContent="space-between"
                          paddingBottom={4}
                        >
                          <HStack gap="5px">
                            <FaTag size={12} color="#2BB970" />
                            <Text>Civil20</Text>
                          </HStack>
                          <Text color="#2BB970">-₹100</Text>
                        </HStack>
                        <HStack
                          width="full"
                          justifyContent="space-between"
                          marginTop="0 !important"
                          borderTop="1px solid"
                          borderColor="gray.700"
                          paddingTop={4}
                          marginBottom="24px !important"
                        >
                          <Text as="b">Total:</Text>
                          <Text as="b" color="#2BB970">
                            ₹399
                          </Text>
                        </HStack>
                        <HStack
                          width="full"
                          justifyContent="space-between"
                          marginTop="0 !important"
                          marginBottom="24px !important"
                        >
                          <HStack>
                            <IoIosCheckmarkCircleOutline
                              size={18}
                              color="#2BB970"
                            />
                            <Text fontSize={14} color="#2BB970">
                              Civil20 Code Applied Successfully
                            </Text>
                          </HStack>
                          <button
                            className={styles.redText}
                            onClick={() =>
                              handleDiscountClick("oneTimeActiveTab", "remove")
                            }
                          >
                            remove
                          </button>
                        </HStack>
                        <HStack width="full" marginTop="0 !important">
                          <Checkbox
                            size="sm"
                            colorScheme="gray"
                            id="purchase-terms"
                          />
                          <FormLabel
                            htmlFor="purchase-terms"
                            fontSize="xs"
                            color="gray.500"
                            cursor="pointer"
                          >
                            <Text as="span" marginLeft={1}>
                              By completing your purchase you agree to these
                              Terms of Service.
                            </Text>
                          </FormLabel>
                        </HStack>
                        <Button borderRadius={4} height={12} width="full">
                          Checkout
                        </Button>
                      </VStack>
                    </div>
                  )}
                </TabPanel>
                <TabPanel>
                 {!emiActiveTab ? (<div className={styles.tabInnerContent}>
                    <CourseDetail price={"₹699"} />
                    <span className={styles.liner}></span>
                    <h6 className={styles.summary}>Summary</h6>
                    <VStack alignItems="flex-start">
                      <HStack
                        width="full"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        backgroundColor="#454546"
                        padding="5px 10px"
                      >
                        <Text fontSize={14}>1st EMI</Text>
                        <Text fontSize={14}>₹399</Text>
                      </HStack>
                      <HStack
                        width="full"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        padding="5px 10px"
                      >
                        <Text fontSize={14}>2nd EMI</Text>
                        <Text fontSize={14}>₹150</Text>
                      </HStack>
                      <HStack
                        width="full"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        padding="5px 10px"
                      >
                        <Text fontSize={14}>3rd EMI</Text>
                        <Text fontSize={14}>₹150</Text>
                      </HStack>
                      <HStack
                        width="full"
                        justifyContent="space-between"
                        marginTop="0 !important"
                        borderTop="1px solid"
                        borderColor="gray.700"
                        padding="5px 10px"
                        marginBottom="24px !important"
                      >
                        <Text fontWeight="700" fontSize='16px'>Total:</Text>
                        <Text fontWeight="700" fontSize='16px'>₹699</Text>
                      </HStack>
                      <HStack
                        width="full"
                        justifyContent="space-between"
                        marginTop="0 !important"
                        marginBottom="24px !important"
                      >
                        <Input placeholder="Promo Code" value={discount}/>
                        <Button
                            variant="outline"
                            onClick={() =>
                              handleDiscountClick("emiActiveTab", "apply")
                            }
                          >
                            Apply
                          </Button>
                      </HStack>
                      <HStack width="full" marginTop="0 !important">
                        <Checkbox size="sm" colorScheme="gray" id="purchase-termsEMI"/>
                        <FormLabel
                          htmlFor="purchase-termsEMI"
                          fontSize="xs"
                          color="gray.500"
                          cursor="pointer"
                        >
                          <Text as="span" marginLeft={1}>
                            By completing your purchase you agree to these Terms
                            of Service.
                          </Text>
                        </FormLabel>
                      </HStack>
                      <Button borderRadius={4} height={12} width="full">
                        Enroll @ ₹399
                      </Button>
                    </VStack>
                  </div>) : (
                  <div className={styles.tabInnerContent}>
                    <CourseDetail price={"₹699"} />
                    <span className={styles.liner}></span>
                    <h6 className={styles.summary}>Summary</h6>
                    <VStack alignItems="flex-start">
                      <HStack
                        width="full"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        backgroundColor="#454546"
                        padding="5px 10px"
                      >
                        <Text fontSize={14}>1st EMI</Text>
                        <HStack justifyContent="space-between" width="30%">
                          <Text fontSize={14} textDecoration="line-through">
                            ₹399
                          </Text>
                          <Text fontSize={14} color="#2BB970">
                            ₹359
                          </Text>
                        </HStack>
                      </HStack>
                      <HStack
                        width="full"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        padding="5px 10px"
                      >
                        <Text fontSize={14}>2nd EMI</Text>
                        <HStack justifyContent="space-between" width="30%">
                          <Text fontSize={14} textDecoration="line-through">
                            ₹150
                          </Text>
                          <Text fontSize={14} color="#2BB970">
                            ₹100
                          </Text>
                        </HStack>
                      </HStack>
                      <HStack
                        width="full"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        padding="5px 10px"
                      >
                        <Text fontSize={14}>3rd EMI</Text>
                        <HStack justifyContent="space-between" width="30%">
                          <Text fontSize={14} textDecoration="line-through">
                            ₹150
                          </Text>
                          <Text fontSize={14} color="#2BB970">
                            ₹100
                          </Text>
                        </HStack>
                      </HStack>
                      <HStack
                        width="full"
                        justifyContent="space-between"
                        marginTop="0 !important"
                        borderTop="1px solid"
                        borderColor="gray.700"
                        padding="5px 10px"
                        marginBottom="24px !important"
                      >
                        <Text fontWeight="700" fontSize="16px">
                          Total:
                        </Text>
                        <HStack justifyContent="space-between" width="30%">
                          <Text
                            fontWeight="700"
                            fontSize="16px"
                            textDecoration="line-through"
                          >
                            ₹699
                          </Text>
                          <Text
                            fontWeight="700"
                            fontSize="16px"
                            color="#2BB970"
                          >
                            ₹559
                          </Text>
                        </HStack>
                      </HStack>
                      <HStack
                        width="full"
                        justifyContent="space-between"
                        marginTop="0 !important"
                        marginBottom="24px !important"
                      >
                        <HStack>
                          <IoIosCheckmarkCircleOutline
                            size={18}
                            color="#2BB970"
                          />
                          <Text fontSize={14} color="#2BB970">
                            Civil20 Code Applied Successfully
                          </Text>
                        </HStack>
                        <button
                          className={styles.redText}
                          onClick={() =>
                            handleDiscountClick("emiActiveTab", "remove")
                          }
                        >
                          remove
                        </button>
                      </HStack>
                      <HStack width="full" marginTop="10px !important">
                        <Checkbox
                          size="sm"
                          colorScheme="gray"
                          id="purchase-termsEMI"
                        />
                        <FormLabel
                          htmlFor="purchase-termsEMI"
                          fontSize="xs"
                          color="gray.500"
                          cursor="pointer"
                        >
                          <Text as="span" marginLeft={1}>
                            By completing your purchase you agree to these Terms
                            of Service.
                          </Text>
                        </FormLabel>
                      </HStack>
                      <Button borderRadius={4} height={12} width="full">
                        Enroll @ ₹359
                      </Button>
                    </VStack>
                  </div> ) }
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function CourseDetail({ highlight, price }) {
  return (
    <div
      className={`${styles.courseDetail} ${highlight ? styles.highlight : ""} `}
    >
      <Image
        borderRadius={3}
        src="https://images.unsplash.com/photo-1674191362105-a5661aec326d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3NjU0NTc2Ng&ixlib=rb-4.0.3&q=80&w=600"
        alt="Blockchain"
      />
      <VStack alignItems="flex-start">
        <Text>Learn Solidity: Smart Contract Development</Text>
      </VStack>
      <VStack marginLeft="auto" alignItems="flex-start">
        <Text>{price}</Text>
      </VStack>
    </div>
  );
}

function PackageDetail() {
  const [showCourses, setShowCourses] = useState(true);

  const toggleCourses = () => {
    setShowCourses((prev) => !prev);
  };

  return (
    <>
      <div className={styles.courseDetail}>
        <Image
          borderRadius={3}
          src="https://images.unsplash.com/photo-1662880195918-63fecf8a8b71?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3NzE4MDIzNQ&ixlib=rb-4.0.3&q=80&w=600"
          alt="Blockchain"
        />
        <VStack alignItems="flex-start">
          <Text>Complete Blockchain Development Bootcamp</Text>
          <HStack
            cursor="pointer"
            color="gray.500"
            marginTop="0 !important"
            _hover={{ color: "gray.400" }}
            onClick={toggleCourses}
          >
            <Text>Includes 5 Courses</Text>
            {showCourses ? <AiOutlineUp /> : <AiOutlineDown />}
          </HStack>
        </VStack>
        <VStack alignItems="flex-end" marginLeft="auto">
          <Text>₹1999</Text>
          {/* <Text marginTop="0 !important" color="gray.500" as="s">
              ₹4999
            </Text> */}
          <Button
            px={3}
            py={2}
            borderRadius={4}
            height="max-content"
            fontSize="12px"
            marginTop="0 !important"
          >
            Purchase
          </Button>
        </VStack>
      </div>
      {showCourses ? (
        <VStack marginTop={4} gap={2} px={4}>
          <CourseDetail />
          <CourseDetail highlight />
          <CourseDetail />
          <CourseDetail />
        </VStack>
      ) : null}
    </>
  );
}
