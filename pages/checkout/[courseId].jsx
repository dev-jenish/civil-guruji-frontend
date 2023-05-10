/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/reusable/Layout";
import styles from "@/styles/Checkout.module.css";
import {
  Button,
  HStack,
  Image,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

export default function Checkout() {
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
            <div className={styles.section}>
              <Text fontSize="xl" marginBottom="16px">
                Order details
              </Text>
              <CourseDetail />
            </div>
            <div className={styles.section}>
              <Text fontSize="xl" marginBottom="16px">
                Summary
              </Text>
              <VStack alignItems="flex-start">
                <HStack
                  width="full"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Text>Original Price:</Text>
                  <Text>₹1299</Text>
                </HStack>
                <HStack
                  width="full"
                  justifyContent="space-between"
                  paddingBottom={4}
                >
                  <Text>Discounts:</Text>
                  <Text>-₹800</Text>
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
                  <Input placeholder="Promo Code" />
                  <Button variant="outline">Apply</Button>
                </HStack>
                <Text fontSize="xs" color="gray.500">
                  By completing your purchase you agree to these Terms of
                  Service.
                </Text>
                <Button borderRadius={4} height={12} width="full">
                  Checkout
                </Button>
              </VStack>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function CourseDetail({ highlight }) {
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
        {/* <Text color="gray.500" marginTop="0 !important">
          by Harsh Pandey
        </Text> */}
      </VStack>
      <VStack marginLeft="auto">
        <Text>₹499</Text>
        <Text marginTop="0 !important" color="gray.500" as="s">
          ₹1299
        </Text>
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
