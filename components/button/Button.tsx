import styled, { css } from 'styled-components';
import { Role, setRoleColor } from '../../styles/mainTheme';

export const Button = styled.div<{ role: keyof typeof Role }>`
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
  transition: all 0.3s ease-in-out;

  ${(props) =>
    props.theme &&
    css`
      font-size: ${props.theme.typography.h1};
      color: ${props.theme.warningColor};
    `}

  ${(props) => setRoleColor}

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;
