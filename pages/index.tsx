import { useState, useEffect, useCallback } from 'react';
import { APIResponsePokemonsI } from '../types';
import { LIMIT } from '../constants';
import { ComponentProps } from './_app';
import PokemonCard from '../components/pokemon-card/PokemonCard';
import styled from 'styled-components';
import { css } from '@emotion/react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import mainTheme from '../styles/mainTheme';
import WithSlideUpAnimation from '../components/animations/WithSlideUpAnimation';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Pagination = styled.div`
  margin: 50px auto 0 auto;
`;

const Select = styled.select`
  font-size: 1rem;
  margin-left: 20px;
`;

const Label = styled.label`
  font-size: 1rem;
`;

const Grid = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  /* flex: auto; */
  max-width: 800px;
  margin-top: 3rem;
  max-height: 80vh;
  /* @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
    background-color: limegreen;
  } */
`;

const override = css`
  display: block;
  /* margin: 0 auto; */
  margin: 2;
`;

export default function Home({
  pokemons,
  setPokemons,
  page,
  setPage,
  maxPages,
  setMaxPages,
}: ComponentProps) {
  const [isError, setIsError] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const doFetch = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    const { results, count }: APIResponsePokemonsI = await fetch(
      `/api/pokemons?page=${page}`
    )
      .then((res) => res.json())
      .catch((reason) => {
        console.log(reason);
        setIsError(true);
      });
    setPokemons(results);
    setMaxPages(Math.ceil(count / LIMIT));
    setIsLoading(false);
  }, [page, setMaxPages, setPokemons]);

  useEffect(() => {
    if (firstRender && pokemons) {
      // do not fetch
      console.log('not fetching');
    } else {
      console.log('fetching', { firstRender, pokemons });
      doFetch();
    }
    setFirstRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function handleSelectChange(e: React.FormEvent<HTMLSelectElement>) {
    const newPage = e.currentTarget.value as any as number;
    setPage(newPage);
  }

  // console.log({ page, firstRender, maxPages });

  return (
    <Column>
      {!isLoading && (
        <Pagination>
          <Label>Go to page:</Label>
          <Select onChange={handleSelectChange} value={page}>
            {Array.from(Array(maxPages).keys()).map((index) => (
              <option key={index} value={index}>
                {index}
              </option>
            ))}
          </Select>
        </Pagination>
      )}
      {isError && <p>API Request failed</p>}
      {isLoading && (
        <PacmanLoader
          loading={isLoading}
          color={mainTheme.primaryColor}
          css={override}
          size={25}
        />
      )}
      {!isLoading && pokemons && pokemons.length > 0 && (
        <WithSlideUpAnimation>
          <Grid>
            {pokemons.map((pokemon) => {
              return <PokemonCard key={pokemon.name} pokemon={pokemon} />;
            })}
          </Grid>
        </WithSlideUpAnimation>
      )}
      {pokemons && pokemons.length === 0 && <p>No Pokemons.</p>}
    </Column>
    // <Column>
    //   {pokemons &&
    //     pokemons.map((pokemon) => {
    //       return <PokemonCard key={pokemon.name} pokemon={pokemon} />;
    //     })}
    // </Column>
  );
}
