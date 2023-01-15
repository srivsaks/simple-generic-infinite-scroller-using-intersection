import { useCallback, useState } from "react";

export const useOnScreen = () => {
  //const[]=useState();
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [observer, setObserver] = useState();
  const lastEleRef = useCallback((node) => {
    if (node) {
      const observer = new IntersectionObserver((entries) => {
        setIsIntersecting(entries[0].isIntersecting);
      });
      observer.observe(node);
      setObserver(observer);
    }
  }, []);
  return { isIntersecting, lastEleRef, observer };
};
