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
      initial={{ opacity: 0, x: `${fromLeft ? '-800px' : '800px'}` }}
      animate={{
        opacity: [null, 1],
        x: fromLeft ? [null, 200, 0] : [null, -200, 0],
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
