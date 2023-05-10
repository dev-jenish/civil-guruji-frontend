import Layout from "@/components/reusable/Layout";
import { useUserContext } from "@/context/userContext";
import { Button, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  const { setShowAuthModal } = useUserContext();

  useEffect(() => {
    if (!colorMode || colorMode == "light") {
      toggleColorMode();
    }
  }, [colorMode]);

  return (
    <Layout>
      <div className={`wrapper ${styles.container}`}>
        <p>Navigate Through Ongoing Pages.</p>
        <Button
          variant="outline"
          colorScheme="gray"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
        <Button
          variant="outline"
          colorScheme="gray"
          onClick={() => setShowAuthModal(true)}
        >
          Login Modal Flow
        </Button>
        <Button
          variant="outline"
          colorScheme="gray"
          onClick={() => router.push("/explore")}
        >
          Explore
        </Button>
        <Button
          variant="outline"
          colorScheme="gray"
          onClick={() => router.push("/course/blockchain-developer-course")}
        >
          Course Detail
        </Button>
        <Button
          variant="outline"
          colorScheme="gray"
          onClick={() =>
            router.push(
              "/course/blockchain-developer-course/SbW4TyVYeZrW73avAYbY"
            )
          }
        >
          Topic
        </Button>

        <Button
          variant="outline"
          colorScheme="gray"
          onClick={() => router.push("/checkout/6Y73D9DGZ")}
        >
          Checkout
        </Button>
        <Button
          variant="outline"
          colorScheme="gray"
          onClick={() =>
            router.push("/package/blockchain-development-bootcamp")
          }
        >
          Package Detail
        </Button>
        <Button
          variant="outline"
          colorScheme="gray"
          onClick={() =>
            router.push("/package/blockchain-development-bootcamp/1ty5a5f34")
          }
        >
          Package {"->"} Course
        </Button>
        <Button
          variant="outline"
          colorScheme="gray"
          onClick={() => router.push("/community")}
        >
          Community
        </Button>
      </div>
    </Layout>
  );
}
