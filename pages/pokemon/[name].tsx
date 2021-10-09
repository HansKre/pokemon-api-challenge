import { useRouter } from 'next/router';
import { ComponentProps } from '../_app';
import { PokemonI } from '../../types';
import { useEffect, useState } from 'react';
import { POKEMON_API } from '../../constants';

export default function Pokemon({ pokemons }: ComponentProps) {
  const router = useRouter();
  const name = router.query.name as string;
  const [pokemon, setPokemon] = useState<PokemonI>();

  // TODO: add error handling
  useEffect(() => {
    async function doFetch() {
      const pokemon: PokemonI = await fetch(`${POKEMON_API}${name}`)
        .then((res) => res.json())
        .catch((reason) => {
          console.log(reason);
          // setIsError(true);
        });
      // setIsError(false);
      setPokemon(pokemon);
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
    <>
      <button onClick={() => router.push('/')}>Go back</button>
      <h1>{name}</h1>
      {pokemon && <h2>weight: {pokemon.weight}</h2>}
    </>
  );
}
