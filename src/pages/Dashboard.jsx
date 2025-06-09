import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon, setOffset } from '../features/pokemon/pokemonSlice';
import { Link } from 'react-router-dom';

function Dashboard() {
  const dispatch = useDispatch();
  const { pokemonList, loading, error, offset } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemon(offset));
  }, [dispatch, offset]);

  return (
    <div>
      <h1>PokeDex Pro</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={index}>
            <Link to={`/details/${pokemon.name}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => dispatch(setOffset(Math.max(offset - 20, 0)))}>Previous</button>
        <button onClick={() => dispatch(setOffset(offset + 20))}>Next</button>
      </div>
    </div>
  );
}

export default Dashboard;
