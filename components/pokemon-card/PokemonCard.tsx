/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import styled, { css, keyframes } from 'styled-components';
import { PokemonI } from '../../types';

const onHoverFocusActive = css`
  color: ${(props) => props.theme.primaryColor};
  border-color: ${(props) => props.theme.primaryColor};
`;

const Title = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: ${(props) => props.theme.secondaryColor};
`;

const bounceIn = keyframes` 
  0 {
    transform: scale(0);
  }

  80% {
    transform: scale(1.3);
  }

  100% {
    transform: scale(1);
  }
`;

const bounceInReduced = keyframes` 
  0 {
    transform: scale(0);
  }

  80% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
`;

const Card = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 45%;
  &:hover,
  &:focus,
  &:active {
    ${onHoverFocusActive}
    ${Title} {
      ${onHoverFocusActive}
    }
    animation: ${bounceInReduced} 0.15s;
    img {
      animation: ${bounceIn} 0.15s;
    }
  }
`;

const Description = styled.p`
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.5;
  font-weight: 100;
`;

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
