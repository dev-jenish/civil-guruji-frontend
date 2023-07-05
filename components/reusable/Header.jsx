/* eslint-disable @next/next/no-img-element */
import { userContext } from "@/context/userContext";
import styles from "@/styles/Header.module.css";
import { Avatar, Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, typography } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { api } from "utils/urls";

export default function Header() {

  const { userData } = useContext(userContext)

  const router = useRouter()

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
        {
          userData?._id &&
          <Menu>
            <MenuButton as={Button} _hover={{ backgroundColor: '#2d2d2d' }} colorScheme="" padding={0}>
              <Avatar size={'sm'} name={userData.userDetail.name} src={userData.userDetail.profile_picture} />
            </MenuButton>
            <MenuList>
              <MenuGroup title='Profile'>
                <MenuItem onClick={() => {
                  router.push('/my-profile')
                }} >
                  My profile
                </MenuItem>
                <MenuItem onClick={() => {
                  localStorage.removeItem('accessToken')
                  localStorage.removeItem('refreshToken')
                  router.push('/login')
                }} >
                  Logout
                </MenuItem>
                {/* <MenuItem>Payments </MenuItem> */}
              </MenuGroup>
              {/* <MenuDivider />
              <MenuGroup title='Help'>
                <MenuItem>Docs</MenuItem>
                <MenuItem>FAQ</MenuItem>
              </MenuGroup> */}
            </MenuList>
          </Menu>
        }
        {/* {
          userData?._id &&
          <Link href={'/login'}>
            <Button onClick={() => {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('refreshToken')
            }} >Logout</Button>
          </Link>
        } */}
        {/* <li id={styles.profile}>Harsh Pandey</li> */}
      </ul>
    </div>
  );
}
