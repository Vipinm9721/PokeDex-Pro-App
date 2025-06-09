const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (offset = 0, limit = 20) => {
  const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
  if (!response.ok) throw new Error('Failed to fetch Pokémon list');
  const data = await response.json();
  return data;
};

export const fetchPokemonDetail = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch Pokémon details');
  return await response.json();
};
