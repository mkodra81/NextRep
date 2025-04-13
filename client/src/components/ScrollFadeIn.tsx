// components/ScrollFadeIn.tsx
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

type ScrollFadeInProps = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delayChildren?: number;
  staggerChildren?: number;
};

export const ScrollFadeIn = ({
  children,
  className = "",
  duration = 0.6,
  delayChildren = 0,
  staggerChildren = 0,
}: ScrollFadeInProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            delayChildren,
            staggerChildren,
          },
        },
        hidden: {
          opacity: 0,
          y: 40,
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
