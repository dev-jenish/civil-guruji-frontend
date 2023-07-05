import Quiz from "@/components/course/Quiz";
import SessionCard from "@/components/course/SessionCard";
import Layout from "@/components/reusable/Layout";
import styles from "@/styles/Topic.module.css";
import {
    Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  PinInput,
  PinInputField,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
// import Link from "next/link";


import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import {
  AiOutlineBulb,
  AiOutlineDown,
  AiOutlineFile,
  AiOutlineUp,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import { BiCommentDetail, BiCube } from "react-icons/bi";
import {
  BsArrowLeft,
  BsArrowRight,
  BsLaptop,
  BsListNested,
  BsPlayBtn,
  BsSearch,
} from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
import ReactPlayer from "react-player";
import { api } from "utils/urls";
import { toast } from "react-hot-toast";
import QuizComponent from "@/components/course/QuizComponent";
import ZoomComponent from "@/components/zoom/ZoomComponent";
import CommentsSection from "@/components/comments/Comments";
// import VideoPlayer from "@/components/Player";
import { userContext } from "@/context/userContext";
import moment from "moment";
import FinalQuizComponent from "@/components/course/FinalQuizComponent";
import { MdOutlineManageAccounts } from "react-icons/md";
import { refreshUser } from "utils/authentication";

export default function Topic({ topic, course }) {
  const router = useRouter()

  const { userData, setUserData } = useContext(userContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [whatsAppNumber, setWhatsAppNumber] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [passingYear, setPassingYear] = useState('')
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [isProfileLoading, setIsProfileLoading] = useState(false)
  const [hearAbout, setHearAbout] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [reEnterPassword, setReEnterPassword] = useState('')

  
  useEffect(() => {

    (async () => {
      if(!userData?._id){
        let user = await refreshUser()
        setUserData(user.data)
        setName(user.data.userDetail.name)
        setEmail(user.data.userDetail.email)
        setPhoneNumber(user.data.phoneNumber)
        setDateOfBirth(moment(user.data.userDetail.date_of_birth).format("YYYY-MM-DDTHH:mm"))
        setPassingYear(user.data.userDetail.year_of_passing)
        setWhatsAppNumber(user.data.userDetail.whatsapp_number)
        setState(user.data.userDetail.state)
        setCity(user.data.userDetail.city)
        setHearAbout(user.data.hearAbout)
      }else{
        setName(userData.userDetail.name)
        setEmail(userData.userDetail.email)
        setPhoneNumber(userData.phoneNumber)
        setDateOfBirth(moment(userData.userDetail.date_of_birth).format("YYYY-MM-DDTHH:mm"))
        setPassingYear(userData.userDetail.year_of_passing)
        setWhatsAppNumber(userData.userDetail.whatsapp_number)
        setState(userData.userDetail.state)
        setCity(userData.userDetail.city)
        setHearAbout(userData.hearAbout)
      }
    })()
    
  }, [userData])

  const handleUpdateProfileDetails = async () => {
    try{

      setIsProfileLoading(true)

      let payload = {
        state,
        city,
        whatsapp_number: whatsAppNumber,
        date_of_birth: dateOfBirth,
        year_of_passing: passingYear
      }

      let response = await api('/user/profile-details', 'post', payload)

      if(response?.data?._id){
        setUserData(response?.data)
      }

      toast.success('Details updated successfully!')

    }catch(error){
      console.log(error)
      toast.error('Error while updating profile details!')
    }finally{
      setIsProfileLoading(false)
    }
  }

  const handleChangeHearAbout = async (value) => {
    setHearAbout(value)
    try{
      let response = await api('/user/save-hear-about', 'post', { hearAbout: value })
      if(response?.data?._id){
        setUserData(response?.data)
      }
      toast.success("Answer saved successfully!")
    }catch(error){
      console.log(error)
      toast.error('Error while saving your answer!')
    }
  }

  const handlePasswordChange = async () => {
    try{

      if(currentPassword?.length<4 || newPassword?.length<4 || reEnterPassword?.length<4){
        return toast.error('Pleasse enter valid password!')
      }

      if(newPassword != reEnterPassword){ return toast.error('new password and confirm password does not match') }

      let payload = {
        currentPassword,
        newPassword
      }
      
      let response = await api('/user/change-password', 'post', payload)
      if(response?.data?._id){
        setUserData(response?.data)
      }
      toast.success('Password changed successfully!')
    }catch(error){
      toast.error('Error while changing password!')
      console.log(error)
    }
  }



  return (
    <Layout>
      <div className={styles.container}>
        <SideNav name={name} phoneNumber={phoneNumber} email={email} />
        <div className={styles.markdown}>
          <div className="profile-page" >
            <Text fontSize={'md'} >My Profile Details</Text>
            <Stack gap={'2rem'} background={'#292A2E'} p={'2rem'} borderRadius={'0.4rem'} mt={'1rem'} >
                <HStack gap={'4rem'} >
                    <FormControl>
                        <FormLabel color={'#DE076E'} >Full Name</FormLabel>
                        <Input type="text" value={name} onChange={(event) => setName(event.target.value)} ></Input>
                    </FormControl>
                    <FormControl>
                        <FormLabel color={'#DE076E'} >Email</FormLabel>
                        <Input isDisabled type="email" value={email} onChange={(event) => setEmail(event.target.value)}  ></Input>
                    </FormControl>
                </HStack>
                <HStack gap={'4rem'} >
                    <FormControl>
                        <FormLabel color={'#DE076E'} >Mobile number</FormLabel>
                        <InputGroup>
                        {/* <InputLeftAddon background={'inherit'} borderColor={'inherit'} /> */}
                        <Input isDisabled type="number" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} ></Input>
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel color={'#DE076E'} >Whatsapp number</FormLabel>
                        <InputGroup>
                        {/* <InputLeftAddon background={'inherit'} borderColor={'inherit'} /> */}
                        <Input type="number" value={whatsAppNumber} onChange={(event) => setWhatsAppNumber(event.target.value)}  ></Input>
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel color={'#DE076E'} >Date of birth</FormLabel>
                        <Input type="datetime-local" value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)}  ></Input>
                    </FormControl>
                </HStack>
                <HStack gap={'4rem'} >
                    <FormControl>
                        <FormLabel color={'#DE076E'} >State</FormLabel>
                        <Input type="text" value={state} onChange={(event) => setState(event.target.value)}  ></Input>
                    </FormControl>
                    <FormControl>
                        <FormLabel color={'#DE076E'} >City</FormLabel>
                        <Input type="text" value={city} onChange={(event) => setCity(event.target.value)}  ></Input>
                    </FormControl>
                    <FormControl>
                        <FormLabel color={'#DE076E'} >Passing year</FormLabel>
                        <Input type="number" value={passingYear} onChange={(event) => setPassingYear(event.target.value)} ></Input>
                    </FormControl>
                </HStack>
            </Stack>
            <Stack padding={'2rem'} >
                <Button width={'max-content'} isLoading={isProfileLoading} onClick={handleUpdateProfileDetails} >Save details</Button>
            </Stack>
            <Stack>
                    <Text color={'#DE076E'} >Where did you hear about Civil Guruji?</Text>
                    <RadioGroup onChange={handleChangeHearAbout} value={hearAbout}>
                      <Stack direction='row' gap={'2rem'}>
                        <Radio value='google'>Google</Radio>
                        <Radio value='facebook'>Facebook</Radio>
                        <Radio value='instagram'>Instagram</Radio>
                        <Radio value='youtube'>YouTube</Radio>
                        <Radio value='linkedin'>LinkedIn</Radio>
                        <Radio value='twitter'>Twitter</Radio>
                        <Radio value='friend'>Friend</Radio>
                        <Radio value='other'>Other</Radio>
                      </Stack>
                    </RadioGroup>
            </Stack>
          </div>
          <Divider p={'2rem'} borderColor={'#DE076E'} borderBottomWidth={'3px'} />
          <div className="profile-page" style={{ marginTop: '4rem' }} >
            <Text fontSize={'md'} >Change password</Text>
            <Stack gap={'2rem'} background={'#292A2E'} p={'2rem'} borderRadius={'0.4rem'} mt={'1rem'} >
                <HStack gap={'4rem'}  >
                    <FormControl>
                        <FormLabel color={'#DE076E'} >Current Password</FormLabel>
                        <HStack>
                          <PinInput value={currentPassword} onChange={setCurrentPassword} >
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                          </PinInput>
                        </HStack>
                    </FormControl>
                    <FormControl>
                        <FormLabel color={'#DE076E'} >New Password</FormLabel>
                        <HStack>
                          <PinInput value={newPassword} onChange={setNewPassword} >
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                          </PinInput>
                        </HStack>
                    </FormControl>
                    <FormControl>
                        <FormLabel color={'#DE076E'} >Re-enter New Password</FormLabel>
                        <HStack>
                          <PinInput value={reEnterPassword} onChange={setReEnterPassword} >
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                          </PinInput>
                        </HStack>
                    </FormControl>
                </HStack>
            </Stack>
            <Stack padding={'2rem'} >
                <Button width={'max-content'} onClick={handlePasswordChange} >Save details</Button>
            </Stack>
          </div>
          <Divider p={'2rem'} borderColor={'#DE076E'} borderBottomWidth={'3px'} />
          <div className="profile-page" style={{ marginTop: '4rem', marginBottom: '4rem' }} >
            <Text fontSize={'md'} >Delete My Profile</Text>
            <Stack gap={'2rem'} p={'2rem'} borderRadius={'0.4rem'} mt={'1rem'} >
                <HStack gap={'4rem'} >
                    <Checkbox>I agree to delete my Account</Checkbox>
                </HStack>
                <Text fontSize={'14px'} color={'#929292'} >*Please note that if you choose to delete your own profile, your learner account would no longer exist. You would lose access to the courses and resources provided.</Text>
            </Stack>
            <Stack paddingStart={'2rem'} >
                <Button width={'max-content'} >Delete Account</Button>
            </Stack>
          </div>
        </div>
        
        {/* <Navigator slug={topic.slug} /> */}
      </div>
    </Layout>
  );
}

