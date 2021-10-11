# Pokemon API Challenge

## Design Decisions

- Frontend does not cache because `pokedex-promise-v2` backend library claims to do it
- Error Handling focuses on avoiding crashing, not on UX.

## Development

```bash
git clone git@github.com:HansKre/pokemon-api-challenge.git
cd pokemon-api-challenge
npm run dev
```

## Backend

### `/api/pokemons?page={pageNumber}`

Used by the main frontend page.

1. fetches a list of pokemons for a page:

   ```ts
   const response = await new Pokedex().getPokemonsList(interval);
   ```

2. validates server response:

   ```ts
   if (response.hasOwnProperty('results') && response.hasOwnProperty('count'))
   ```

3. fetches details for each pokemon. All requests are executed in parallel to reduce processing-duration:

   ```ts
   const promises = pokemons.map((pokemon) =>
     new Pokedex().getPokemonByName(pokemon.name)
   );
   const settled = await Promise.allSettled(promises);
   ```

4. validates server response

   ```ts
   if (
       result.hasOwnProperty('name') &&
       result.hasOwnProperty('sprites') &&
       result.hasOwnProperty('species') &&
       result.hasOwnProperty('stats') &&
       result.hasOwnProperty('types') &&
       result.hasOwnProperty('weight') &&
       result.hasOwnProperty('moves')
   )
   ```

5. projects only relevant properties

   ```ts
   const pokemon: PokemonI = {
     name: result.name,
     img: result.sprites.front_default,
     species: result.species.name,
     stats: result.stats,
     types: result.types,
     weight: result.weight,
     moves: result.moves,
   };
   ```

### `/api/pokemons/{name}`

Used if user opens details page directly.

1. fetches pokemon details

   ```ts
   const result = await P.getPokemonByName(name);
   res.status(200).json(project(result));
   ```

2. uses same validation and projection logic as above for the return

## Frontend

- uses `react`, `TypeScript`, `Next.js`, `styled-components`, `framer-motion`
- due to `SSR`, it is not a `SPA`
- `_app.tsx` is taking care of sharing data between the main page (list of pokemons) and pokemon-details page as `ComponentProps`

### Alternatives for data sharing between pages

- `react context`: similar to above approach although with more code
- `getServerSideProps` seems to target a particular page, like the main page. Did not get it to work with `_app.tsx` to make data available to multiple pages
- `getInitialProps`: Not recommended. 'If you're using Next.js 9.3 or newer, we recommend that you use `getStaticProps` or `getServerSideProps` instead of `getInitialProps`.'
- do not use `Next.js`'s `dynamic routing` and implement pokemon-details page as part of the main page as `SPA`

## Hosting

Hosted on [netlify.com](https://netlify.com/) with `netlify-nextjs-plugin` for `netfliy-serverless-functions`. Accessible under [vibrant-bose-12feb9.netlify.app/](https://vibrant-bose-12feb9.netlify.app/).

## Afterthoughts & Digest

- even though pokemon-details are fetched in parallel, requests take significantly too long having a negative impact on UX
- a significant improvement could be reached by moving details-requests to the frontend
- another improvement could be to also split rendering in three steps:
  - first, get a list of relevant pokemon names to show on current page (frontend could even cache a list of all 1100 pokemons, making them searchable and super quickly accessible on page-navigation)
  - secondly, render the PokemonCards with only the pokemon-names, image-placeholders and loading-animations
  - thirdly, execute pokemon-detail-requests and render responses asynchronously when they return
