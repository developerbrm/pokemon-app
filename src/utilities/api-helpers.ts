export const LIST_LIMIT = 20

export const GET_SINGLE_POKEMON = 'https://pokeapi.co/api/v2/pokemon/{id}'
export const GET_POKEMON_LIST = (limit = LIST_LIMIT) =>
  `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
