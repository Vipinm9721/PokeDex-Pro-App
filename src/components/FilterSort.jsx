import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterType, setSort, loadPokemonList } from '../features/pokemon/pokemonSlice';

const TYPES = [
  '', 'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground',
  'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'dragon', 'steel', 'fairy'
];

const FilterSort = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.pokemon);

  const handleTypeChange = (e) => {
    dispatch(setFilterType(e.target.value));
    dispatch(loadPokemonList());
  };

  const handleSortChange = (e) => {
    dispatch(setSort(e.target.value));
  };

  return (
    <div style={{ marginBottom: 20, display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <label>
        Filter by Type: 
        <select value={filters.type} onChange={handleTypeChange} style={{ marginLeft: 8 }}>
          {TYPES.map((type) => (
            <option key={type} value={type}>
              {type || 'All'}
            </option>
          ))}
        </select>
      </label>

      <label>
        Sort by Name:
        <select
          value={filters.sort}
          onChange={(e) => {
            handleSortChange(e);
            dispatch(loadPokemonList());
          }}
          style={{ marginLeft: 8 }}
        >
          <option value="name-asc">A-Z</option>
          <option value="name-desc">Z-A</option>
        </select>
      </label>
    </div>
  );
};

export default FilterSort;
