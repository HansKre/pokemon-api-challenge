import type { NextApiRequest, NextApiResponse } from 'next';
const Pokedex = require('pokedex-promise-v2');
import { PokemonDetails } from 'types';
import { project } from '@api/pokemons';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PokemonDetails | null>
) {
  console.log('NAME API CALLED');
  if (req.method === 'GET') {
    const { name } = req.query;
    if (name && !Array.isArray(name)) {
      const P = new Pokedex();
      try {
        const result = await P.getPokemonByName(name);
        res.status(200).json(project(result));
      } catch (err: any) {
        console.log(err);
        var numberPattern = /\d+/g;
        let status;
        if (err instanceof Error) {
          status = parseInt(err.message.match(numberPattern)?.[0] || '500');
        }
        res.status(status || 500).end();
      }
    } else {
      // Server Error
      res.status(500).end();
    }
  } else {
    // Method Not Allowed
    res.status(405).end();
  }
}
