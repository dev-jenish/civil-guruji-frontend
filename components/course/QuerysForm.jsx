import { modules } from "@/helpers/constants";
import styles from "@/styles/Query.module.css";
import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  Text,
  VStack,
  color,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { IoMdRadioButtonOff } from "react-icons/io";
import { BiPhoneCall } from "react-icons/bi";

export default function QuerysForm({}) {

  const activeTabColor = useColorModeValue("#DE076E", "#DE076E");

  const [tabIndex, setTabIndex] = useState(0);
  return (
    <div>
      <Tabs size="xl" index={tabIndex}>
        <TabList
          className={styles.contentWrapper}
          style={{ marginTop: "20px" }}
        >
          <Tab _selected={{ color: activeTabColor, borderBottom: `2px solid ${activeTabColor}` }}>Still unsure about the course</Tab>
        </TabList>
      </Tabs>
      <div className={styles.get} >
        <div style={{flex: "9 0"}}>
          <h1 style={{fontSize:"16px"}}>Get the free counseling session with the expert</h1>
          <div className={styles.phoneBlock}>
            <div className={styles.phoneIcon}>
              <BiPhoneCall />
            </div>
            <div>
              <p className={styles.phoneContent}>Call us on our toll free number</p>
              <h3>9111-00-1234</h3>
            </div>
          </div>
        </div>
        <div className={styles.form}>
          <form>
            <input
            style={{width:"48%"}}
              type="text"
              id="fname"
              name="fname"
              placeholder="Full Name*"
              className={styles.inputType}
            />
            <input
            style={{width:"48%", margin:"0 0 10px 4%"}}
              type="text"
              id="email"
              name="email"
              placeholder="E-Mail ID*"
              className={styles.inputType}

            />
            <br></br>
            <input
            style={{width:"48%"}}
              type="text"
              id="mno"
              name="mno"
              placeholder="Mobile Number*"
              className={styles.inputType}

            />
            <input
              style={{width:"48%", margin:"0 0 10px 4%"}}
              type="text"
              id="qualification"
              name="qualification"
              placeholder="Current Qualification*"
              className={styles.inputType}
            />
            <input
              style={{width:"100%"}}
              type="text"
              id="problem"
              name="problem"
              placeholder="Describe your problem"
              className={styles.inputType}
            />
            <br></br>
            <div style={{textAlign:"center", marginTop:"12px"}}>
            <input className={styles.submitBtn} type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
