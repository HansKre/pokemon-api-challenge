import { keyframes } from 'styled-components';

const mainTheme = {
  typography: {
    h1: '28px',
    h2: '21px',
    icon: '3rem',
  },
  primaryColor: '#db9137',
  secondaryColor: 'grey',
};

export const bounceIn = keyframes` 
  0 {
    transform: scale(0);
  }

  80% {
    transform: scale(1.3);
  }

  100% {
    transform: scale(1);
  }
`;

export const bounceInReduced = keyframes` 
  0 {
    transform: scale(0);
  }

  80% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
`;

export default mainTheme;
