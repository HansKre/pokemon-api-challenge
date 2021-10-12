/* eslint-disable @next/next/no-img-element */
import { PokemonDetails as PokemonDetailsType } from '../../types';
import Title from './Title';
import Description from './Description';
import Column from '../column/Column';

export default function PokemonDetails({
  pokemon,
}: {
  pokemon: PokemonDetailsType;
}) {
  return (
    <Column margin='60px'>
      <Title>{pokemon.name}</Title>
      <img src={pokemon.img} alt={pokemon.name} width={100} height={100} />
      <Description>species: {pokemon.species}</Description>
      <Description>weight: {pokemon.weight}</Description>
      <Description bold>STATS:</Description>
      {pokemon.stats.map((stat) => (
        <Description key={stat.stat.name}>
          {`Base-${stat.stat.name}:`} {stat.base_stat}, Effort: {stat.effort}
        </Description>
      ))}
      <Description bold>MOVES:</Description>
      <Description>
        {pokemon.moves.reduce(
          (prev, curr) =>
            prev ? prev + ', ' + curr.move.name : curr.move.name,
          ''
        )}
      </Description>
      <Description bold>TYPES:</Description>
      {pokemon.types.map((type) => (
        <Description key={type.type.name}>
          {type.type.name} in slot {type.slot}
        </Description>
      ))}
    </Column>
  );
}
