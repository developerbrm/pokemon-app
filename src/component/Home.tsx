import { useEffect } from 'react'
import { useAppDispatch } from '../redux/store'
import { fetchPokemonList } from '../redux/reducers/pokemon/pokemonReducer'

const Home = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPokemonList(25))
  })

  return <div>Home Comp</div>
}

export default Home
