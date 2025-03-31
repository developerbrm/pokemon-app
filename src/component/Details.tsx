import { useParams } from 'react-router';

const Details = () => {
  const { id } = useParams<{ id: string }>();

  return <div>Details comp {id}</div>;
};

export default Details;
