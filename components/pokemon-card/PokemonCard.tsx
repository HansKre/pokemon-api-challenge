/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { bounceIn, bounceInReduced } from '../../styles/mainTheme';
import { PokemonI } from '../../types';

const onHoverFocusActive = css`
  color: ${(props) => props.theme.primaryColor};
  border-color: ${(props) => props.theme.primaryColor};
`;

const Title = styled.h2`
  margin: 0 0 1rem 0;
  font-size: ${(props) => props.theme.typography.h2};
  color: ${(props) => props.theme.secondaryColor};
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
  @media (max-width: 700px) {
    width: 80%;
  }
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
  font-size: ${(props) => props.theme.typography.p};
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
