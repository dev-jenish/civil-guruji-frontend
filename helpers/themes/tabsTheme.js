import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

// define the base component styles
const buttonVariant = definePartsStyle({
  // define the part you're going to style
  root: {
    marginTop: 5,
    marginBottom: 4,
    padding: 0,
  },
  tab: {
    fontSize: "18px",
    borderRadius: 4,
    paddingInline: 2,
    paddingBlock: 1,
    // paddingBottom: 1,
    // borderBottom: "2px solid",
    // borderColor: "transparent",
    _selected: {
      backgroundColor: "#d6bcfa0f !important",
      color: "purple.300 !important",
      fontWeight: "500",
      // borderColor: "purple.300",
      color: "purple.200",
    },
    _hover: {
      color: "purple.200",
      backgroundColor: "#d6bcfa03",
    },

    _disabled: {
      pointerEvents: "none",
    },
  },
  tabpanel: {},
  tablist: {
    gap: 1,

    // gap: 6,
  },
});

const lineVariant = definePartsStyle({
  tabpanel: {
    padding: "0px !important",
    marginTop: 8,
  },
  tab: {
    _active: {
      backgroundColor: "initial",
    },
  },
  tablist: {
    gap: 6,
    borderColor: "#1a1a1a !important",
    borderBottom: "1px solid",
  },
});

const variants = {
  button: buttonVariant,
  line: lineVariant,
};

// export the component theme
export const tabsTheme = defineMultiStyleConfig({ variants });
