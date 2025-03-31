import { NavLink } from 'react-router';

const Component404 = () => {
  return (
    <div className="grid place-content-center h-screen w-screen">
      <h1>This page does not exist</h1>
      <p>How did you get here?</p>
      <NavLink to="/">Lets go home</NavLink>
    </div>
  );
};

export default Component404;
