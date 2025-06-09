import { useDispatch, useSelector } from 'react-redux';
import { setOffset, fetchPokemons } from '../features/pokemon/pokemonSlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const { offset } = useSelector(state => state.pokemon);

  const handlePageChange = (newOffset) => {
    dispatch(setOffset(newOffset));
    dispatch(fetchPokemons(newOffset));
  };

  return (
    <div>
      <button disabled={offset === 0} onClick={() => handlePageChange(offset - 20)}>Previous</button>
      <button onClick={() => handlePageChange(offset + 20)}>Next</button>
    </div>
  );
};

export default Pagination;
