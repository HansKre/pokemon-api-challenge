import { useRouter } from 'next/router';
import { ComponentProps } from '../_app';
import { PokemonI } from '../../types';
import { useEffect, useState } from 'react';
import { POKEMON_API } from '../../constants';
import Column from '../../components/column/Column';
import WithSlideInAnimation from '../../components/animations/WithSlideInAnimation';
import { Button } from '../../components/button/Button';
import PokemonDetails from '../../components/pokemon-card/PokemonDetails';
import Loader from '../../components/loader/Loader';

export default function Pokemon({ pokemons }: ComponentProps) {
  const router = useRouter();
  const name = router.query.name as string;
  const [pokemon, setPokemon] = useState<PokemonI>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // TODO: add loading animation when no data
  useEffect(() => {
    async function doFetch() {
      setIsLoading(true);
      const pokemon: PokemonI = await fetch(`${POKEMON_API}${name}`)
        .then((res) => res.json())
        .catch((reason) => {
          console.log(reason);
          setIsError(true);
        });
      setIsError(false);
      if (pokemon) {
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

  return (
    <WithSlideInAnimation>
      <Column margin='0 20vw 0 20vw'>
        <Button onClick={() => router.push('/')}>
          &larr; Back to all Pokemons
        </Button>
        {isError && <p>API Request failed</p>}
        {pokemon && <PokemonDetails pokemon={pokemon} />}
        {!pokemon && !isLoading && <p>Not a Pokemin -.-</p>}
        {isLoading && <Loader />}
      </Column>
    </WithSlideInAnimation>
  );
}
