import styled from 'styled-components';

const Title = styled.h2`
  margin: 0 0 1rem 0;
  font-size: ${(props) => props.theme.typography.h2};
  color: ${(props) => props.theme.secondaryColor};
`;

export default Title;
