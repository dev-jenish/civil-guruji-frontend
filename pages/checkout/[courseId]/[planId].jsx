/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/reusable/Layout";
import { userContext } from "@/context/userContext";
import styles from "@/styles/Checkout.module.css";
import {
    Button,
    Checkbox,
    FormLabel,
    HStack,
    Image,
    Input,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { FaCircle, FaTag } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import { api } from "utils/urls";
import country_state from 'utils/country_state.json'
import Select from "react-select";
import { updateUserDetails } from "utils/user";
import moment from "moment";

export default function Checkout() {
    const [discount, setDiscount] = useState("Civil20");
    const [oneTImeActiveTab, setOneTimeActiveTab] = useState(false);
    const [emiActiveTab, setEmiActiveTab] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [planData, setPlanData] = useState({});
    const [countryOptions, setCountryOptions] = useState([])
    const [stateOptions, setStateOptions] = useState([])

    const [courseID, setCourseID] = useState('')
    const [planID, setPlanID] = useState('')

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userMobileNumber, setUserMobileNumber] = useState('')
    const [stateValue, setStateValue] = useState({})
    const [countryValue, setCountryValue] = useState({})
    const [purchasedData, setPurchasedData] = useState({})
    const [promocodeInput, setPromocodeInput] = useState('')
    const [promocodeData, setPromocodeData] = useState({})
    const [promocodeDiscountAmount, setPromocodeDiscountAmount] = useState(0)
    const [priceAfterPromocode, setPriceAfterPromocode] = useState(0)
    const [allPackagesData, setAllPackagesData] = useState([])
    const [planTypeTabIndex, setPlanTypeTabIndex] = useState(0)


    const { userData, setUserData } = useContext(userContext)


    const getAllPackagesData = async () => {
        try {
            let response = await api('/course/packages/all', 'get')

            if (response?.data?.length > 0) {
                setAllPackagesData(response?.data)
            }

        } catch (error) {
            console.log(error)
            toast.error("Recommended packages couldn't be loaded!")
        }
    }

    useEffect(() => {
        getAllPackagesData()
    }, [])


    useEffect(() => {

        if ((planData?.type == 'Emi subscription') && (planTypeTabIndex == 1)) {

            let amountAfterBaseAmount = planData?.discountedPrice - planData?.baseAmount

            let amountFromPercentage = ((amountAfterBaseAmount * promocodeData?.discountPercentage) / 100).toFixed(2)

            if (amountFromPercentage < promocodeData?.maxDiscountAmount) {
                setPromocodeDiscountAmount((amountFromPercentage / 3).toFixed(2))
                setPriceAfterPromocode(((amountAfterBaseAmount - amountFromPercentage) / 3).toFixed(2))
            } else {
                setPromocodeDiscountAmount(promocodeData?.maxDiscountAmount / 3)
                setPriceAfterPromocode(((amountAfterBaseAmount - promocodeData?.maxDiscountAmount) / 3).toFixed(2))
            }

        } else {
            let amountFromPercentage = ((planData?.discountedPrice * promocodeData?.discountPercentage) / 100).toFixed(2)

            if (amountFromPercentage < promocodeData?.maxDiscountAmount) {
                setPromocodeDiscountAmount(amountFromPercentage)
                setPriceAfterPromocode((planData?.discountedPrice - amountFromPercentage).toFixed(2))
            } else {
                setPromocodeDiscountAmount(promocodeData?.maxDiscountAmount)
                setPriceAfterPromocode((planData?.discountedPrice - promocodeData?.maxDiscountAmount).toFixed(2))
            }
        }


    }, [promocodeData, planTypeTabIndex])

    useEffect(() => {
        if (!userData?._id && courseID && planID) {
            router.push(`/login?previous=/checkout/${courseID}/${planID}`)
        } else {
            setUserName(userData?.userDetail?.name)
            setUserEmail(userData?.userDetail?.email)
            setUserMobileNumber(userData?.phoneNumber)
            if (userData?.purchases && userData?.purchases?.length > 0) {
                let purchasedPlan = userData.purchases.find((purchase) => {
                    return purchase?.planDetail?._id == planID
                })
                if (purchasedPlan) {
                    setPurchasedData(purchasedPlan)
                }
            }

        }
    }, [userData, courseID, planID])

    const [loading, setLoading] = useState(true)


    const handleApplyPromocode = async () => {
        try {
            if (!promocodeInput) { return toast.error('Please enter valid promocode!') }

            let promocodeData = await api(`/promocodes/${promocodeInput}`, 'get')

            if (!moment().isAfter(moment(promocodeData?.data?.startDate))) {
                toast.error(`Offer is not started yet!`)
                return false
            }

            if (!moment().isBefore(moment(promocodeData?.data?.endDate))) {
                toast.error(`Offer has been expired!`)
                return false
            }

            if (promocodeData?.data?.minimumCartValue > planData?.discountedPrice) {
                toast.error(`Minimum cart value should be ${promocodeData?.data?.minimumCartValue}`)
                return false
            }

            if (promocodeData?.data?.coursesType == 'selected') {
                if (promocodeData?.data?.courses && promocodeData?.data?.courses?.length > 0 && !promocodeData?.data?.courses?.includes(courseID)) {
                    toast.error(`Promocode not valid for this course!`)
                    return false
                }
            }

            if (promocodeData?.data?.usersType == 'selected') {
                if (promocodeData?.data?.users && promocodeData?.data?.users?.length > 0 && !promocodeData?.data?.users?.includes(userData?._id)) {
                    toast.error(`Promocode not valid for you!`)
                    return false
                }
            }

            setPromocodeData(promocodeData?.data)

            return true

        } catch (error) {
            console.log(error)
            toast.error('Invalid promocode!')
            return false
        }
    }

    const handleDiscountClick = async (fieldName, value) => {
        if (fieldName === "oneTimeActiveTab") {
            if (value === "apply") {
                let result = await handleApplyPromocode()
                if (result) {
                    setOneTimeActiveTab(true);
                } else {

                }

            } else if (value === "remove") {
                setOneTimeActiveTab(false);
            }
        } else if (fieldName === "emiActiveTab") {
            if (value === "apply") {
                let result = await handleApplyPromocode()
                if (result) {
                    // setOneTimeActiveTab(true);
                    setEmiActiveTab(true);
                } else {

                }
            } else if (value === "remove") {
                setEmiActiveTab(false);
            }
        }
    };

    const router = useRouter()

    const getPlanDetails = async (courseId, planId) => {
        try {
            let response = await api('/course/checkout-details', 'post', {
                courseId,
                planId
            })
            setPlanData(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error('Error while fetching prices')
        }
    }

    useEffect(() => {
        if (country_state?.countries && country_state?.countries?.length > 0) {
            setCountryOptions(
                country_state?.countries.map((country) => {
                    return {
                        label: country?.country,
                        value: country?.states
                    }
                })
            )
        }
    }, [country_state])

    useEffect(() => {
        const { courseId, planId } = router?.query
        if (courseId && planId) {

            if (courseId && planId) {

                setCourseID(courseId)
                setPlanID(planId)

                getPlanDetails(courseId, planId)

            } else {
                toast.error('Something went wrong!')
                router.back()
            }

        }
    }, [router?.query])

    function InlineWrapperWithMargin({ children }) {
        return <span style={{ marginRight: '0.5rem' }}>{children}</span>
    }

    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: '250px', // Modify the width value as per your requirements
            backgroundColor: 'inherit',
            color: 'white'
        }),
        input: (provided, state) => ({
            ...provided,
            color: 'white', // Change the color to your desired color
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#131313' : 'inherit', // Change the background color to your desired color
            color: state.isFocused ? 'white' : 'white', // Change the text color to your desired color
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'white', // Change the color to your desired color
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#36383f', // Change the background color to your desired color
        }),
    };

    const handleFreePayment = async () => {
        try {
            let data = await api('/course/savePurchase', 'post', {
                courseId: courseID,
                paymentData: {},
                planId: planID,
                userId: userData?._id,
                mode: 'Free'
            })
            toast.success('Payment successful!')
            await updateUserDetails(userData, setUserData)
            router.push('/foryou')
        } catch (error) {
            console.log(error)
        }
    }

    const handlePayEmi = async () => {
        // try{
        //     let response = await api()
        // }catch(error){
        //     console.log(error)
        //     toast.error('Emi payment failed!')
        // }
    }


    const handlePayment = async (type) => {
        try {

            if (!userName) { return toast.error('Enter valid user name!') }
            if (!userEmail) { return toast.error('Enter valid email address!') }
            if (!userMobileNumber) { return toast.error('Enter valid mobile number!') }
            if (!countryValue?.value) { return toast.error('Please select country & state!') }
            if (!stateValue?.value) { return toast.error('Please select state!') }
            if (!isTermsAccepted) { return toast.error('Please accept terms of service!') }

            setLoading(true)

            let isFree = await api('/course/free-plan', 'post', {
                planId: planID
            })
            isFree = isFree?.data

            if (isFree) {
                return await handleFreePayment()
            }


            console.log('Payment intialized')
            await makePayment(type)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const makePayment = async (type) => {
        const res = await initializeRazorpay();

        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }

        // Make API call to the serverless API
        let data = await api('/payment/razorpay', 'post', {
            courseId: courseID,
            planId: planID,
            type,
            promocode: promocodeData?._id
        })
        data = data?.data

        var options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
            name: "Civil Guruji Pvt Ltd",
            currency: data.currency,
            amount: data.amount.toString(),
            order_id: data.id,
            description: "Best of luck from Civil Guruji team",
            image: "https://dz8fbjd9gwp2s.cloudfront.net/logos/5f5239190cf2fce0627c8cdd.png?v=3",
            handler: async function (response) {
                // Validate payment at server - using webhooks is a better idea.

                // payment completed save the payment data
                try {
                    let data = await api('/course/savePurchase', 'post', {
                        courseId: courseID,
                        paymentData: response,
                        planId: planID,
                        userId: userData?._id,
                        mode: 'Razorpay',
                        type: type,
                        purchaseId: purchasedData?._id,
                        promocodeId: promocodeData?._id
                    })
                    toast.success('Payment successful!')


                    await updateUserDetails(userData, setUserData)


                    router.push(`/course/learning/${courseID}`)

                } catch (error) {
                    console.log(error)
                    toast.error('Payment faild!')
                }

            },
            prefill: {
                name: userName,
                email: userEmail,
                contact: userMobileNumber,
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };

    useEffect(() => {
        if (purchasedData?.appliedPromocode) {
            setPromocodeData(purchasedData?.appliedPromocode)
            if (purchasedData?.emisPaid >= 0) {
                setEmiActiveTab(true);
            } else {
                setOneTimeActiveTab(true);
            }
        }
    }, [purchasedData, planTypeTabIndex])

    useEffect(() => {
        planData?.type == 'Emi subscription' ? setPlanTypeTabIndex(1) : setPlanTypeTabIndex(0)
    }, [planData])


    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.content}>
                        <Text fontSize="3xl" fontWeight="500">
                            Checkout
                        </Text>
                        <div className={styles.billingParts}>
                            <Text fontSize="xl" marginBottom="16px">
                                {
                                    loading ? <Skeleton baseColor="#5a5b5d" highlightColor="#787878" /> :
                                        'Billing Address'
                                }
                            </Text>
                            {
                                loading ? <Skeleton baseColor="#5a5b5d" highlightColor="#787878" count={5} /> :
                                    <>
                                        <div className={styles.inputGroup} style={{ paddingBottom: '1rem' }} >
                                            <VStack alignItems="flex-start" >
                                                <Text paddingLeft="5px" color="gray.400">
                                                    Name
                                                </Text>
                                                <Input type="text" value={userName} onChange={(event) => setUserName(event?.target?.value)} ></Input>
                                            </VStack>
                                            <VStack alignItems="flex-start">
                                                <Text paddingLeft="5px" color="gray.400">E-mail ID*</Text>
                                                <Input type="email" value={userEmail} onChange={(event) => setUserEmail(event?.target?.value)} ></Input>
                                            </VStack>
                                            <VStack alignItems="flex-start">
                                                <Text paddingLeft="5px" color="gray.400">Mobile No.*</Text>
                                                <Input type="tel" value={userMobileNumber} onChange={(event) => { setUserMobileNumber(event?.target?.value) }} ></Input>
                                            </VStack>
                                        </div>
                                        <VStack>
                                            <HStack width="full">
                                                <VStack alignItems="flex-start" flex={1}>
                                                    <Text color="gray.400">Country</Text>
                                                    <Select
                                                        options={countryOptions}
                                                        value={countryValue}
                                                        onChange={(data) => {
                                                            setStateOptions(data?.value.map((state) => {
                                                                return {
                                                                    label: state,
                                                                    value: state
                                                                }
                                                            }));
                                                            setCountryValue(data)
                                                            setStateValue({})
                                                        }}
                                                        styles={customStyles}
                                                    />
                                                    {/* <SelectChakra placeholder="Select Country">
                                                        {
                                                            countryOptions?.length > 0 && countryOptions.map((country) => {
                                                                return <option value={country?.value}>
                                                                    {country?.label}
                                                                </option>
                                                            })
                                                        }

                                                    </SelectChakra> */}
                                                </VStack>
                                                <VStack alignItems="flex-start" flex={1}>
                                                    <Text color="gray.400">State / Union Territory</Text>
                                                    <Select
                                                        options={stateOptions}
                                                        value={stateValue}
                                                        onChange={(data) => setStateValue(data)}
                                                        styles={customStyles}
                                                    />
                                                    {/* <SelectChakra placeholder="Select State">
                                                        <option value="maharashtra">Maharashtra</option>
                                                        <option value="karnataka">Karnataka</option>
                                                        <option value="west bengal">West Bengal</option>
                                                    </SelectChakra> */}
                                                </VStack>
                                            </HStack>
                                            <Text fontSize="xs" color="gray.500">
                                                Civil Guruji is required by law to collect applicable
                                                transaction taxes for purchases made in certain tax
                                                jurisdictions.
                                            </Text>
                                        </VStack>
                                    </>
                            }
                        </div>
                        <div className={styles.section}>
                            <Text fontSize="xl" marginBottom="16px">
                                We Recommend
                            </Text>
                            {
                                loading ? <>
                                    <Skeleton baseColor="#5a5b5d" highlightColor="#787878" style={{ height: '2rem', marginBottom: '1rem' }} />
                                    <Skeleton baseColor="#5a5b5d" highlightColor="#787878" count={3} />
                                </>
                                    :
                                    <>
                                        {
                                            allPackagesData?.length > 0 &&
                                            allPackagesData.map((packageData, index) => {
                                                return <PackageDetail key={index} packageData={packageData} />
                                            })
                                        }
                                        {/* <PackageDetail  /> */}
                                    </>
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    {
                        loading ?
                            <>
                                <Skeleton baseColor="#5a5b5d" highlightColor="#787878" />
                                {/* <div style={{ display: 'grid', columnCount: 2 }} > */}
                                <Skeleton baseColor="#5a5b5d" style={{ marginTop: '2rem', height: '1.5rem', marginBottom: '0.5rem' }} highlightColor="#787878" count={2} inline width={'48%'} wrapper={InlineWrapperWithMargin} />
                                <Skeleton baseColor="#5a5b5d" style={{ marginTop: '1rem' }} highlightColor="#787878" count={3} />
                                <Skeleton baseColor="#5a5b5d" style={{ marginTop: '2rem', height: '2.5rem' }} highlightColor="#787878" />
                                {/* </div> */}
                            </>
                            :
                            <div className={styles.content}>
                                <Tabs size="sm" index={planTypeTabIndex} onChange={setPlanTypeTabIndex} variant="button" >
                                    <div className={styles.section}>
                                        <p className={styles.headText}>Order details</p>
                                        <TabList>
                                            <Tab
                                                isDisabled={purchasedData?.emisPaid >= 0}
                                                style={{ fontSize: "14px" }}
                                            >
                                                One Time Payment
                                            </Tab>
                                            {
                                                planData?.type == 'Emi subscription' &&
                                                <Tab style={{ fontSize: "14px" }}>EMI Options</Tab>
                                            }
                                        </TabList>
                                    </div>
                                    <TabPanels>
                                        <TabPanel>
                                            {!oneTImeActiveTab ? (
                                                <div className={styles.tabInnerContent}>
                                                    <CourseDetail price={"₹499"} planData={planData} />
                                                    <span className={styles.liner}></span>
                                                    <h6 className={styles.summary}>Summary</h6>
                                                    <VStack alignItems="flex-start">
                                                        <HStack
                                                            width="full"
                                                            justifyContent="space-between"
                                                            alignItems="flex-start"
                                                            marginBottom="20px"
                                                        >
                                                            <Text>Discounted Price:</Text>
                                                            <Text>₹{planData?.discountedPrice || 'Free'}</Text>
                                                        </HStack>
                                                        <HStack
                                                            width="full"
                                                            justifyContent="space-between"
                                                            marginTop="0 !important"
                                                            borderTop="1px solid"
                                                            borderColor="gray.700"
                                                            paddingTop={4}
                                                            marginBottom="24px !important"
                                                        >
                                                            <Text as="b">Total:</Text>
                                                            <Text as="b">₹{planData?.discountedPrice || 'Free'}</Text>
                                                        </HStack>
                                                        {
                                                            planData?.discountedPrice ?
                                                                <HStack
                                                                    width="full"
                                                                    justifyContent="space-between"
                                                                    marginTop="0 !important"
                                                                    marginBottom="24px !important"
                                                                >
                                                                    <Input placeholder="Promo Code" value={promocodeInput} onChange={(event) => setPromocodeInput(event?.target?.value)} _placeholder={discount} />
                                                                    <Button
                                                                        variant="outline"
                                                                        onClick={() =>
                                                                            handleDiscountClick("oneTimeActiveTab", "apply")
                                                                        }
                                                                    >
                                                                        Apply
                                                                    </Button>
                                                                </HStack>
                                                                :
                                                                null
                                                        }
                                                        <HStack width="full" marginTop="0 !important">
                                                            <Checkbox
                                                                size="sm"
                                                                colorScheme="gray"
                                                                id="purchase-terms"
                                                                isChecked={isTermsAccepted}
                                                                onChange={(event) => { setIsTermsAccepted(event?.target?.checked) }}
                                                            />
                                                            <FormLabel
                                                                htmlFor="purchase-terms"
                                                                fontSize="xs"
                                                                color="gray.500"
                                                                cursor="pointer"
                                                            >
                                                                <Text as="span" marginLeft={1}>
                                                                    By completing your purchase you agree to these
                                                                    Terms of Service.
                                                                </Text>
                                                            </FormLabel>
                                                        </HStack>
                                                        <Button onClick={() => handlePayment('pay_all')} borderRadius={4} height={12} width="full">
                                                            Checkout
                                                        </Button>
                                                    </VStack>
                                                </div>
                                            ) : (
                                                <div className={styles.tabInnerContent}>
                                                    <CourseDetail price={"₹499"} planData={planData} />
                                                    <span className={styles.liner}></span>
                                                    <h6 className={styles.summary}>Summary</h6>
                                                    <VStack alignItems="flex-start">
                                                        <HStack
                                                            width="full"
                                                            justifyContent="space-between"
                                                            alignItems="flex-start"
                                                        >
                                                            <Text>Original Price:</Text>
                                                            <Text>₹{planData?.discountedPrice || 'Free'}</Text>
                                                        </HStack>
                                                        <HStack
                                                            width="full"
                                                            justifyContent="space-between"
                                                            paddingBottom={4}
                                                        >
                                                            <HStack gap="5px">
                                                                <FaTag size={12} color="#2BB970" />
                                                                <Text>{promocodeData?.name}</Text>
                                                            </HStack>
                                                            <Text color="#2BB970">-₹{promocodeDiscountAmount}</Text>
                                                        </HStack>
                                                        <HStack
                                                            width="full"
                                                            justifyContent="space-between"
                                                            marginTop="0 !important"
                                                            borderTop="1px solid"
                                                            borderColor="gray.700"
                                                            paddingTop={4}
                                                            marginBottom="24px !important"
                                                        >
                                                            <Text as="b">Total:</Text>
                                                            <Text as="b" color="#2BB970">
                                                                ₹{priceAfterPromocode}
                                                            </Text>
                                                        </HStack>
                                                        <HStack
                                                            width="full"
                                                            justifyContent="space-between"
                                                            marginTop="0 !important"
                                                            marginBottom="24px !important"
                                                        >
                                                            <HStack>
                                                                <IoIosCheckmarkCircleOutline
                                                                    size={18}
                                                                    color="#2BB970"
                                                                />
                                                                <Text fontSize={14} color="#2BB970">
                                                                    {promocodeData?.name} Code Applied Successfully
                                                                </Text>
                                                            </HStack>
                                                            <button
                                                                className={styles.redText}
                                                                onClick={() =>
                                                                    handleDiscountClick("oneTimeActiveTab", "remove")
                                                                }
                                                            >
                                                                remove
                                                            </button>
                                                        </HStack>
                                                        <HStack width="full" marginTop="0 !important">
                                                            <Checkbox
                                                                size="sm"
                                                                colorScheme="gray"
                                                                id="purchase-terms"
                                                                isChecked={isTermsAccepted}
                                                                onChange={(event) => { setIsTermsAccepted(event?.target?.checked) }}
                                                            />
                                                            <FormLabel
                                                                htmlFor="purchase-terms"
                                                                fontSize="xs"
                                                                color="gray.500"
                                                                cursor="pointer"
                                                            >
                                                                <Text as="span" marginLeft={1}>
                                                                    By completing your purchase you agree to these
                                                                    Terms of Service.
                                                                </Text>
                                                            </FormLabel>
                                                        </HStack>
                                                        <Button onClick={() => handlePayment('pay_all')} borderRadius={4} height={12} width="full">
                                                            Checkout
                                                        </Button>
                                                    </VStack>
                                                </div>
                                            )}
                                        </TabPanel>
                                        <TabPanel>
                                            {!emiActiveTab ? (
                                                <div className={styles.tabInnerContent}>
                                                    <CourseDetail price={"₹699"} planData={planData} />
                                                    <span className={styles.liner}></span>
                                                    <h6 className={styles.summary}>Summary</h6>
                                                    <VStack alignItems="flex-start">
                                                        <HStack
                                                            width="full"
                                                            justifyContent="space-between"
                                                            alignItems="flex-start"
                                                            backgroundColor={(purchasedData?.expiresOn && (purchasedData?.emisPaid >= 0)) ? "inherit" : "#454546"}
                                                            padding="5px 10px"
                                                        >
                                                            <Text fontSize={14}>Base Amount</Text>
                                                            <Text fontSize={14}>₹{planData?.baseAmount}</Text>
                                                        </HStack>
                                                        <HStack
                                                            width="full"
                                                            justifyContent="space-between"
                                                            alignItems="flex-start"
                                                            padding="5px 10px"
                                                            backgroundColor={(purchasedData?.expiresOn && (purchasedData?.emisPaid == 0)) ? "#454546" : "inherit"}
                                                        >
                                                            <Text fontSize={14}>1st EMI</Text>
                                                            <Text fontSize={14}>₹{planData?.emiAmount}</Text>
                                                        </HStack>
                                                        <HStack
                                                            width="full"
                                                            justifyContent="space-between"
                                                            alignItems="flex-start"
                                                            padding="5px 10px"
                                                            backgroundColor={(purchasedData?.expiresOn && (purchasedData?.emisPaid == 1)) ? "#454546" : "inherit"}
                                                        >
                                                            <Text fontSize={14}>2nd EMI</Text>
                                                            <Text fontSize={14}>₹{planData?.emiAmount}</Text>
                                                        </HStack>
                                                        <HStack
                                                            width="full"
                                                            justifyContent="space-between"
                                                            alignItems="flex-start"
                                                            padding="5px 10px"
                                                            backgroundColor={(purchasedData?.expiresOn && (purchasedData?.emisPaid == 2)) ? "#454546" : "inherit"}
                                                        >
                                                            <Text fontSize={14}>3rd EMI</Text>
                                                            <Text fontSize={14}>₹{planData?.emiAmount}</Text>
                                                        </HStack>
                                                        <HStack
                                                            width="full"
                                                            justifyContent="space-between"
                                                            marginTop="0 !important"
                                                            borderTop="1px solid"
                                                            borderColor="gray.700"
                                                            padding="5px 10px"
                                                            marginBottom="24px !important"
                                                        >
                                                            <Text fontWeight="700" fontSize="16px">
                                                                Total:
                                                            </Text>
                                                            <Text fontWeight="700" fontSize="16px">
                                                                ₹{planData?.discountedPrice}
                                                            </Text>
                                                        </HStack>
                                                        <HStack
                                                            width="full"
                                                            justifyContent="space-between"
                                                            marginTop="0 !important"
                                                            marginBottom="24px !important"
                                                        >
                                                            <Input placeholder="Promo Code" value={promocodeInput} onChange={(event) => setPromocodeInput(event?.target?.value)} _placeholder={discount} />
                                                            <Button
                                                                variant="outline"
                                                                onClick={() =>
                                                                    handleDiscountClick("emiActiveTab", "apply")
                                                                }
                                                            >
                                                                Apply
                                                            </Button>
                                                        </HStack>
                                                        <HStack width="full" marginTop="0 !important">
                                                            <Checkbox
                                                                size="sm"
                                                                colorScheme="gray"
                                                                id="purchase-termsEMI"
                                                                isChecked={isTermsAccepted}
                                                                onChange={(event) => { setIsTermsAccepted(event?.target?.checked) }}
                                                            />
                                                            <FormLabel
                                                                htmlFor="purchase-termsEMI"
                                                                fontSize="xs"
                                                                color="gray.500"
                                                                cursor="pointer"
                                                            >
                                                                <Text as="span" marginLeft={1}>
                                                                    By completing your purchase you agree to these
                                                                    Terms of Service.
                                                                </Text>
                                                            </FormLabel>
                                                        </HStack>
                                                        <Button onClick={() => { (purchasedData?.expiresOn && (purchasedData?.emisPaid >= 0 && purchasedData?.emisPaid < 3)) ? handlePayment('emi') : handlePayment('base_amount') }} borderRadius={4} height={12} width="full">
                                                            {
                                                                (purchasedData?.expiresOn && (purchasedData?.emisPaid >= 0))
                                                                    ?
                                                                    (purchasedData?.expiresOn && (purchasedData?.emisPaid == 3))
                                                                        ?
                                                                        `Paid`
                                                                        :
                                                                        `Pay EMI @ ${planData?.emiAmount}`
                                                                    :
                                                                    `Enroll @ ${planData?.baseAmount}`
                                                            }

                                                        </Button>
                                                    </VStack>
                                                </div>
                                            ) : (
                                                <div className={styles.tabInnerContent}>
                                                    <CourseDetail price={"₹699"} planData={planData} />
                                                    <span className={styles.liner}></span>
                                                    <h6 className={styles.summary}>Summary</h6>
                                                    <VStack alignItems="flex-start">
                                                        <HStack
                                                            width="full"
                                                            justifyContent="space-between"
                                                            alignItems="flex-start"
                                                            backgroundColor={(purchasedData?.expiresOn && (purchasedData?.emisPaid >= 0)) ? "inherit" : "#454546"}
                                                            padding="5px 10px"
                                                        >
                                                            <Text fontSize={14}>Base Amount</Text>
                                                            <HStack justifyContent="space-between" width="">
                                                                <Text fontSize={14} >
                                                                    ₹{planData?.baseAmount}
                                                                </Text>
                                                            </HStack>
                                                        </HStack>
                                                        <HStack
                                                            width="full"
                                                            justifyContent="space-between"
                                                            alignItems="flex-start"
                                                            padding="5px 10px"
                                                            backgroundColor={(purchasedData?.expiresOn && (purchasedData?.emisPaid == 0)) ? "#454546" : "inherit"}
                                                        >
                                                            <Text fontSize={14}>1st EMI</Text>
                                                            <HStack justifyContent="space-between" width="">
                                                                <Text fontSize={14} textDecoration="line-through">
                                                                    ₹{planData?.emiAmount}
                                                                </Text>
                                                                <Text fontSize={14} color="#2BB970">
                                                                    ₹{priceAfterPromocode}
                                                                </Text>
                                                            </HStack>
                                                        </HStack>
                                                        <HStack
                                                            width="full"
                                                            justifyContent="space-between"
                                                            alignItems="flex-start"
                                                            padding="5px 10px"
                                                            backgroundColor={(purchasedData?.expiresOn && (purchasedData?.emisPaid == 1)) ? "#454546" : "inherit"}
                                                        >
                                                            <Text fontSize={14}>2nd EMI</Text>
                                                            <HStack justifyContent="space-between" width="">
                                                                <Text fontSize={14} textDecoration="line-through">
                                                                    ₹{planData?.emiAmount}
                                                                </Text>
                                                                <Text fontSize={14} color="#2BB970">
                                                                    ₹{priceAfterPromocode}
                                                                </Text>
                                                            </HStack>
                                                        </HStack>
                                                        <HStack
                                                            width="full"
                                                            justifyContent="space-between"
                                                            alignItems="flex-start"
                                                            padding="5px 10px"
                                                            backgroundColor={(purchasedData?.expiresOn && (purchasedData?.emisPaid == 2)) ? "#454546" : "inherit"}
                                                        >
                                                            <Text fontSize={14}>3rd EMI</Text>
                                                            <HStack justifyContent="space-between" width="">
                                                                <Text fontSize={14} textDecoration="line-through">
                                                                    ₹{planData?.emiAmount}
                                                                </Text>
                                                                <Text fontSize={14} color="#2BB970">
                                                                    ₹{priceAfterPromocode}
                                                                </Text>
                                                            </HStack>
                                                        </HStack>
                                                        <HStack
                                                            width="full"
                                                            justifyContent="space-between"
                                                            marginTop="0 !important"
                                                            borderTop="1px solid"
                                                            borderColor="gray.700"
                                                            padding="5px 10px"
                                                            marginBottom="24px !important"
                                                        >
                                                            <Text fontWeight="700" fontSize="16px">
                                                                Total:
                                                            </Text>
                                                            <HStack justifyContent="space-between" width="">
                                                                <Text
                                                                    fontWeight="700"
                                                                    fontSize="16px"
                                                                    textDecoration="line-through"
                                                                >
                                                                    ₹{(planData?.discountedPrice).toFixed(2)}
                                                                </Text>
                                                                <Text
                                                                    fontWeight="700"
                                                                    fontSize="16px"
                                                                    color="#2BB970"
                                                                >
                                                                    ₹{((priceAfterPromocode * 3) + planData?.baseAmount).toFixed(2)}
                                                                </Text>
                                                            </HStack>
                                                        </HStack>
                                                        <HStack
                                                            width="full"
                                                            justifyContent="space-between"
                                                            marginTop="0 !important"
                                                            marginBottom="24px !important"
                                                        >
                                                            <HStack>
                                                                <IoIosCheckmarkCircleOutline
                                                                    size={18}
                                                                    color="#2BB970"
                                                                />
                                                                <Text fontSize={14} color="#2BB970">
                                                                    {promocodeData?.name} Code Applied Successfully
                                                                </Text>
                                                            </HStack>
                                                            {
                                                                !(purchasedData?.emisPaid >= 0 && promocodeData?._id) &&
                                                                <button
                                                                    className={styles.redText}
                                                                    onClick={() =>
                                                                        handleDiscountClick("emiActiveTab", "remove")
                                                                    }

                                                                >
                                                                    remove
                                                                </button>
                                                            }
                                                        </HStack>
                                                        <HStack width="full" marginTop="10px !important">
                                                            <Checkbox
                                                                size="sm"
                                                                colorScheme="gray"
                                                                id="purchase-termsEMI"
                                                                isChecked={isTermsAccepted}
                                                                onChange={(event) => { setIsTermsAccepted(event?.target?.checked) }}
                                                            />
                                                            <FormLabel
                                                                htmlFor="purchase-termsEMI"
                                                                fontSize="xs"
                                                                color="gray.500"
                                                                cursor="pointer"
                                                            >
                                                                <Text as="span" marginLeft={1}>
                                                                    By completing your purchase you agree to these
                                                                    Terms of Service.
                                                                </Text>
                                                            </FormLabel>
                                                        </HStack>
                                                        <Button onClick={() => { (purchasedData?.expiresOn && (purchasedData?.emisPaid >= 0 && purchasedData?.emisPaid < 3)) ? handlePayment('emi') : handlePayment('base_amount') }} borderRadius={4} height={12} width="full">
                                                            {/* Enroll @ {planData?.baseAmount} */}

                                                            {
                                                                (purchasedData?.expiresOn && (purchasedData?.emisPaid >= 0))
                                                                    ?
                                                                    (purchasedData?.expiresOn && (purchasedData?.emisPaid == 3))
                                                                        ?
                                                                        `Paid`
                                                                        :
                                                                        `Pay EMI @ ${priceAfterPromocode}`
                                                                    :
                                                                    `Enroll @ ${planData?.baseAmount}`
                                                            }

                                                        </Button>
                                                    </VStack>
                                                </div>
                                            )}
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </div>
                    }
                </div>
            </div>
        </Layout>
    );
}

