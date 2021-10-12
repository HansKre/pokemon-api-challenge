import * as Joi from 'joi';

export interface InPokemonsAPI {
  count: number;
  next: string;
  previous: string | null;
  results: Pokemon[];
}

export interface Pokemon {
  name: string;
  url: string;
}

export const PokemonSchema = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().required(),
}).required();

export const InPokemonsAPISchema = Joi.object({
  count: Joi.number().required(),
  next: Joi.string().required(),
  previous: Joi.string().allow(null, ''),
  results: Joi.array().required().items(PokemonSchema),
});
