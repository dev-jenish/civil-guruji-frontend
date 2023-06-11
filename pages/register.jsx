/* eslint-disable @next/next/no-img-element */
import Auth from "@/components/reusable/Auth";
import Layout from "@/components/reusable/Layout";
import styles from "@/styles/Login1.module.css";
import { Button, Input } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import ellipseBorder from '../public/assets/ellipse-border.png'
import logoPrimary from '../public/assets/logo-primary.png'
import logoSecondary from '../public/assets/logo-secondary.png'
import ellipseFilled from '../public/assets/ellipse-filled.png'
import youtubeIcon from '../public/assets/Youtube.png'
import facebookIcon from '../public/assets/Facebook.png'
import instagramIcon from '../public/assets/Instagram.png'
import linkdinIcon from '../public/assets/Linkdin.png'
import twitterIcon from '../public/assets/twitter.png'
import RegisterAuth from "@/components/reusable/RegisterAuth";

export default function Login() {
    const router = useRouter();

    return (
        <Layout childrenHeight="100vh" customHeader={<></>}>
            <div className={styles.container}>
                <h2 id={styles.logo} onClick={() => router.back()}>
                    Civil Guruji
                </h2>

                <div className={styles.cardContainer} >
                    <div className={styles.card}>
                    <Image width={115} height={135} src={logoPrimary} alt="logo-primary" />
                    <h2 className={styles.title}>Hello Engineers!</h2>
                    <p className={styles.description}>To stay connected, Login with your personal details.</p>
                    <div className={styles.dotsContainer}>
                        <Image width={8} height={8} src={ellipseBorder} alt="ellipse-border" />
                        <Image width={8} height={8} src={ellipseFilled} alt="ellipse-filled" />
                        <Image width={8} height={8} src={ellipseBorder} alt="ellipse-border" />
                    </div>
                    <div className={styles.socialMediaContainer}>
                        <p className={styles.socialMediaText} >Follow us on</p>
                        <div className={styles.linksContainer} >
                            <a href="https://youtube.com/"><Image width={20} height={20} src={youtubeIcon} alt="Youtube" /></a>
                            <a href="facebook.com"><Image width={10} height={15} src={facebookIcon} alt="facebook" /></a>
                            <a href="instagram.com"><Image width={14} height={14} src={instagramIcon} alt="instagram" /></a>
                            <a href="linkdin.com"><Image width={15} height={15} src={linkdinIcon} alt="linkdin" /></a>
                            <a href="twitter.com"><Image width={18} height={18} src={twitterIcon} alt="twitter" /></a>
                        </div>
                    </div>
                    <Image className={styles.logoSecondary} width='100%' src={logoSecondary} alt="logo-secondary" ></Image>
                    </div>
                    <div className={styles.card}>
                        <h2 className={styles.title} >Login</h2>
                        {/* <Auth /> */}
                        <RegisterAuth />
                        {/* <div className={styles.step}>
                            <p>Name</p>
                            <Input placeholder="Harsh Pandey" size="lg" />
                            <p>Email</p>
                            <Input type="email" placeholder="coding.harshp@gmail.com" size="lg" />
                            <p>Date of Birth</p>
                            <Input type="date" placeholder="Harsh Pandey" size="lg" />
                            <p>Year of Passing</p>
                            <Input
                                type="number"
                                min="1900"
                                max="2099"
                                step="1"
                                placeholder="Harsh Pandey"
                                size="lg"
                            />

                            <div className={styles.cta}>
                                <Button onClick={() => { }}>Next</Button>
                            </div>
                        </div> */}
                    </div>
                </div>

            </div>
        </Layout>
    );
}
