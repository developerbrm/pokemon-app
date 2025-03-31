import { createBrowserRouter, RouterProvider } from 'react-router'
import Component404 from '../component/Component404'
import Details from '../component/Details'
import Home from '../component/Home'
import { ROUTES } from './routes'

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    Component: Home,
  },
  {
    path: ROUTES.DETAILS,
    Component: Details,
  },
  {
    path: '*',
    Component: Component404,
  },
])

const RoutesProvider = () => {
  return <RouterProvider router={router} />
}

export default RoutesProvider