function SideNav({name, phoneNumber, email}) {
  const [showNav, setShowNav] = useState(false);
  const router = useRouter();
  const handleNav = () => {
    setShowNav(!showNav);
  };

  const handleBack = () => {
    router.push(`/course/Blockchain Developer course`);
  };

  const links = [
    {
        label: "Account details",
        route: "/dashboard/profile",
    },
    {
        label: "Certificates",
        route: "/dashboard/certificates",
    },
  ]

  return (
    <div >
      <div onClick={handleNav} className={styles.floatBtn}>
        <BsListNested />
      </div>
      <div className={`${styles.nav} ${!showNav ? styles.hide : ""}`} style={{ backgroundColor: "#292A2E" }}>
        <div onClick={handleBack} className={styles.back}>
          <BsArrowLeft />
          <p>Go Back</p>
        </div>
        {/* new added for tab part and button */}
        <div className={styles.tabWrapper}>

            <VStack padding={'2rem'}  >
                <Box>
                    <Image borderRadius={'50%'} src='/assets/profile_image.png' />
                </Box>
                <Box>
                    <Text fontWeight={'medium'} >{name}</Text>
                </Box>
                <Box>
                    <Text >+91 {phoneNumber}</Text>
                </Box>
                <Box>
                    <Text >{email}</Text>
                </Box>
            </VStack>

          <Link bg={'#000'} _hover={{ background: '#000' }} borderTopLeftRadius={'1rem'} borderBottomLeftRadius={'1rem'} className={styles.heading} style={{ marginTop: '2rem' }}  >
            <MdOutlineManageAccounts />
          <li style={{ listStyle: 'none' }} >
          Account details
          </li>
          </Link>

          {/* certificates */}
          {/* <Link href={'/'} _hover={{ backgroundColor: '#000' }} borderTopLeftRadius={'1rem'} borderBottomLeftRadius={'1rem'} className={styles.heading} style={{ }}  >
            <MdOutlineManageAccounts />
          <li style={{ listStyle: 'none' }} >
            My Certificates
          </li>
          </Link> */}

        </div>
      </div>
    </div>
  );
}

