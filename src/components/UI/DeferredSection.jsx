import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function DeferredSection({ children, minHeight = 640 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "700px 0px" },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <div ref={ref} style={{ minHeight: visible ? undefined : minHeight }} aria-hidden={visible ? undefined : true}>
      {visible ? children : null}
    </div>
  );
}
