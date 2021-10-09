import styled from 'styled-components';

const Column = styled.div<{ margin?: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  margin: ${({ margin }) => margin};
`;

export default Column;