function Accordian({
  savedPro,
  learningPercentage,
  videoProgeress,
  module,
  selectedTopic,
  setSelectedTopic,
  moduleIndex,
  courseProgressionData
}) {
  const [showTopics, setShowTopics] = useState(true);
  const router = useRouter();

  const [doneTopics, setDoneTopics] = useState(0)

  const handleSwitch = () => {
    setShowTopics(!showTopics);
  };

  const id = router.query.id;

  useEffect(() => {

    let count = 0

    courseProgressionData?.subModules?.map((subModuleData) => {


      module.courseSubContents.map((topic) => {
        if(topic?._id == subModuleData?.subModule){
          count += 1
        }
      })
    })

    setDoneTopics(count)
  }, [courseProgressionData])

  return (
    <>
      <div onClick={handleSwitch} className={styles.heading}>
        {showTopics ? (
          <AiOutlineUp className={styles.arrowDown} />
        ) : (
          <AiOutlineDown className={styles.arrowDown} />
        )}
        <p>{module?.courseContentName}</p>
        <span className={styles.gap}>
          <p>
            {doneTopics}/
            {module.courseSubContents &&
              (module.courseSubContents?.length || 0)}
          </p>
          <BsPlayBtn />
        </span>
      </div>
      {showTopics && (
        <div style={{ marginBottom: 20 }} className={styles.topics}>
          {module.courseSubContents.map((topic, index) => {

            let isCompleted = courseProgressionData?.subModules?.find((subModuleData) => {
              return subModuleData?.subModule == selectedTopic?.subModule?._id
            })

            return (
              <div
                key={topic._id}
                className={`${styles.topic} ${selectedTopic?.subModule === topic
                  ? styles.activeSubmodule
                  : ""
                  }`}
                onClick={() => {
                  setSelectedTopic({ module: module, subModule: topic, subModuleIndex: index, moduleIndex, isLive: false });
                }}
              >
                {topic?.type == 1 ? (
                  <IoMdRadioButtonOn
                    className={styles.accIcon}
                    style={
                      courseProgressionData?.subModules?.find((subModuleData) => {
                        return subModuleData?.subModule == topic?._id
                      })
                      ?
                      { color: 'green' }
                      :
                      {}
                    }
                  />
                )
                :
                courseProgressionData?.subModules?.find((subModuleData) => {
                  return subModuleData?.subModule == topic?._id
                })
                ?
                (
                  <IoMdRadioButtonOn
                    className={styles.accIcon}
                    style={
                      { color: 'green' }
                    }
                  />
                )
                :
                (
                  <IoMdRadioButtonOff className={styles.accIcon} />
                )}
                <p>{topic?.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}


// savedPro > videoProgeress
                      //   ? ((savedPro >= learningPercentage) || courseProgressionData?.subModules?.find((subModuleData) => {
                      //     return subModuleData?.subModule == selectedTopic?.subModule?._id
                      //   }))
                      //     ? { color: "green" }
                      //     : savedPro < learningPercentage && savedPro > 0
                      //       ? { color: "orange" }
                      //       : {}
                      //   : videoProgeress * 100 >= learningPercentage
                      //     ? { color: "green" }
                      //     : videoProgeress * 100 < learningPercentage &&
                      //       videoProgeress * 100 > 0
                      //       ? { color: "orange" }
                      //       (courseProgressionData?.subModules?.find((subModuleData) => {
                      //         return subModuleData?.subModule == selectedTopic?.subModule?._id
                      //       })) 
                      //       ?
                      //       { color: 'green' }
                      //       : 
                      //       {}
                      //       :
                      //       {}