import { createSlice } from '@reduxjs/toolkit'
import { createInitialState } from '../../../utilities'
import { fetchPokemonList } from '../../../utilities/api-helpers'
import {
  InitialUIState,
  PokemonData,
  PokemonListResponse,
} from '../../../utilities/models'

interface PokemonListState extends InitialUIState {
  data: PokemonListResponse
}

type PokemonDetailsState = Record<string, PokemonData>

interface InitialState {
  pokemonListState: PokemonListState
  pokemonDetailsState: PokemonDetailsState
}

const pokemonListState: PokemonListState =
  createInitialState() as PokemonListState
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
      state.pokemonDetailsState[action.payload.name] = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonList.pending, (state) => {
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