function CourseDetail({ highlight, price, planData }) {
    return (
        <div
            className={`${styles.courseDetail} ${highlight ? styles.highlight : ""} `}
        >
            <Image
                borderRadius={3}
                src={planData?.courseThumbnail || ''}
                alt="Blockchain"
            />
            <VStack alignItems="flex-start">
                <Text>{planData?.courseName}</Text>
            </VStack>
            <VStack marginLeft="auto" alignItems="flex-start">
                <Text>{`₹${planData?.listPrice || 'Free'}`}</Text>
            </VStack>
        </div>
    );
}

function CourseOfPackage({ courseData, highlight }) {
    return (
        <div
            className={`${styles.courseDetail} ${highlight ? styles.highlight : ""} `}
        >
            <Image
                borderRadius={3}
                src={courseData?.thumbnail || ''}
                alt="thumbnail"
            />
            <VStack alignItems="flex-start">
                <Text>{courseData?.name}</Text>
            </VStack>
            <VStack marginLeft="auto" alignItems="flex-start">
                <HStack>
                    <Text>₹{courseData?.prices?.find((plan) => {
                        return plan?.isDisplay == true
                    })?.discountedPrice || 'Free'}</Text>
                    <Text marginTop="0 !important" color="gray.500" as="s">
                        ₹{courseData?.prices?.find((plan) => {
                            return plan?.isDisplay == true
                        })?.listPrice || 'Free'}
                    </Text>
                </HStack>
            </VStack>
        </div>
    );
}

