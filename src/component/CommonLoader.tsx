import { constructPubicMediaUrl } from '../utilities/app-helpers'

const imageSrc = constructPubicMediaUrl('/pikachu.png')

const CommonLoader = () => (
  <div className="grid h-screen w-screen place-content-center">
    <div className="">
      <img
        src={imageSrc}
        loading="eager"
        alt=""
        className="spinner-animation aspect-square w-[50px] object-contain object-center drop-shadow-sm"
      />
    </div>
  </div>
)

export default CommonLoader
