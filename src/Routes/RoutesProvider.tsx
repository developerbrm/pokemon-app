import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from 'react-router'
import Component404 from '../component/Component404'
import Details from '../component/Details'
import Home from '../component/Home'
import { ROUTES } from './routes'

const RootLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES.DETAILS,
        element: <Details />,
      },
    ],
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
