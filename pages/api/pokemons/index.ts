import type { NextApiRequest, NextApiResponse } from 'next';
import { APIResponsePokemonsI, PokemonI } from '../../../types';
const Pokedex = require('pokedex-promise-v2');
import { LIMIT } from '../../../constants';

export function project(result: any): PokemonI | null {
  if (
    result.hasOwnProperty('name') &&
    result.hasOwnProperty('sprites') &&
    result.hasOwnProperty('species') &&
    result.hasOwnProperty('stats') &&
    result.hasOwnProperty('types') &&
    result.hasOwnProperty('weight') &&
    result.hasOwnProperty('moves')
  ) {
    const pokemon: PokemonI = {
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
  return null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponsePokemonsI>
) {
  // TODO naming convention for path parameters
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
      if (
        response.hasOwnProperty('results') &&
        response.hasOwnProperty('count')
      ) {
        const { results: pokemons }: { results: PokemonI[] } = response;
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
          .filter((pokemon) => pokemon !== null) as PokemonI[] | [];
        res
          .status(200)
          .json({ results: pokemonsProjected, count: response.count });
      } else {
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
