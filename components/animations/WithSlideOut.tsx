import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import useWindowSize from 'webdev-essentials/dist/hooks/useWindowResize';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
  delay?: number;
  slideOut: boolean;
  rowDirection?: boolean;
};

const CenteredMotionDiv = styled(motion.div)<{ rowDirection: boolean }>`
  display: flex;
  flex-direction: ${({ rowDirection }) => (rowDirection ? 'row' : 'column')};
`;

const variants = (width: number): Variants => {
  return {
    initial: { opacity: 1, x: 0 },
    slideOut: {
      opacity: [null, 0],
      x: [null, -width],
    },
  };
};

export default function WithSlideOut({
  children,
  delay,
  slideOut,
  rowDirection = false,
}: Props) {
  const { width } = useWindowSize();
  return (
    <CenteredMotionDiv
      variants={variants(width)}
      animate={slideOut ? 'slideOut' : 'initial'}
      transition={{
        duration: 0.5,
        times: [0, 1],
        ease: 'easeOut',
        delay: delay ? delay : 0.5,
      }}
      rowDirection={rowDirection}
    >
      {children}
    </CenteredMotionDiv>
  );
}
