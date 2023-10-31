import {FunctionComponent, PropsWithChildren} from "react";
import { motion } from "framer-motion";

export type FadeInPropsType = {
  className?: string,
}

const FadeIn: FunctionComponent<PropsWithChildren<FadeInPropsType>> = ({
  className = '',
  children,
}: PropsWithChildren<FadeInPropsType>) => {

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        transform: `scale(0.9)`,
      }}
      animate={{
        opacity: 1,
        transform: `scale(1)`,
      }}

    >
      { children }
    </motion.div>
  );
}

export default FadeIn;
