/* eslint-disable @next/next/no-img-element */
import { userContext } from "@/context/userContext";
import styles from "@/styles/Login.module.css";
import {
    Button,
    HStack,
    Input,
    PinInput,
    PinInputField,
    Progress,
    Text,
} from "@chakra-ui/react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible, AiOutlineClose } from "react-icons/ai";
import { api } from "utils/urls";

export default function RegisterAuth({ isPopup, onClose }) {
    const [step, setStep] = useState(1);
    const [user, setUser] = useState({});
    const [googleUser, setGoogleUser] = useState({})
    const back = () => {
        setStep((prev) => {
            if (prev == 1) return prev;
            return prev - 1;
        });
    };

    const nextStep = () => {
        setStep((prev) => {
            if (prev == 4) return prev;
            return prev + 1;
        });
    };

    return (
        <div className={`${styles.content} ${isPopup ? styles.modal : ""}`}>
            {isPopup ? (
                <button onClick={onClose} className={styles.close}>
                    {/* <AiOutlineClose className={styles.closeIcon} /> */}
                    Close
                </button>
            ) : null}
            {step == 1 ? (
                <StepOne onClose={onClose} setStep={setStep} setUser={setUser} back={back} nextStep={nextStep} isPopup={isPopup} googleUser={googleUser} setGoogleUser={setGoogleUser} />
            ) : null}
            {step == 2 ? (
                <StepTwo onClose={onClose} googleUser={googleUser} user={user} setUser={setUser} back={back} nextStep={nextStep} isPopup={isPopup} />
            ) : null}
            {step == 3 ? <StepThree googleUser={googleUser} nextStep={nextStep} isPopup={isPopup} user={user} setUser={setUser} /> : null}
            {step == 4 ? <StepFour isPopup={isPopup} onClose={onClose} user={user} setUser={setUser} /> : null}
            {step == 5 ? <LoginWithPassword onClose={onClose} googleUser={googleUser} user={user} setUser={setUser} setStep={setStep} nextStep={nextStep} isPopup={isPopup} /> : null}
        </div>
    );
}

