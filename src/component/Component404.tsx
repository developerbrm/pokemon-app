import { NavLink } from 'react-router'
import { ROUTES } from '../Routes/routes'

const Component404 = () => {
  return (
    <div className="grid h-screen w-screen place-content-center">
      <h1>This page does not exist</h1>
      <p>How did you get here?</p>
      <NavLink to={ROUTES.HOME}>Lets go home</NavLink>
    </div>
  )
}

export default Component404
