import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type Props = {
  children: ReactNode;
  delay?: number;
};

export default function WithSlideUpAnimation({ children, delay }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: [null, 1],
        y: [null, 1],
      }}
      transition={{
        duration: 1,
        times: [0, 1],
        ease: 'easeInOut',
        delay: delay ? delay : 0.5,
      }}
    >
      {children}
    </motion.div>
  );
}
