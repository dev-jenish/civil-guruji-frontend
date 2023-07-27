import Layout from "@/components/reusable/Layout";
import { useUserContext, userContext } from "@/context/userContext";
import { Button, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { refreshUser } from "utils/authentication";

export default function Home() {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  const { setShowAuthModal } = useUserContext();

  const { userData, setUserData } = useContext(userContext)

  useEffect(() => {
    if (!colorMode || colorMode == "light") {
      toggleColorMode();
    }
  }, [colorMode]);

  const handleTokens = async () => {
    try {
      let access_token = localStorage.getItem('accessToken')
      let refresh_token = localStorage.getItem('refreshToken')

      if (access_token || refresh_token) {
        let user = await refreshUser()
        setUserData(user.data)
        router.push('/foryou')
      } else {
        router.push('/explore')
      }


    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (userData?._id) {
      router.push('/foryou')
    } else {

      handleTokens()

    }
  }, [])

  return (
    <></>
  )

  // return (
  //   <Layout>
  //     <div className={`wrapper ${styles.container}`}>
  //       <p>Navigate Through Ongoing Pages.</p>
  //       <Button
  //         variant="outline"
  //         colorScheme="gray"
  //         onClick={() => router.push("/login")}
  //       >
  //         Login
  //       </Button>
  //       <Button
  //         variant="outline"
  //         colorScheme="gray"
  //         onClick={() => setShowAuthModal(true)}
  //       >
  //         Login Modal Flow
  //       </Button>
  //       <Button
  //         variant="outline"
  //         colorScheme="gray"
  //         onClick={() => router.push("/explore")}
  //       >
  //         Explore
  //       </Button>
  //       <Button
  //         variant="outline"
  //         colorScheme="gray"
  //         onClick={() => router.push("/course/blockchain-developer-course")}
  //       >
  //         Course Detail
  //       </Button>
  //       <Button
  //         variant="outline"
  //         colorScheme="gray"
  //         onClick={() =>
  //           router.push(
  //             "/course/blockchain-developer-course/64532c7adb65b45ce71ec505"
  //           )
  //         }
  //       >
  //         Topic
  //       </Button>

  //       <Button
  //         variant="outline"
  //         colorScheme="gray"
  //         onClick={() => router.push("/checkout/6Y73D9DGZ")}
  //       >
  //         Checkout
  //       </Button>
  //       <Button
  //         variant="outline"
  //         colorScheme="gray"
  //         onClick={() =>
  //           router.push("/package/blockchain-development-bootcamp")
  //         }
  //       >
  //         Package Detail
  //       </Button>
  //       <Button
  //         variant="outline"
  //         colorScheme="gray"
  //         onClick={() =>
  //           router.push("/package/blockchain-development-bootcamp/1ty5a5f34")
  //         }
  //       >
  //         Package {"->"} Course
  //       </Button>
  //       <Button
  //         variant="outline"
  //         colorScheme="gray"
  //         onClick={() => router.push("/community")}
  //       >
  //         Community
  //       </Button>
  //     </div>
  //   </Layout>
  // );
}
