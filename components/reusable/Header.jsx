/* eslint-disable @next/next/no-img-element */
import { userContext } from "@/context/userContext";
import styles from "@/styles/Header.module.css";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function Header() {

  const { userData } = useContext(userContext)

  const router = useRouter()

  return (
    <div className={styles.header}>
      <Link href="/">
        <h1>Civil Guruji</h1>
      </Link>
      <ul>
        <Link href="/explore">
          <li>Explore</li>
        </Link>
        <Link href="/community">
          <li>Community</li>
        </Link>
        <Link href="/foryou" >
          <li>ForYou</li>
        </Link>
        {
          !(userData?._id) &&
        <Link href={`/login?previous=${router.asPath}`}>
          <Button>Login</Button>
        </Link>
        }
        {/* <li id={styles.profile}>Harsh Pandey</li> */}
      </ul>
    </div>
  );
}
