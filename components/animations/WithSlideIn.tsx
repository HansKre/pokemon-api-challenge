import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
  delay?: number;
  fromLeft?: boolean;
};

const CenteredMotionDiv = styled(motion.div)`
  display: flex;
  flex: 1;
`;

export default function WithSlideIn({ children, delay, fromLeft }: Props) {
  return (
    <CenteredMotionDiv
      initial={{ opacity: 0, x: fromLeft ? -800 : 800 }}
      animate={{
        opacity: [0, 1, 1],
        x: fromLeft ? [-800, 200, 0] : [800, -200, 0],
      }}
      transition={{
        duration: 0.5,
        times: [0, 0.7, 1],
        ease: 'easeInOut',
        delay: delay ? delay : 0.5,
      }}
    >
      {children}
    </CenteredMotionDiv>
  );
}
