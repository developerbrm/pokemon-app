import { NavLink } from 'react-router'
import { ROUTES } from '../Routes/routes'

const Component404 = () => {
  return (
    <div className="grid h-screen w-screen place-content-center text-center">
      <h1 className="my-10 text-4xl font-bold text-slate-950">
        This page does not exist
      </h1>
      <p className="my-2 text-2xl font-medium text-slate-800">
        How did you get here?
      </p>
      <NavLink
        className="mx-auto w-fit rounded-md bg-blue-50 p-4 py-2 font-medium text-blue-500 transition hover:bg-blue-500 hover:text-white"
        to={ROUTES.HOME}
      >
        Lets go home
      </NavLink>
    </div>
  )
}

export default Component404
