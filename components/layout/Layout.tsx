import { ReactNode } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Head from 'next/head';
import WithFadeInAnimation from '../animations/WithFadeInAnimation';
import useWindowResize from 'webdev-essentials/dist/hooks/useWindowResize';
import mainTheme from '../../styles/mainTheme';

const LayoutContainer = styled.div<{ innerHeight: number }>`
  /* background-color: ${(props) => props.theme.backgroundColor}; */
  min-height: ${(props) => `calc(${props.innerHeight}px + 0px)`};
  height: ${(props) => `calc(${props.innerHeight}px + 0px)`};
  max-height: ${(props) => `calc(${props.innerHeight}px + 0px)`};
  min-width: 100vw;
  width: 100vw;
  max-width: 100vw;
  padding: 1rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: ${(props) => props.theme.typography.h1};
  color: ${(props) => props.theme.primaryColor};
  text-align: center;
`;

const Main = styled.main`
  display: flex;
  flex: auto;
  width: 100%;
  overflow: scroll;
`;

export default function Layout({ children }: { children: ReactNode }) {
  const { height: innerHeight } = useWindowResize();
  return (
    <ThemeProvider theme={mainTheme}>
      <WithFadeInAnimation>
        <LayoutContainer innerHeight={innerHeight}>
          <Head>
            <title>Pokemon API Challenge</title>
            <meta name='description' content='Pokemon API Challenge' />
            {/* viewport-fit=cover lets webpage scale to use notch-space on iOS when in landscape orientation
                maximum-scale=1 avoids automatic zoom on iOS when inputs are focused and focused element's font-size is less then 16px */}
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover'
            />
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <Title>Pokemon API Challenge</Title>
          <Main>{children}</Main>
        </LayoutContainer>
      </WithFadeInAnimation>
    </ThemeProvider>
  );
}
