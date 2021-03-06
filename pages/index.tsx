import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { OutPokemonsAPI } from 'types';
import { LIMIT, POKEMONS_API } from '@config/constants';
import { ComponentProps } from '@pages/_app';
import { PokemonCard } from 'components';
import { Column } from 'components';
import { Loader } from 'components';
import WithSlideOut from '@animations/WithSlideOut';
import WithSlideIn from '@animations/WithSlideIn';
import WithFadeIn from '@animations/WithFadeIn';

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
    const response = await fetch(`${POKEMONS_API}${page}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          setIsError(true);
          setPokemons(undefined);
          return null;
        }
      })
      .catch((reason) => {
        console.log(reason);
        setIsError(true);
        setPokemons(undefined);
      });
    if (response) {
      const { results, count }: OutPokemonsAPI = response;
      if (results) {
        setPokemons(results);
        setMaxPages(Math.ceil(count / LIMIT));
      }
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
      <WithSlideIn fromLeft>
        <WithSlideOut slideOut={animateOut} toRight>
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
            <WithFadeIn>
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
            </WithFadeIn>
          )}
          {pokemons && pokemons.length === 0 && <p>No Pokemons.</p>}
        </WithSlideOut>
      </WithSlideIn>
    </Column>
  );
}
