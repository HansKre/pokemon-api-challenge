import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from 'components';
import { Dispatch, SetStateAction, useState } from 'react';
import { PokemonI } from 'types';

export interface ComponentProps {
  pokemons: PokemonI[] | undefined;
  setPokemons: Dispatch<SetStateAction<PokemonI[] | undefined>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  maxPages: number;
  setMaxPages: Dispatch<SetStateAction<number>>;
}

function MyApp({ Component, pageProps }: AppProps) {
  const [pokemons, setPokemons] = useState<PokemonI[] | undefined>();
  const [page, setPage] = useState(0);
  const [maxPages, setMaxPages] = useState(0);

  return (
    <Layout>
      <Component
        {...pageProps}
        pokemons={pokemons}
        setPokemons={setPokemons}
        page={page}
        setPage={setPage}
        maxPages={maxPages}
        setMaxPages={setMaxPages}
      />
    </Layout>
  );
}

export default MyApp;
