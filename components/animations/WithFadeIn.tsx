import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
};

const MotionDiv = styled(motion.div)`
  display: flex;
  flex: auto;
`;

export default function WithFadeIn({ children }: Props) {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {children}
    </MotionDiv>
  );
}
