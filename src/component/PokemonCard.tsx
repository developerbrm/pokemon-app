import { NavLink } from 'react-router'
import type { PokemonOtherCardInfoData } from '../../server/types'
import { getDetailsPageRoute } from '../Routes/routes'
import RenderOtherCardInfo from './RenderOtherCardInfo'

interface PokemonCard {
  otherCardInfo: PokemonOtherCardInfoData
  searchKeyword: string
  handleOnClick?: () => void
}

const PokemonCard = (props: PokemonCard) => {
  const { otherCardInfo, searchKeyword, handleOnClick } = props

  if (!otherCardInfo.name.includes(searchKeyword)) return null

  return (
    <NavLink
      title={`click to see ${otherCardInfo.name} details`}
      onClick={handleOnClick}
      to={getDetailsPageRoute({ id: otherCardInfo.id })}
    >
      <div className="grid h-[200px] grid-flow-col justify-between rounded-md bg-slate-200 p-5 shadow-sm">
        <h3 className="text-gradient from-slate-950 to-slate-700 text-2xl font-bold capitalize">
          {otherCardInfo?.name}
        </h3>

        <RenderOtherCardInfo {...otherCardInfo} />
      </div>
    </NavLink>
  )
}

export const LoadingPokemonCard = () => (
  <div className="h-[200px] w-full animate-pulse rounded-md bg-slate-400 p-5 shadow-sm"></div>
)

export default PokemonCard
