import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPokemon = createAsyncThunk(
  'pokemon/fetchPokemon',
  async (offset = 0) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
    return response.data.results;
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemonList: [],
    loading: false,
    error: null,
    offset: 0
  },
  reducers: {
    setOffset: (state, action) => {
      state.offset = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemonList = action.payload;
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setOffset } = pokemonSlice.actions;
export default pokemonSlice.reducer;
