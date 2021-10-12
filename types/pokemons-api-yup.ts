// https://github.com/jquense/yup/blob/HEAD/docs/typescript.md

/*
pro:
- native TypeScript Support
- only 17kb small (gzipped)
- error message on field level

con:
- no jsdoc
- NOT required() is default
- API doc not easy to understand, examples:
  - difference defined() undefined()
  - difference TypeOf, Asserts
- inferred types not compatible with
actual types
- in below InPokemonsAPISchema,
results is potentially undefined even though
it clearly required() and must be defined()
- schema.validate(value) returns a validated value,
which is a cast from the original
*/

// import { string, object, number, SchemaOf, array } from 'yup';
// import type { TypeOf, Asserts } from 'yup';

export interface _InPokemonsAPI {
  count: number;
  next: string;
  previous: string | null;
  results: _Pokemon[];
}

export interface _Pokemon {
  name: string;
  url: string;
}

// export const PokemonSchema: SchemaOf<_Pokemon> = object({
//   name: string().required(),
//   url: string().required(),
// }).required();

// export const InPokemonsAPISchema: SchemaOf<_InPokemonsAPI> = object({
//   count: number().required(),
//   next: string().required(),
//   previous: string().defined().nullable(),
//   results: array().defined().of(PokemonSchema).required(),
// });

// export interface InPokemonsAPI extends Asserts<typeof InPokemonsAPISchema> {}
// export interface InPokemonsAPI1 extends TypeOf<typeof InPokemonsAPISchema> {}
// export type InPokemonsAPI2 = TypeOf<typeof InPokemonsAPISchema>;
// export type Pokemon = TypeOf<typeof PokemonSchema>;

/* usage

import {
  InPokemonsAPISchema,
  InPokemonsAPI,
  Pokemon,
} from '@config/types/pokemons-api-yup';
import { ValidationError } from 'yup';

//...

try {
  const validatedResponse: InPokemonsAPI =
  InPokemonsAPISchema.validateSync(response);
  const { results: pokemons } = validatedResponse;
  // compiler error: pokemons possibly undefined
  const promises = pokemons.map((pokemon) =>
    P.getPokemonByName(pokemon.name)
  );

*/
