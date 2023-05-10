import React from "react";
import styles from "@/styles/Layout.module.css";
import Header from "./Header";
import AuthModal from "../modal/AuthModal";
import { useUserContext } from "@/context/userContext";

export default function Layout({
  children,
  customHeader,
  childrenHeight: height,
}) {
  const { showAuthModal, closeModal } = useUserContext();

  return (
    <div className={styles.wrapper}>
      {customHeader ? customHeader : <Header />}
      <div style={{ height }} className={styles.children}>
        {children}
      </div>
      <AuthModal show={showAuthModal} onClose={closeModal} />
    </div>
  );
}
