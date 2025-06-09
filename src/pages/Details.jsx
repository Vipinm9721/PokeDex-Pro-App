import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error('Failed to fetch Pokémon details');
        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  if (!pokemon) return null;

  const {
    name,
    height,
    weight,
    moves,
    abilities,
    sprites,
    base_experience,
    types
  } = pokemon;

  // Conditions for styling and emojis
  const hasHighExp = base_experience > 100;
  const hasFireType = types.some(t => t.type.name === 'fire');
  const hasWaterType = types.some(t => t.type.name === 'water');
  const score = base_experience;

  const cardStyle = {
    border: hasFireType ? '3px solid red' : hasWaterType ? '3px solid blue' : '1px solid #ddd',
    backgroundColor: score > 100 ? '#d4f7d4' : 'white',
    borderRadius: 12,
    padding: 20,
    maxWidth: 600,
    margin: '2rem auto',
  };

  return (
    <div style={cardStyle}>
      <button onClick={() => navigate('/')} style={{ marginBottom: 20 }}>
        ← Back to Dashboard
      </button>
      <h2>
        {name.charAt(0).toUpperCase() + name.slice(1)} {hasHighExp && '⚡'}
      </h2>
      <p><strong>Height:</strong> {height}</p>
      <p><strong>Weight:</strong> {weight}</p>
      <p><strong>Base Experience:</strong> {base_experience}</p>
      <p><strong>Types:</strong> {types.map(t => t.type.name).join(', ')}</p>
      
      <h3>Abilities</h3>
      <ul>
        {abilities.map(({ ability }) => (
          <li key={ability.name}>{ability.name}</li>
        ))}
      </ul>

      <h3>Moves</h3>
      <ul style={{ maxHeight: 150, overflowY: 'auto' }}>
        {moves.map(({ move }) => (
          <li key={move.name}>{move.name}</li>
        ))}
      </ul>

      <h3>Sprites</h3>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {Object.entries(sprites)
          .filter(([key, value]) => typeof value === 'string' && value)
          .map(([key, url]) => (
            <img
              key={key}
              src={url}
              alt={`${name} ${key}`}
              width={96}
              height={96}
              style={{ border: '1px solid #ccc', borderRadius: 8 }}
            />
          ))}
      </div>
    </div>
  );
};

export default Details;
