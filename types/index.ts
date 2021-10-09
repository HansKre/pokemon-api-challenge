export interface PokemonI {
  name: string;
  img: string;
  species: string;
  stats: Stat[];
  types: Type[];
  weight: number;
  moves: MoveElement[];
}

export interface MoveElement {
  move: StatClass;
  version_group_details: VersionGroupDetail[];
}

export interface StatClass {
  name: string;
  url: string;
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: StatClass;
  version_group: StatClass;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: StatClass;
}

export interface Type {
  slot: number;
  type: StatClass;
}

export interface APIResponsePokemonsI {
  results: PokemonI[];
  count: number;
}
