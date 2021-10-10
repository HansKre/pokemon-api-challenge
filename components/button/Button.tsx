import styled, { css } from 'styled-components';
import { bounceInReduced } from '../../styles/mainTheme';

const Button = styled.div`
  font-weight: bold;
  width: 100%;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: white;
  margin-top: 0.9rem;
  padding: 0.2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  ${(props) =>
    props.theme &&
    css`
      font-size: ${props.theme.typography.h2};
      color: ${props.theme.primaryColor};
    `}

  &:hover,
  &:focus,
  &:active {
    background-color: rgba(0, 0, 0, 0.03);
    animation: ${bounceInReduced} 0.15s;
    transform: scale(1.05);
  }
`;

export default Button;
