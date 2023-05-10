import UserProvider from "@/context/userContext";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import theme from "@/helpers/themes/theme";

import "swiper/css";
import "../styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

function MyApp({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID} >
      <ChakraProvider theme={theme}>
        <UserProvider>
          <Component {...pageProps} />
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              style: {
                fontSize: 14,
              },
            }}
          />
        </UserProvider>
      </ChakraProvider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
