/* eslint-disable @next/next/no-img-element */
import { PokemonI } from '../../types';
import Card from './Card';
import Title from './Title';
import Description from './Description';
import { MouseEventHandler } from 'react';
import { useRouter } from 'next/router';

interface Props {
  pokemon: PokemonI;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
}

export default function PokemonCard({ pokemon, onClick }: Props) {
  const router = useRouter();

  function handleClick(event: any) {
    let timeout = 0;
    if (onClick) {
      onClick(event);
      timeout = 600;
    }
    setTimeout(() => {
      router.push(`/pokemon/${pokemon.name}`);
    }, timeout);
  }

  return (
    <Card onClick={handleClick}>
      <Title>{pokemon.name} &rarr;</Title>
      <img src={pokemon.img} alt={pokemon.name} width={100} height={100} />
      <Description>species: {pokemon.species}</Description>
      <Description>weight: {pokemon.weight}</Description>
    </Card>
  );
}
