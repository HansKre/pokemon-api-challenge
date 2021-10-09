import { motion } from 'framer-motion';
import { MouseEventHandler, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { bounceIn, bounceInReduced } from '../../styles/mainTheme';
import Title from './Title';

const onHoverFocusActive = css`
  color: ${(props) => props.theme.primaryColor};
  border-color: ${(props) => props.theme.primaryColor};
`;

const StyledMotionA = styled(motion.a)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease, scale 0.15s ease-in;
  cursor: pointer;
  width: 45%;
  @media (max-width: 700px) {
    width: 80%;
  }
  &:hover,
  &:focus,
  &:active {
    ${onHoverFocusActive}
    ${Title} {
      ${onHoverFocusActive}
    }
    animation: ${bounceInReduced} 0.15s;
    transform: scale(1.05);
    img {
      animation: ${bounceIn} 0.15s;
    }
  }
`;

interface Props {
  children: ReactNode;
  scale?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
}

const variants = {
  // initial: { scale: 1 },
  // overwrites transform: scale(1.05); from onHover
  scale: {
    scale: 1.05,
  },
};

export default function Card({ children, scale, onClick }: Props) {
  return (
    <StyledMotionA
      onClick={onClick}
      variants={variants}
      animate={scale ? 'scale' : 'initial'}
      transition={{
        duration: 0.15,
        times: [0, 1],
        ease: 'easeIn',
      }}
    >
      {children}
    </StyledMotionA>
  );
}
