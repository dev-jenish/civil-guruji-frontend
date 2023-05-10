import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Auth from "../reusable/Auth";

export default function AuthModal({ show, onClose }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <>
      <div className="overlay" />
      <Auth isPopup onClose={onClose} />
    </>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}
