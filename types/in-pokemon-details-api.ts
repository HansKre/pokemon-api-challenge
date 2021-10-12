import * as Joi from 'joi';

export interface Pokemon {
  name: string;
  img: string;
  species: string;
  stats: Stat[];
  types: Type[];
  weight: number;
  moves: MoveElement[];
}

export interface StatClass {
  name: string;
  url: string;
}

const StatClassSchema = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().required(),
});

export interface Stat {
  base_stat: number;
  effort: number;
  stat: StatClass;
}

const StatSchema = Joi.object({
  base_stat: Joi.number().required(),
  effort: Joi.number().required(),
  stat: StatClassSchema,
});

export interface Type {
  slot: number;
  type: StatClass;
}

const TypeSchema = Joi.object({
  slot: Joi.number().required(),
  type: StatClassSchema,
});

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: StatClass;
  version_group: StatClass;
}

const VersionGroupDetailSchema = Joi.object({
  level_learned_at: Joi.number().required(),
  move_learn_method: StatClassSchema,
  version_group: StatClassSchema,
});

export interface MoveElement {
  move: StatClass;
  version_group_details: VersionGroupDetail[];
}

const MoveElementSchema = Joi.object({
  move: StatClassSchema,
  version_group_details: Joi.array().required().items(VersionGroupDetailSchema),
});

export const PokemonSchema = Joi.object({
  name: Joi.string().required(),
  img: Joi.string().required(),
  species: Joi.string().required(),
  stats: Joi.array().required().items(StatSchema),
  types: Joi.array().required().items(TypeSchema),
  weight: Joi.number().required(),
  moves: Joi.array().required().items(MoveElementSchema),
});

export const InPokemonDetailsAPISchema = Joi.object({
  name: Joi.string().required(),
  sprites: Joi.object({
    front_default: Joi.string().required(),
  }).unknown(true),
  species: Joi.object({
    name: Joi.string().required(),
  }).unknown(true),
  stats: Joi.array().required().items(StatSchema),
  types: Joi.array().required().items(TypeSchema),
  weight: Joi.number().required(),
  moves: Joi.array().required().items(MoveElementSchema),
}).unknown(true);

export interface OutPokemonsDetailsAPI {
  count: number;
  results: Pokemon[] | [];
}

export const OutPokemonsDetailsAPISchema = Joi.object({
  count: Joi.number().required(),
  results: Joi.array().required().items(PokemonSchema),
});

/*
pros:
- just works
- very good jsdoc
- .validate(value) returns error object
cons:
- requires another library for infering types
*/
