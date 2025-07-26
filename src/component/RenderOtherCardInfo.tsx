import type { PokemonOtherCardInfoData } from '../../server/types'

const RenderOtherCardInfo = (otherCardInfo: PokemonOtherCardInfoData) => {
  return (
    <div className="col-span-2 row-start-2 grid w-full grid-flow-col justify-between">
      <div className="gap-2 self-end text-slate-800">
        <div>
          <strong>Height:</strong> {otherCardInfo?.height}
        </div>

        <div>
          <strong>Species:</strong> {otherCardInfo?.species.name}
        </div>

        <div>
          <strong>Weight:</strong> {otherCardInfo?.weight} kg
        </div>
      </div>
      <div className="aspect-square w-[120px]">
        <img
          className="h-full w-full object-contain drop-shadow-md"
          src={otherCardInfo?.sprites.other['official-artwork'].front_default}
          alt={otherCardInfo?.name}
        />
      </div>
    </div>
  )
}

export default RenderOtherCardInfo
