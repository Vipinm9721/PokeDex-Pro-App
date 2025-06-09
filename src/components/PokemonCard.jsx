import React from 'react';
import { Link } from 'react-router-dom';

const PokemonCard = ({ pokemon }) => {
  const {
    id,
    name,
    base_experience,
    weight,
    types,
    sprites,
  } = pokemon;

  // Conditions
  const hasHighExp = base_experience > 100;
  const hasFireType = types.some(t => t.type.name === 'fire');
  const hasWaterType = types.some(t => t.type.name === 'water');
  const score = base_experience; // Using base_experience as score

  // Styles
  const cardStyle = {
    border: hasFireType ? '2px solid red' : hasWaterType ? '2px solid blue' : '1px solid #ddd',
    backgroundColor: score > 100 ? '#d4f7d4' : 'white',
    borderRadius: 8,
    padding: 12,
    textAlign: 'center',
    width: 180,
    margin: 8,
  };

  return (
    <Link to={`/details/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={cardStyle}>
        <img src={sprites.front_default} alt={name} width={96} height={96} />
        <h3>
          {name.charAt(0).toUpperCase() + name.slice(1)} {hasHighExp && '⚡'}
        </h3>
        <p>Base Exp: {base_experience}</p>
        <p>Weight: {weight}</p>
        <p>Types: {types.map(t => t.type.name).join(', ')}</p>
      </div>
    </Link>
  );
};

export default PokemonCard;
