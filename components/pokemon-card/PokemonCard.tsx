/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { PokemonI } from '../../types';
import Card from './Card';
import Title from './Title';
import Description from './Description';

export default function PokemonCard({ pokemon }: { pokemon: PokemonI }) {
  return (
    <Link href={`/pokemon/${pokemon.name}`} passHref>
      <Card>
        <Title>{pokemon.name} &rarr;</Title>
        <img src={pokemon.img} alt={pokemon.name} width={100} height={100} />
        <Description>species: {pokemon.species}</Description>
        <Description>weight: {pokemon.weight}</Description>
      </Card>
    </Link>
  );
}
