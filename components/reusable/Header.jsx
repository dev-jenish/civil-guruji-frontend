/* eslint-disable @next/next/no-img-element */
import { userContext } from "@/context/userContext";
import styles from "@/styles/Header.module.css";
import { Avatar, Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, typography } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { api } from "utils/urls";

export default function Header() {

  const { userData } = useContext(userContext)

  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await api('/certificates/generate/649392ebd5b18d7d918f74b2', 'post', {}, {}, {
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(response.data)
      console.log(url, ' <== = I am url')
      window.open(url);
    } catch (error) {
      console.log(error)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={styles.header}>
      <Link href="/">
        <h1>Civil Guruji</h1>
      </Link>
      <div className={styles.menuContainer}>
        <button className={`${styles.hamburgerButton} ${isMenuOpen ? styles.active : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
          <li onClick={closeMenu}>
            <Link href="/explore">Explore</Link>
          </li>
          <li onClick={closeMenu}>
            <Link href="/community">Community</Link>
          </li>
          <li onClick={closeMenu}>
            <Link href="/foryou">ForYou</Link>
          </li>
          {!userData?._id && (
            <li onClick={closeMenu}>
              <Link href={`/login?previous=${router.asPath}`}>Login</Link>
            </li>
          )}
          {userData?._id && (
            <li>
              <Menu>
                <MenuButton as={Button} _hover={{ backgroundColor: '#2d2d2d' }} colorScheme="" padding={0}>
                  <Avatar size={'sm'} name={userData.userDetail.name} src={userData.userDetail.profile_picture} />
                </MenuButton>
                <MenuList>
                  <MenuGroup title='Profile'>
                    <MenuItem onClick={() => {
                      localStorage.removeItem('accessToken');
                      localStorage.removeItem('refreshToken');
                      router.push('/login');
                    }}>
                      Logout
                    </MenuItem>
                    {/* { <MenuItem>Payments</MenuItem> } */}
                  </MenuGroup>
                  {/* <MenuDivider />
                  <MenuGroup title='Help'>
                    <MenuItem>Docs</MenuItem>
                    <MenuItem>FAQ</MenuItem>
                  </MenuGroup> */}
                </MenuList>
              </Menu>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
