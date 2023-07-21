/* eslint-disable @next/next/no-img-element */
import { userContext } from "@/context/userContext";
import styles from "@/styles/Header.module.css";
import { Avatar, Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, typography } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import Select from "react-select";
import { api } from "utils/urls";
import debounce from 'lodash/debounce';

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


  const [query, setQuery] = useState("")
  const [options, setOptions] = useState([])

  const fetchData = async (value) => {
    try{
      console.log(value)
      let response = await api(`/course/search-course/${value}`, 'get')
      if(response?.data){
        setOptions(response?.data)
      }
    }catch(error){
      console.log(error)
      toast.error("Error happened while searching courses!")
    }
  }

  const debouncedFetchData = debounce((value) => {
    fetchData(value)
  }, 300); // 300ms debounce delay, adjust as needed

  const handleInputChange = (value) => {
    setQuery(value);
    if(value){
      debouncedFetchData(value);
    }else{
      setOptions([])
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#333',
      color: '#fff',
      border: '1px solid #555',
      minWidth: '30rem', // Add your desired minimum width
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#555' : state.isFocused ? '#444' : '#333',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#555', // Change the hover background color
      },
      '&:focus': {
        backgroundColor: '#555', // Change the hover background color
      },
    }),
    input: (provided) => ({
      ...provided,
      color: '#fff', // Font color for the search control
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff', // Font color for the selected input value
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#333',
      marginTop: '1px', // Add a white strip at the top of the options container
      marginBottom: '1px', // Add a white strip at the bottom of the options container
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0, // Remove default padding from the options container
    }),
    // Add more custom styles as needed
  };
  

  return (
    <div className={styles.header}>
      <Link href="/">
        <h1>Civil Guruji</h1>
      </Link>
      <Select
        options={options}
        onInputChange={handleInputChange}
        value={options.find((option) => option.value === query)}
        onChange={(selectedOption) => {setQuery(selectedOption ? selectedOption.value : ''); router.push(`/${selectedOption?.value?.isPackage ? "package" : 'course'}/${selectedOption?.value?._id}`)}}
        isClearable
        isSearchable
        styles={customStyles}
      />
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
