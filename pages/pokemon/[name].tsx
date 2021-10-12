import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ComponentProps } from '@pages/_app';
import { PokemonDetails as PokemonDetailsType } from 'types';
import { POKEMON_API } from '@config/constants';
import { Column } from 'components';
import { Button } from 'components';
import { PokemonDetails } from 'components';
import { Loader } from 'components';
import WithSlideIn from '@componentsanimations/WithSlideIn';
import WithSlideOut from '@componentsanimations/WithSlideOut';

export default function Pokemon({ pokemons }: ComponentProps) {
  const router = useRouter();
  const name = router.query.name as string;
  const [pokemon, setPokemon] = useState<PokemonDetailsType>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    async function doFetch() {
      setIsLoading(true);
      const pokemon: PokemonDetailsType = await fetch(`${POKEMON_API}${name}`)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            setIsError(true);
            setPokemon(undefined);
            return null;
          }
        })
        .catch((reason) => {
          console.log(reason);
          setPokemon(undefined);
          setIsError(true);
        });
      if (pokemon) {
        setIsError(false);
        setPokemon(pokemon);
      }
      setIsLoading(false);
    }
    if (pokemons) {
      const result = pokemons?.find((pokemon) => pokemon.name === name);
      if (result) {
        setPokemon(result);
      }
    } else {
      doFetch();
    }
  }, [name, pokemons]);

  function handleClick() {
    setAnimateOut(true);
    setTimeout(() => {
      router.push('/');
    }, 700);
  }

  return (
    <WithSlideIn fromLeft>
      <WithSlideOut slideOut={animateOut} rowDirection toRight>
        <Column margin='0 20vw 0 20vw'>
          <Button onClick={handleClick}>&larr; Back to all Pokemons</Button>
          {isError && <p>API Request failed</p>}
          {pokemon && <PokemonDetails pokemon={pokemon} />}
          {!pokemon && !isLoading && <p>Not a Pokemin -.-</p>}
          {isLoading && <Loader />}
        </Column>
      </WithSlideOut>
    </WithSlideIn>
  );
}
