import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface RevealProps {
    children : JSX.Element;
    delay : number;
}
export const Reveal = ({ children, delay }: RevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref)
    const mailControls = useAnimation();

    useEffect(()=>{
        if(isInView){
            
            mailControls.start("visible");
        }
    },[isInView])
  return (
    <div ref = {ref}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mailControls}
        transition={{duration:0.5, delay:delay*0.33}}
      >
        {children}
      </motion.div>
    </div>
  );
};
