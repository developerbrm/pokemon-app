import { createBrowserRouter, RouterProvider } from 'react-router';
import { ROUTES } from './routes';
import Home from '../component/Home';
import Details from '../component/Details';
import Component404 from '../component/Component404';

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
]);

const RoutesProvider = () => {
  return <RouterProvider router={router} />;
};

export default RoutesProvider;
