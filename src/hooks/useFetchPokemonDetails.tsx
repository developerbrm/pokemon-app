import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { fetchPokemonDetails } from '../utilities/api-helpers'
import { addPokemonDetails } from '../redux/reducers/pokemon/pokemonReducer'
import { InitialUIState } from '../utilities/models'
import { createInitialState } from '../utilities'

const initialState = createInitialState()

export default function useFetchPokemonDetails(name: string) {
  const pokemon = useAppSelector(
    (state) => state.pokemonReducer.pokemonDetailsState?.[name]
  )

  const [uiState, setUiState] = useState<InitialUIState>(initialState)

  const dispatch = useAppDispatch()

  useEffect(() => {
    setUiState((prevState) => ({ ...prevState, loading: true }))

    if (pokemon) {
      setUiState((prevState) => ({
        ...prevState,
        loading: false,
        data: pokemon,
        loaded: true,
      }))
      return
    }

    fetchPokemonDetails(name)
      .then((res) => {
        dispatch(addPokemonDetails(res))

        setUiState((prevState) => ({
          ...prevState,
          loading: false,
          data: res,
          loaded: true,
        }))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [dispatch, name, pokemon])

  return uiState
}
