import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createInitialState } from '../../../utilities'
import axios from 'axios'
import { GET_POKEMON_LIST } from '../../../utilities/api-helpers'
import {
  InitialUIState,
  PokemonDetailsResponse,
  PokemonListResponse,
} from '../../../utilities/models'

export const fetchPokemonList = createAsyncThunk(
  'pokemon/fetchPokemonList',
  async (limit?: number) =>
    axios
      .get<PokemonListResponse>(GET_POKEMON_LIST(limit))
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(err)
      })
)

interface PokemonListState extends InitialUIState {}

type PokemonDetailsState = Record<string, PokemonDetailsResponse>

interface InitialState {
  pokemonListState: PokemonListState
  pokemonDetailsState: PokemonDetailsState
}

// Define the initial state using that type

const pokemonListState: PokemonListState = createInitialState()
const pokemonDetailsState: PokemonDetailsState = {}

const initialState: InitialState = {
  pokemonListState,
  pokemonDetailsState,
}

export const counterSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    addPokemonDetails: (state, action) => {
      state.pokemonDetailsState[action.payload.id] = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonList.pending, (state, action) => {
      state.pokemonListState.loading = true
    })
    builder.addCase(fetchPokemonList.fulfilled, (state, action) => {
      state.pokemonListState.loading = false
      state.pokemonListState.data = action.payload
      state.pokemonListState.loaded = true
    })
    builder.addCase(fetchPokemonList.rejected, (state, action) => {
      state.pokemonListState.loading = false
      state.pokemonListState.error = action.error
    })
  },
})

export const { addPokemonDetails } = counterSlice.actions

export default counterSlice.reducer
