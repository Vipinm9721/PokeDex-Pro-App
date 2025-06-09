import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextPage, prevPage, loadPokemonList } from '../features/pokemon/pokemonSlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const { page, count, offset } = useSelector((state) => state.pokemon);
  const limit = 20;
  const totalPages = Math.ceil(count / limit);

  const handleNext = () => {
    dispatch(nextPage());
    dispatch(loadPokemonList());
  };

  const handlePrev = () => {
    dispatch(prevPage());
    dispatch(loadPokemonList());
  };

  return (
    <div style={{ marginTop: 20, textAlign: 'center' }}>
      <button onClick={handlePrev} disabled={page === 1} style={{ marginRight: 10 }}>
        Previous
      </button>
      <span>Page {page} / {totalPages || 1}</span>
      <button onClick={handleNext} disabled={offset + limit >= count} style={{ marginLeft: 10 }}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
