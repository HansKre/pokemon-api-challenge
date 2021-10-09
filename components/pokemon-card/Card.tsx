import styled, { css } from 'styled-components';
import { bounceIn, bounceInReduced } from '../../styles/mainTheme';
import Title from './Title';

const onHoverFocusActive = css`
  color: ${(props) => props.theme.primaryColor};
  border-color: ${(props) => props.theme.primaryColor};
`;

const Card = styled.a`
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
  transition: color 0.15s ease, border-color 0.15s ease;
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
    img {
      animation: ${bounceIn} 0.15s;
    }
  }
`;

export default Card;
