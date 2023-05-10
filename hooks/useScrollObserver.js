import { useEffect, useRef, useState } from "react";

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

export default function useScrollObserver() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    setVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const nav = ref.current;

    const observer = new IntersectionObserver(callbackFunction, options);
    if (nav) observer.observe(nav);

    return () => {
      if (nav) observer.unobserve(nav);
    };
  }, [ref]);

  return {
    visible,
    ref,
  };
}
