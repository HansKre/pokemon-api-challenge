import styled, { css } from 'styled-components';

const Description = styled.p<{ bold?: boolean }>`
  margin: 0;
  font-size: ${(props) => props.theme.typography.p};
  line-height: 1.5;
  font-weight: ${({ bold }) => (bold ? 700 : 100)};
  ${({ bold }) =>
    bold &&
    css`
      padding-top: 0.8rem;
    `}
`;

export default Description;