function PackageDetail({ packageData }) {
    const [showCourses, setShowCourses] = useState(true);
    const router = useRouter()

    const toggleCourses = () => {
        setShowCourses((prev) => !prev);
    };

    return (
        <>
            <div className={styles.courseDetail}>
                <Image
                    borderRadius={3}
                    src={packageData?.thumbnail || ""}
                    alt="Blockchain"
                />
                <VStack alignItems="flex-start">
                    <Text>{packageData?.name}</Text>
                    <HStack
                        cursor="pointer"
                        color="gray.500"
                        marginTop="0 !important"
                        _hover={{ color: "gray.400" }}
                        onClick={toggleCourses}
                    >
                        <Text>Includes {packageData?.courses?.length} Courses</Text>
                        {showCourses ? <AiOutlineUp /> : <AiOutlineDown />}
                    </HStack>
                </VStack>
                <VStack alignItems="flex-end" marginLeft="auto">
                    <HStack>
                        <Text>₹{packageData?.prices?.find((plan) => {
                            return plan?.isDisplay == true
                        })?.discountedPrice || 'Free'}</Text>
                        <Text marginTop="0 !important" color="gray.500" as="s">
                            ₹{packageData?.prices?.find((plan) => {
                                return plan?.isDisplay == true
                            })?.listPrice || 'Free'}
                        </Text>
                    </HStack>
                    <Button
                        px={3}
                        py={2}
                        borderRadius={4}
                        height="max-content"
                        fontSize="12px"
                        marginTop="0 !important"
                        onClick={() => {
                            router.push(`/package/${packageData?._id}`)
                        }}
                    >
                        Purchase
                    </Button>
                </VStack>
            </div>
            {showCourses ? (
                <VStack marginTop={4} gap={2} px={4}>
                    {
                        packageData?.courses?.length > 0 && packageData?.courses?.map((courseData, index) => {
                            return <CourseOfPackage key={index} courseData={courseData?.course} />
                        })
                    }
                </VStack>
            ) : null}
        </>
    );
}
