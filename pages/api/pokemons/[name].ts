import type { NextApiRequest, NextApiResponse } from 'next';
import { PokemonI } from '../../../types';
const Pokedex = require('pokedex-promise-v2');
import { project } from './index';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PokemonI | null>
) {
  console.log('NAME API CALLED');
  if (req.method === 'GET') {
    const { name } = req.query;
    if (name && !Array.isArray(name)) {
      const P = new Pokedex();
      const result = await P.getPokemonByName(name);
      res.status(200).json(project(result));
    } else {
      // Server Error
      res.status(500).end();
    }
  } else {
    // Method Not Allowed
    res.status(405).end();
  }
}