function StepOne({ back, onClose, nextStep, setStep, isPopup, setUser, setGoogleUser }) {

    const [mobileNumber, setMobileNumber] = useState('')
    const [showPasswordInput, setShowPasswordInput] = useState(false)
    const [password, setPassword] = useState('')
    const router = useRouter()

    let mobileNumberRegex = /^[6-9]\d{9}$/

    const handleNext = async () => {
        try {
            if (!mobileNumber.match(mobileNumberRegex)) { return toast.error("Invalid mobile number!") }
            let response = await api('/user/signin', "post", { phoneNumber: mobileNumber })
            if (response.status == 200 && response?.data?.access_token == 'OTP Sent') {
                setUser(response?.data)
                toast.success("OTP Sent.");
                nextStep();
            } else if (response.status == 200 && response?.data?.access_token == 'password') {
                setUser(response?.data)
                setStep(5)
            }
        } catch (error) {
            console.log(error)
            toast.error("Error, Please try again later!")
        }
    };

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => handleSuccess(codeResponse),
        onError: (error) => handleError('Login Failed:', error)
    });

    const { setUserData } = useContext(userContext)

    const handleSuccess = async (response) => {
        try {
            let result = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`, {
                headers: {
                    Authorization: `Bearer ${response.access_token}`
                }
            })
            setGoogleUser(result?.data)

            let details = await api('/user/verify/google', 'post', { email: result?.data?.email })
            if (details?.data?.length > 0) {
                console.log(details?.data)
                setUserData(details?.data[0])
                router.push("/explore");
                if (isPopup) onClose();
            } else {
                setStep(3)
            }
            toast.success("Login success!")


        } catch (error) {
            toast.error("Something went wrong!")
            console.log(error)
        }
    }

    const handleError = async (response) => {
        toast.error("Something went wrong!")
    }

    return (
        <div className={styles.step}>
            <p>Login</p>
            <Input value={mobileNumber} onChange={(event) => setMobileNumber(event.target.value)} type="tel" placeholder="+91" size="lg" />
            <div className={styles.cta}>
                <Button onClick={handleNext}>Continue</Button>
            </div>
            <p className={styles.xs_text} >Or Continue With</p>
            <Button onClick={() => login()}>Google</Button>
        </div>
    );
}

function StepTwo({ back, nextStep, isPopup, user, setUser, onClose }) {

    const [otp, setOtp] = useState('')
    const router = useRouter();

    const { setUserData } = useContext(userContext)

    const handleNext = async () => {

        try {

            if (!otp.length == 6) {
                return toast.error("Invalid OTP!")
            }
            let response = await api('/user/verify', 'post', {
                _id: user?._id,
                otp: otp
            })
            setUser({
                ...user,
                ...response?.data
            })
            console.log({
                ...user,
                ...response?.data
            })





            if (response?.data?.userDetail && Object.keys(response?.data?.userDetail)?.length > 0) {
                setUserData(response?.data)
                router.push("/explore");
                if (isPopup) onClose();
            } else {
                nextStep();
            }
            toast.success("Authenticated.");
        } catch (error) {
            console.log(error)
            toast.error("Error while verifying otp!")
        }



    };

    return (
        <div className={styles.step}>
            <p>Enter OTP</p>
            <HStack>
                <PinInput
                    size="lg"
                    type="alphanumeric"
                    placeholder=""
                    focusBorderColor="purple.200"
                    value={otp}
                    onChange={setOtp}
                >
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                </PinInput>
            </HStack>
            <Text color="gray">Resend in 10 Seconds</Text>
            <div className={styles.cta}>
                <Button variant="outline" onClick={back}>
                    Back
                </Button>
                <Button onClick={handleNext}>Submit</Button>
            </div>
        </div>
    );
}

function StepThree({ back, nextStep, isPopup, user, setUser, googleUser }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dob, setDob] = useState('');
    const [yearOfPassing, setYearOfPassing] = useState(0);
    const [mobileNumber, setMobileNumber] = useState('');
    const [isNameAvailable, setIsNameAvailable] = useState(false);
    const [isEmailAvailable, setIsEmailAvailable] = useState(false);
    const [addUsername,setAddUsername]=useState(true)

    useEffect(() => {
        setEmail(googleUser?.email)
        setName(googleUser?.name)
        googleUser?.email && setIsEmailAvailable(true)
        googleUser?.name && setIsNameAvailable(true)
        googleUser?.email && setAddUsername(false)
    }, [googleUser])

    const { setUserData } = useContext(userContext)


    const handleNext = async () => {

        if (!name) { return toast.error("Name is required!") }
        if (!email) { return toast.error("Email is required!") }
        if (addUsername && !username) { return toast.error("Username is required!") }
        if (!dob) { return toast.error("Date of birth is required!") }
        if (!yearOfPassing) { return toast.error("Year of passing is required!") }
        if (!password) { return toast.error("password is required!") }
        if (!confirmPassword) { return toast.error("Confirm password is required!") }
        if (!(confirmPassword == password)) { return toast.error("Password doesn't match!") }

        try {
            let userId = ''
            if (googleUser?.email) {
                let mobileNumberRegex = /^[6-9]\d{9}$/
                if (!mobileNumber.match(mobileNumberRegex)) { return toast.error("Invalid mobile number!") }
                let response = await api('/user/signin', 'post', {
                    phoneNumber: mobileNumber,
                    from: 'google'
                })
                setUser(response?.data)
                userId = response?.data?._id
            }
            let response = await api('/user/details', 'post', {
                userId: userId || user?._id,
                name: name,
                email: email,
                username: username,
                location: '',
                dob: dob,
                yearOfPassing: yearOfPassing,
                password
            })
            setUser(response?.data?.user)
            setUserData(response?.data?.user)
            localStorage.setItem('accessToken', response?.data?.access_token)
            localStorage.setItem('refreshToken', response?.data?.refresh_token)
            toast.success("Your data is secured.");
            nextStep();
        } catch (error) {
            if (error?.response?.data && (error?.response?.data?.keyPattern?.username == 1)) {
                toast.error(`Username ${error?.response?.data?.keyValue?.username} is not available!`)
            } else if (error?.response?.data && (error?.response?.data?.keyPattern?.email == 1)) {
                toast.error(`Email ${error?.response?.data?.keyValue?.email} is already registered with another account!`)
            } else if (error?.response?.status == 406) {
                toast.error('phone number is already registered with different email!')
            }
            else {
                toast.error('Internal server error!')
            }
            console.log(error)
        }

    };

    return (
        <div className={styles.step}>

            <p>Name</p>
            <Input required value={isNameAvailable ? googleUser.name : name} onChange={(event) => { setName(event?.target?.value) }} placeholder="Harsh Pandey" size="lg" />
            {
                googleUser?.email && (
                    <>
                        <p>Phone Number</p>
                        <Input value={mobileNumber} onChange={(event) => setMobileNumber(event.target.value)} type="tel" placeholder="+91" size="lg" />
                    </>
                )
            }
            <p>Email</p>
            <Input value={isEmailAvailable ? googleUser.email : email} onChange={(event) => { setEmail(event?.target?.value) }} type="email" placeholder="coding.harshp@gmail.com" size="lg" />

            {
                !isEmailAvailable && (
                    <>
                        <p>Username</p>
                        <Input value={username} onChange={(event) => { setUsername(event?.target?.value) }} placeholder="jenish123" size="lg" />
                    </>)
            }
            {/* <p>Username</p>
            <Input value={username} onChange={(event) => { setUsername(event?.target?.value) }} placeholder="jenish123" size="lg" /> */}
            <p>Password</p>
            <HStack>
                <PinInput value={password} onChange={(value) => { setPassword(value) }} mask >
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                </PinInput>
            </HStack>
            {/* <Input value={password} onChange={(event) => { setPassword(event?.target?.value) }} placeholder="password" size="lg" /> */}
            <p>Confirm Password</p>
            <HStack>
                <PinInput value={confirmPassword} onChange={(value) => { setConfirmPassword(value) }} mask  >
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                </PinInput>
            </HStack>
            {/* <Input value={confirmPassword} type="password" onChange={(event) => { setConfirmPassword(event?.target?.value) }} placeholder="confirm password" size="lg" /> */}
            <p>Date of Birth</p>
            <Input value={dob} onChange={(event) => { setDob(event?.target?.value) }} type="date" placeholder="DOB" size="lg" />
            <p>Year of Passing</p>
            <Input
                value={yearOfPassing} onChange={(event) => { setYearOfPassing(event?.target?.value) }}
                type="number"
                min="1900"
                max="2099"
                step="1"
                placeholder="YYYY"
                size="lg"
            />

            <div className={styles.cta}>
                {/* <Button colorScheme="whiteAlpha" variant="outline" onClick={back}>
          Back
        </Button> */}
                <Button onClick={handleNext}>Next</Button>
            </div>
        </div>
    );
}

const questions = [
    {
        que: "Greatest developer of all time?",
        options: [
            { opt: "Harsh Pandey", img: "" },
            { opt: "VSP Anirudh", img: "" },
        ],
    },
    {
        que: "Best framework for Front-end?",
        options: [
            { opt: "Nextjs", img: "" },
            { opt: "Angular", img: "" },
        ],
    },
    {
        que: "Worst React Native library?",
        options: [
            { opt: "Nativebase", img: "" },
            { opt: "Nativebase", img: "" },
        ],
    },
];

function StepFour({ isPopup, onClose, user, setUser }) {
    const [queNum, setQueNum] = useState(0);
    const [selected, setSelected] = useState({});
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const { setUserData } = useContext(userContext)

    useEffect(() => {
        console.log(user)
    }, [user])

    const getQuestionsList = async () => {
        try {
            setLoading(true)
            let response = await api('/user/questions', 'get', {})
            let parsedQuestions = response.data.map((item) => {
                return {
                    que: item?.question,
                    options: item?.options?.map((option) => {
                        return {
                            opt: option?.name,
                            img: "",
                            optSkills: option?.skills
                        }
                    })
                }
            })
            setQuestions(parsedQuestions)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getQuestionsList()
    }, [])

    const prevQue = () => {
        if (queNum === 0) {
            return;
        }

        setQueNum((prev) => prev - 1);
    };

    const nextQue = () => {
        if (queNum === questions.length - 1) {
            submit();
            return;
        }

        setQueNum((prev) => prev + 1);
    };

    const submit = async () => {

        try {

            let selectedSkills = []
            Object.keys(selected).map((key) => {
                if (selected?.[key]?.['skills'] && selected?.[key]?.['skills']?.length > 0) {
                    selected?.[key]?.['skills'].map((skill) => {
                        selectedSkills.push(skill)
                    })
                }
            })

            let response = await api('/user/reccomendations', 'post', {
                userId: user._id,
                choice: selectedSkills
            })
            setUser(response?.data)
            toast.success("Done, All the best!")
            // localStorage.setItem("userId", user._id)
            if (user?.phoneNumber) {
                localStorage.setItem("phoneNumber", user?.phoneNumber)
            } else if (user?.userDetail?.email) {
                localStorage.setItem("email", user?.userDetail?.email)
            }
            localStorage.setItem("userId", user._id)
            setUserData(response?.data)
            router.push("/explore");
            if (isPopup) onClose();
        } catch (error) {
            console.log(error)
            toast.error("Error while saving your choices!")
        }


        // await toast.promise(
        //   new Promise((res) =>
        //     setTimeout(() => {
        //       res();
        //     }, [3000])
        //   ),
        //   {
        //     loading: "Generating Courses for you",
        //     success: <b>Done, All the best!</b>,
        //     error: <b>Some error occured</b>,
        //   }
        // );
        // router.push("/explore");
        // if (isPopup) onClose();
    };

    const progress = Math.floor(((queNum + 1) / questions.length) * 100);
    const question = questions[queNum];
    return (
        <>
            {
                loading ? (<p>Loading...</p>) :
                    (
                        <>
                            <Progress
                                borderRadius={4}
                                size="sm"
                                value={progress}
                                background="#151515"
                                colorScheme="purple"
                            />
                            <div className={styles.step}>
                                <p id={styles.que}>{question?.que}</p>
                                <div className={styles.options}>
                                    {question?.options.map((opt, idx) => (
                                        <span
                                            className={selected[queNum]?.['name'] === opt.opt ? styles.selected : ""}
                                            onClick={() => {
                                                setSelected((prev) => ({ ...prev, [queNum]: { name: opt.opt, skills: opt.optSkills } }));
                                            }}
                                            key={idx}
                                        >
                                            <img
                                                src={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${opt.opt}`}
                                                alt=""
                                            />
                                            <p>{opt.opt}</p>
                                        </span>
                                    ))}
                                </div>
                                <div className={styles.cta}>
                                    <Button variant="outline" onClick={prevQue}>
                                        Back
                                    </Button>
                                    <Button onClick={nextQue}>Next</Button>
                                </div>
                            </div>
                        </>
                    )
            }
        </>
    );
}

