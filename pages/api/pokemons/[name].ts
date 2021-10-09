import type { NextApiRequest, NextApiResponse } from 'next';
import { APIResponsePokemonsI, PokemonI } from '../../../types';
const Pokedex = require('pokedex-promise-v2');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PokemonI>
) {
  console.log('NAME API CALLED');
  if (req.method === 'GET') {
    const { name } = req.query;
    if (name && !Array.isArray(name)) {
      const P = new Pokedex();
      const pokemon: PokemonI = await P.getPokemonByName(name);
      res.status(200).json(pokemon);
    } else {
      // Server Error
      res.status(500).end();
    }
  } else {
    // Method Not Allowed
    res.status(405).end();
  }
}
