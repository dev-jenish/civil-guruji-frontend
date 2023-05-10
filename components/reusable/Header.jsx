/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/Header.module.css";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Header() {
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
        <li>ForYou</li>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        {/* <li id={styles.profile}>Harsh Pandey</li> */}
      </ul>
    </div>
  );
}
