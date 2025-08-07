import { NavLink } from 'react-router'
import { ROUTES } from '../Routes/routes'

const Component404 = () => {
  return (
    <div className="grid h-screen w-screen place-content-center text-center">
      <h1 className="flex items-center justify-center gap-2 text-5xl font-bold">
        <span className="text-gradient from-orange-600 to-orange-400 text-4xl font-bold">
          This page does not exist
        </span>
        <span>😅</span>
      </h1>
      <p className="mt-2 mb-8 flex items-center justify-center gap-2 text-xl font-medium">
        <span className="text-gradient to-slate-500">
          How did you get here?
        </span>
        <span>😂</span>
      </p>
      <NavLink
        className="mx-auto w-fit rounded-md bg-blue-50 p-4 py-2 font-medium text-blue-500 transition hover:bg-blue-500 hover:text-white"
        to={ROUTES.HOME}
      >
        Lets fly to home 🚀
      </NavLink>
    </div>
  )
}

export default Component404
