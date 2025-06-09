import { useDispatch } from 'react-redux';
import { setFilters, setSortOrder } from '../features/pokemon/pokemonSlice';

const Filters = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <select onChange={(e) => dispatch(setFilters(e.target.value))}>
        <option value="">All</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
      </select>

      <select onChange={(e) => dispatch(setSortOrder(e.target.value))}>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
    </div>
  );
};
export default Filters;
