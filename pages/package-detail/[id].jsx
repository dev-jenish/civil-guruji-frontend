import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "utils/urls";
import { toast } from "react-hot-toast";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";

const ColoredLine = ({ percentage }) => {
  return (
    <Box bg="#383838" height="7px" width="100%" borderRadius="10px">
      <Box bg="#F56565" height="100%" width={`${percentage}%`} />
    </Box>
  );
};
const PackageDetail = () => {
  const [packageData, setPackageData] = useState();
  const [isLoading, setIsLoading] = useState();
  const getCourseData = async (id) => {
    try {
      setIsLoading(true);
      let response = await api(`/course/package-details/${id}`, "get");
      if (response?.data) {
        setPackageData(response?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Course details fetching failed");
    } finally {
      setIsLoading(false);
    }
  };

  const router = useRouter();
  useEffect(() => {
    if (router.query.id) getCourseData(router.query.id);
  }, [router.query.id]);
  return (
    <>
      <Box>
        <Box px={8} bg="#282828" width="100%">
          <Flex alignItems="center" justifyContent="space-between">
            <Flex direction="column">
              <Box fontSize="2xl">{packageData?.name}</Box>
              <Box alignItems="center">
                <Text fontSize="xs">Rate This Package ☆☆☆☆☆</Text>
              </Box>
            </Flex>
            <Box>
              <Button my={2} bg="#F56565">
                Pay
              </Button>
              <Text fontSize="xs">01/01/2024</Text>
            </Box>
          </Flex>
        </Box>
        <ColoredLine percentage={70} />
        <Flex>
          <Box
            height="100%"
            width="25%"
            backgroundColor="#282828"
            borderRadius="10px"
            padding="10px"
            // mt="66px"
          >
            <Flex
              direction="column"
              height="100%"
              justifyContent="space-between"
            >
              <Box>
                <Box as="span" display="inline-block" marginRight="1">
                  <FaArrowLeft />
                </Box>
                Go Back
              </Box>

              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaSearch color="gray.300" />}
                />
                <Input placeholder="Search" />
              </InputGroup>

              <Box
                height="380px"
                width="97%"
                border="1px"
                borderRadius="5px"
                padding="10px"
                m="2px"
                mt="10px"
              >
                {packageData &&
                  packageData.courses.map((courseInfo, index) => (
                    <Text key={index}>
                      {courseInfo.course ? courseInfo.course.name : ""}
                    </Text>
                  ))}
              </Box>
            </Flex>
            <Flex>
              <Button
                py="0px"
                m="auto"
                leftIcon={<FaDownload />}
                bg="#F56565"
                color="white"
              >
                Download Certificate
              </Button>
            </Flex>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
            backgroundColor="#282828"
            p="20px"
            m="10px"
          >
            <Box position="relative" pb="20px">
              <Image
                src="/course.jpeg"
                alt="Image 1"
                width={300}
                height={200}
              />
              <Button
                position="absolute"
                top="5px"
                right="5px"
                size="sm"
                backgroundColor="#F56565"
              >
                Live
              </Button>
            </Box>

            <Box position="relative" pb="20px">
              <Image
                src="/course.jpeg"
                alt="Image 1"
                width={300}
                height={200}
              />
              <Button
                position="absolute"
                top="5px"
                right="5px"
                bg="#F56565"
                size="sm"
              >
                Live
              </Button>
            </Box>
            <Box position="relative" pb="20px">
              <Image
                src="/course.jpeg"
                alt="Image 1"
                width={300}
                height={200}
              />
              <Button
                position="absolute"
                top="5px"
                right="5px"
                bg="#F56565"
                size="sm"
              >
                Live
              </Button>
            </Box>
            <Box position="relative" pb="20px">
              <Image
                src="/course.jpeg"
                alt="Image 1"
                width={300}
                height={200}
              />
              <Button
                position="absolute"
                top="5px"
                right="5px"
                bg="#F56565"
                size="sm"
              >
                Live
              </Button>
            </Box>
            <Box position="relative" pb="20px">
              <Image
                src="/course.jpeg"
                alt="Image 1"
                width={300}
                height={200}
              />
              <Button
                position="absolute"
                top="5px"
                right="5px"
                bg="#F56565"
                size="sm"
              >
                Live
              </Button>
            </Box>
            <Box position="relative" pb="20px">
              <Image
                src="/course.jpeg"
                alt="Image 1"
                width={300}
                height={200}
              />
              <Button
                position="absolute"
                top="5px"
                right="5px"
                bg="#F56565"
                size="sm"
              >
                Live
              </Button>
            </Box>
            <Box position="relative" pb="20px">
              <Image
                src="/course.jpeg"
                alt="Image 1"
                width={300}
                height={200}
              />
              <Button
                position="absolute"
                top="5px"
                right="5px"
                bg="#F56565"
                size="sm"
              >
                Live
              </Button>
            </Box>
            <Box position="relative" pb="20px">
              <Image
                src="/course.jpeg"
                alt="Image 1"
                width={300}
                height={200}
              />
              <Button
                position="absolute"
                top="5px"
                right="5px"
                bg="#F56565"
                size="sm"
              >
                Live
              </Button>
            </Box>
            <Box position="relative" pb="20px">
              <Image
                src="/course.jpeg"
                alt="Image 1"
                width={300}
                height={200}
              />
              <Button
                position="absolute"
                top="5px"
                right="5px"
                bg="#F56565"
                size="sm"
              >
                Live
              </Button>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};
export default PackageDetail;
