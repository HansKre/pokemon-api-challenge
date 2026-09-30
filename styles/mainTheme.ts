import { keyframes } from 'styled-components';

const mainTheme = {
  typography: {
    h1: '4rem',
    h2: '1.5rem',
    p: '1.25rem',
  },
  primaryColor: '#db9137',
  secondaryColor: 'grey',
  backgroundColor: '#fff',
};

type CustomTheme = typeof mainTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
}

export const bounceIn = keyframes` 
  0% {
    transform: scale(1);
  }

  80% {
    transform: scale(1.3);
  }

  100% {
    transform: scale(1.3);
  }
`;

export const bounceInReduced = keyframes` 
  0% {
    transform: scale(1);
  }

  80% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1.05);
  }
`;

export default mainTheme;
