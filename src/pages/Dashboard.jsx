import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadPokemonList,
  resetError
} from '../features/pokemon/pokemonSlice';

import Loader from '../components/Loader';
import PokemonCard from '../components/PokemonCard';
import Pagination from '../components/Pagination';
import FilterSort from '../components/FilterSort';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { pokemons, loading, error, filters } = useSelector(state => state.pokemon);

  // Apply filter and sort locally (because API does not support filtering & sorting)
  const filteredPokemons = pokemons.filter(pokemon => {
    if (!filters.type) return true;
    return pokemon.types.some(t => t.type.name === filters.type);
  });

  const sortedPokemons = [...filteredPokemons].sort((a, b) => {
    if (filters.sort === 'name-asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  useEffect(() => {
    dispatch(loadPokemonList());
  }, [dispatch]);

  if (loading) return <Loader />;

  if (error) return (
    <div style={{ color: 'red', textAlign: 'center' }}>
      <p>Error: {error}</p>
      <button onClick={() => { dispatch(resetError()); dispatch(loadPokemonList()); }}>
        Retry
      </button>
    </div>
  );

  if (sortedPokemons.length === 0) {
    return <p style={{ textAlign: 'center' }}>No Pokémon match your search.</p>;
  }

  return (
    <div style={{ padding: '0 1rem' }}>
      <FilterSort />

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {sortedPokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <Pagination />
    </div>
  );
};

export default Dashboard;