function LoginWithPassword({ setStep, nextStep, isPopup, user, setUser, onClose }) {

    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false)
    const router = useRouter();

    const pushBack = () => {
        if (router.query.previous) {
            router.push(router.query.previous)
        } else {
            router.push("/foryou")
        }
    }

    const { setUserData } = useContext(userContext)

    const handleNext = async () => {

        try {
            if (!password) {
                return toast.error("Please enter password")
            }
            console.log(user?._id)
            let response = await api('/user/signin-with-password', 'post', {
                userId: user?._id,
                password
            })
            setUser({
                ...user,
                ...response?.data
            })
            console.log({
                ...user,
                ...response?.data
            })





            if (response?.data?.user?.userDetail && Object.keys(response?.data?.user?.userDetail)?.length > 0) {
                setUserData(response?.data?.user)
                localStorage.setItem('accessToken', response?.data?.access_token)
                localStorage.setItem('refreshToken', response?.data?.refresh_token)
                pushBack()
                if (isPopup) onClose();
            } else {
                //   nextStep();
                return toast.error("Something went wrong!");
            }
            toast.success("Authenticated.");
        } catch (error) {
            console.log(error)
            setIsPasswordInvalid(true)
            toast.error("Error while verifying password!")
        }



    };

    useEffect(() => {
        if (password?.length == 4) {
            handleNext()
        }
    }, [password])

    return (
        <div className={styles.step}>
            <p>Enter Password</p>
            {/* <Input value={password} onChange={(event) => setPassword(event.target.value)} type="text" placeholder="password" size="lg" /> */}
            <HStack>
                <PinInput isInvalid={isPasswordInvalid} value={password} onComplete={(value) => { console.log(password, value); }} onChange={(value) => setPassword(value)} mask={!showPassword} size={'lg'}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                </PinInput>
                <Button onClick={() => { setShowPassword(!showPassword) }} variant={'ghost'} >
                    {showPassword ?
                        <AiFillEyeInvisible size={'1.5rem'} />
                        :
                        <AiFillEye size={'1.5rem'} />
                    }
                </Button>
            </HStack>
            <div className={styles.cta}>
                <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                </Button>
                <Button onClick={handleNext}>Submit</Button>
            </div>
        </div>
    );
}
