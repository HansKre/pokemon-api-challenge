/* eslint-disable @next/next/no-img-element */
import { PokemonDetails } from '../../types';
import Card from './Card';
import Title from './Title';
import Description from './Description';
import { MouseEventHandler, useState } from 'react';
import { useRouter } from 'next/router';

interface Props {
  pokemon: PokemonDetails;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
}

export default function PokemonCard({ pokemon, onClick }: Props) {
  const router = useRouter();
  const [animate, setAnimate] = useState(false);

  function handleClick(event: any) {
    setAnimate(true);
    let timeout = 0;
    if (onClick) {
      onClick(event);
      timeout = 600;
    }
    setTimeout(() => {
      setAnimate(false);
      router.push(`/pokemon/${pokemon.name}`);
    }, timeout);
  }

  return (
    <Card scale={animate} onClick={handleClick}>
      <Title>{pokemon.name} &rarr;</Title>
      <img src={pokemon.img} alt={pokemon.name} width={100} height={100} />
      <Description>species: {pokemon.species}</Description>
      <Description>weight: {pokemon.weight}</Description>
    </Card>
  );
}
