import { useState, useEffect, useCallback } from 'react';
import { APIResponsePokemonsI } from '../types';
import { LIMIT, POKEMONS_API } from '../constants';
import { ComponentProps } from './_app';
import PokemonCard from '../components/pokemon-card/PokemonCard';
import styled from 'styled-components';
import WithSlideUpAnimation from '../components/animations/WithSlideUpAnimation';
import Column from '../components/column/Column';
import Loader from '../components/loader/Loader';

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
  max-width: 800px;
  margin-top: 3rem;
  max-height: 80vh;
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
      `${POKEMONS_API}${page}`
    )
      .then((res) => res.json())
      .catch((reason) => {
        console.log(reason);
        setIsError(true);
      });
    if (results) {
      setPokemons(results);
      setMaxPages(Math.ceil(count / LIMIT));
    }
    setIsLoading(false);
  }, [page, setMaxPages, setPokemons]);

  useEffect(() => {
    if (firstRender && pokemons) {
      // do not fetch
    } else {
      doFetch();
    }
    setFirstRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function handleSelectChange(e: React.FormEvent<HTMLSelectElement>) {
    const newPage = e.currentTarget.value as any as number;
    setPage(newPage);
  }

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
      {isLoading && <Loader />}
      {!isLoading && pokemons && pokemons.length > 0 && (
        // TODO: do not animate on navigate but only on new data
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
  );
}
