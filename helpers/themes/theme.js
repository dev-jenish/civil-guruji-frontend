// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "./buttonTheme";
import { inputTheme } from "./inputTheme";
import { tabsTheme } from "./tabsTheme";

// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  components: {
    Tabs: tabsTheme,
    Button: buttonTheme,
    Input: inputTheme,
    Select: inputTheme,
  },
});
export default theme;
