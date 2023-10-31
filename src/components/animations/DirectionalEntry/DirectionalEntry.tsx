import {FunctionComponent, PropsWithChildren} from "react";
import { motion } from "framer-motion";

export type DirectionalEntryPropsType = {
  className?: string,
  delay?: number,
}

const DirectionalEntry: FunctionComponent<PropsWithChildren<DirectionalEntryPropsType>> = ({
  className = '',
  children,
  delay = 0,
}: PropsWithChildren<DirectionalEntryPropsType>) => {
  const entries = [
    { translateX: `-8px`, translateY: `0px`, opacity: 0 },
    { translateX: `8px`, translateY: `0px`, opacity: 0 },
    { translateX: `0px`, translateY: `-8px`, opacity: 0 },
    { translateX: `0px`, translateY: `8px`, opacity: 0 },
  ]
  const selected = entries[Math.floor(Math.random()*entries.length)];

  return (
    <motion.div
      className={className}
      initial={selected}
      animate={{
        opacity: 1,
        translateX: `0`,
        translateY: `0`,
      }}
      transition={{
        duration: 1,
        delay,
      }}
    >
      { children }
    </motion.div>
  );
}

export default DirectionalEntry;
