import { useEffect } from 'react'
import { NavLink } from 'react-router'
import { addPokemonDetails } from '../redux/reducers/pokemon/pokemonReducer'
import { useAppDispatch } from '../redux/store'
import { getDetailsPageRoute } from '../Routes/routes'
import { fetchPokemonDetails } from '../utilities/api-helpers'
import { PokemonListResponseItem } from '../utilities/models'

interface PokemonCard {
  pokemon: PokemonListResponseItem
}

const PokemonCard = (props: PokemonCard) => {
  const { pokemon } = props
  const dispatch = useAppDispatch()

  useEffect(() => {
    fetchPokemonDetails(pokemon.name)
      .then((res) => {
        dispatch(addPokemonDetails(res))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [dispatch, pokemon.name])

  return (
    <NavLink to={getDetailsPageRoute(pokemon.name)}>
      <div className="grid rounded-md bg-slate-200 p-5 shadow-sm">
        <h3 className="text-lg font-medium text-slate-800 capitalize">
          {pokemon.name}
        </h3>
      </div>
    </NavLink>
  )
}

export default PokemonCard
