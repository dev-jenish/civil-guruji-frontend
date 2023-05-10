/* eslint-disable @next/next/no-img-element */
import Auth from "@/components/reusable/Auth";
import Layout from "@/components/reusable/Layout";
import styles from "@/styles/Login.module.css";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  return (
    <Layout childrenHeight="100vh" customHeader={<></>}>
      <div className={styles.container}>
        <h2 id={styles.logo} onClick={() => router.back()}>
          Civil Guruji
        </h2>
        <Auth />
      </div>
    </Layout>
  );
}
