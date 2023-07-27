/* eslint-disable @next/next/no-img-element */
import { userContext } from "@/context/userContext";
import styles from "@/styles/Header.module.css";
import { Avatar, Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, typography } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { api } from "utils/urls";
import Select from "react-select";


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
      minWidth: '20rem', // Add your desired minimum width
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
      {/* <Select
        options={options}
        onInputChange={handleInputChange}
        value={options.find((option) => option.value === query)}
        onChange={(selectedOption) => {setQuery(selectedOption ? selectedOption.value : ''); router.push(`/${selectedOption?.value?.isPackage ? "package" : 'course'}/${selectedOption?.value?._id}`)}}
        isClearable
        isSearchable
        styles={customStyles}
      /> */}

      <div className={styles.menuContainer}>
        <button className={`${styles.hamburgerButton} ${isMenuOpen ? styles.active : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
        <li>      
        <Select
        options={options}
        onInputChange={handleInputChange}
        value={options.find((option) => option.value === query)}
        onChange={(selectedOption) => {setQuery(selectedOption ? selectedOption.value : ''); router.push(`/${selectedOption?.value?.isPackage ? "package" : 'course'}/${selectedOption?.value?._id}`)}}
        isClearable
        isSearchable
        styles={customStyles}
      />
</li>
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
