import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { APIResponsePokemonsI } from 'types';
import { LIMIT, POKEMONS_API } from '@config/constants';
import { ComponentProps } from '@pages/_app';
import { PokemonCard } from 'components';
import { Column } from 'components';
import { Loader } from 'components';
import WithSlideOutAnimation from '@animations/WithSlideOutAnimation';
import WithSlideInAnimation from '@animations/WithSlideInAnimation';
import WithFadeInAnimation from '@animations/WithFadeInAnimation';

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
  const [animateOut, setAnimateOut] = useState(false);

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
      setAnimateOut(false);
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

  function animate() {
    setAnimateOut(true);
  }

  return (
    <Column>
      <WithSlideInAnimation fromLeft>
        <WithSlideOutAnimation slideOut={animateOut}>
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
            <WithFadeInAnimation>
              <Grid>
                {pokemons.map((pokemon) => {
                  return (
                    <PokemonCard
                      key={pokemon.name}
                      pokemon={pokemon}
                      onClick={animate}
                    />
                  );
                })}
              </Grid>
            </WithFadeInAnimation>
          )}
          {pokemons && pokemons.length === 0 && <p>No Pokemons.</p>}
        </WithSlideOutAnimation>
      </WithSlideInAnimation>
    </Column>
  );
}
