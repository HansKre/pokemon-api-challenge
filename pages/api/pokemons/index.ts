import type { NextApiRequest, NextApiResponse } from 'next';
const Pokedex = require('pokedex-promise-v2');
import { OutPokemonsAPI, PokemonDetails } from 'types';
import { LIMIT } from '@config/constants';
import {
  InPokemonsAPI,
  InPokemonsAPISchema,
} from '@config/types/in-pokemons-api';
import { InPokemonDetailsAPISchema } from '@config/types/in-pokemon-details-api';

export function project(result: any): PokemonDetails | null {
  const { error } = InPokemonDetailsAPISchema.validate(result);
  if (!error) {
    // TODO: use joi-to-typescript package
    // const validatedResult:InPokemonDetailsAPI = result;
    const pokemon: PokemonDetails = {
      name: result.name,
      img: result.sprites.front_default,
      species: result.species.name,
      stats: result.stats,
      types: result.types,
      weight: result.weight,
      moves: result.moves,
    };
    return pokemon;
  }
  console.log(error);
  return null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OutPokemonsAPI>
) {
  console.log('POKEMON API CALLED');
  if (req.method === 'GET') {
    const { page: pageParam } = req.query;
    if (
      pageParam &&
      !Array.isArray(pageParam) &&
      Number.isInteger(parseInt(pageParam))
    ) {
      const page: number = parseInt(pageParam);
      const P = new Pokedex();
      const interval = {
        limit: LIMIT,
        offset: page * LIMIT,
      };
      const response = await P.getPokemonsList(interval);
      const { error } = InPokemonsAPISchema.validate(response);
      if (!error) {
        const { results: pokemons } = response as InPokemonsAPI;
        const promises = pokemons.map((pokemon) =>
          P.getPokemonByName(pokemon.name)
        );
        const settled = await Promise.allSettled(promises);
        const results = settled
          .filter((result) => result.status === 'fulfilled')
          .map((result) =>
            result.status === 'fulfilled' ? result.value : null
          );
        const pokemonsProjected = results
          .map((result) => project(result))
          .filter((pokemon) => pokemon !== null) as PokemonDetails[] | [];
        res
          .status(200)
          .json({ results: pokemonsProjected, count: response.count });
      } else {
        console.log(error);
        // Server Error
        res.status(500).end();
      }
    } else {
      // Bad Request
      res.status(400).end();
    }
  } else {
    // Method Not Allowed
    res.status(405).end();
  }
}
