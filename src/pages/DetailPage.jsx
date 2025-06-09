import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => {
        setPokemon(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch Pokémon data');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>
        {pokemon.name} {pokemon.base_experience > 100 && '⚡'}
      </h2>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <h3>Abilities:</h3>
      <ul>
        {pokemon.abilities.map((ab, i) => (
          <li key={i}>{ab.ability.name}</li>
        ))}
      </ul>
      <h3>Sprites:</h3>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <br />
      <button onClick={() => navigate('/')}>Back to Dashboard</button>
    </div>
  );
}

export default DetailPage;
