import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPokemonList, fetchPokemonDetail } from '../../api/pokeApi';

const LIMIT = 20;

export const loadPokemonList = createAsyncThunk(
  'pokemon/loadList',
  async (_, { getState, rejectWithValue }) => {
    const offset = getState().pokemon.offset;
    try {
      const data = await fetchPokemonList(offset, LIMIT);

      // Fetch full details for each Pokémon
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const details = await fetchPokemonDetail(pokemon.url);
          return details;
        })
      );

      return {
        count: data.count,
        pokemons: detailedPokemons,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  pokemons: [],
  count: 0,
  offset: 0,
  page: 1,
  filters: {
    type: '',
    sort: 'name-asc', // 'name-asc' or 'name-desc'
  },
  loading: false,
  error: null,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setFilterType(state, action) {
      state.filters.type = action.payload;
      state.page = 1;
      state.offset = 0;
    },
    setSort(state, action) {
      state.filters.sort = action.payload;
    },
    nextPage(state) {
      if (state.offset + LIMIT < state.count) {
        state.offset += LIMIT;
        state.page += 1;
      }
    },
    prevPage(state) {
      if (state.offset - LIMIT >= 0) {
        state.offset -= LIMIT;
        state.page -= 1;
      }
    },
    resetError(state) {
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loadPokemonList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemons = action.payload.pokemons;
        state.count = action.payload.count;
      })
      .addCase(loadPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch Pokémon';
      });
  }
});

export const { setFilterType, setSort, nextPage, prevPage, resetError } = pokemonSlice.actions;

export default pokemonSlice.reducer;
