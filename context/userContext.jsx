/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";

export const userContext = createContext({});

export const useUserContext = () => useContext(userContext);

function UserProvider({ children }) {
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    handleAuth();
  }, []);

  const handleAuth = async () => {
    if (localStorage.getItem("auth-modal")) {
      return;
    }

    await new Promise((res) => {
      setTimeout(() => {
        res();
      }, [3000]);
    });
    setShowAuthModal(true);
    localStorage.setItem("auth-modal", true);
  };

  const closeModal = () => {
    setShowAuthModal(false);
  };

  const contextValue = {
    showAuthModal,
    setShowAuthModal,
    closeModal,
  };

  return (
    <userContext.Provider value={contextValue}>{children}</userContext.Provider>
  );
}

export default UserProvider;
