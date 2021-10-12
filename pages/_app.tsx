import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from 'components';
import { Dispatch, SetStateAction, useState } from 'react';
import { PokemonDetails } from 'types';

export interface ComponentProps {
  pokemons: PokemonDetails[] | undefined;
  setPokemons: Dispatch<SetStateAction<PokemonDetails[] | undefined>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  maxPages: number;
  setMaxPages: Dispatch<SetStateAction<number>>;
}

function MyApp({ Component, pageProps }: AppProps) {
  const [pokemons, setPokemons] = useState<PokemonDetails[] | undefined>();
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
