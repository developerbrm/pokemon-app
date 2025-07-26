import { useQuery } from '@tanstack/react-query'
import WithLoader from './WithLoader'
import { getFeaturedPokemons } from '../utilities/app-helpers'
import PokemonCard from './PokemonCard'
import Heading from './Heading'

interface Props {
  id: string
}

const FeaturedPokemons = (props: Props) => {
  const { id } = props

  const { data: featuredPokemonArr, isPending } = useQuery({
    queryKey: [`FeaturedPokemons - ${id}`],
    queryFn: () => getFeaturedPokemons({ id }),
  })

  // const scrollToTop = useCallback(() => {
  //   if (containerRef.current) {
  //     containerRef.current.scrollTo({
  //       top: 0,
  //       behavior: 'smooth',
  //     })
  //   }
  // }, [containerRef])

  return (
    <WithLoader isLoading={isPending}>
      <div
        className={`${!featuredPokemonArr?.length && 'hidden'} mr-auto w-fit text-start`}
      >
        <Heading text="Similar Pokemons" />
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featuredPokemonArr?.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            searchKeyword={''}
            otherCardInfo={pokemon}
            // handleOnClick={scrollToTop}
          />
        ))}
      </div>
    </WithLoader>
  )
}

export default FeaturedPokemons
