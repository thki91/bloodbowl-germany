import { useEffect, useRef, useState } from "react";

const THRESHOLD = 0;

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [scrollPosition, setScrollPosition] = useState(0);

  const blocking = useRef(false);
  const prevScrollY = useRef(0);

  useEffect(() => {
    prevScrollY.current = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;

      setScrollPosition(scrollY);

      if (Math.abs(scrollY - prevScrollY.current) >= THRESHOLD) {
        const newScrollDirection =
          scrollY > prevScrollY.current ? "down" : "up";

        if (prevScrollY.current >= 0 && scrollY >= 0) {
          setScrollDirection(newScrollDirection);
        }

        prevScrollY.current = scrollY > 0 ? scrollY : 0;
      }

      blocking.current = false;
    };

    const onScroll = () => {
      if (!blocking.current) {
        blocking.current = true;
        window.requestAnimationFrame(updateScrollDirection);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDirection]);

  return { scrollDirection, scrollPosition };
};

export { useScrollDirection };
