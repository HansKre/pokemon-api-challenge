import PacmanLoader from 'react-spinners/PacmanLoader';
import mainTheme from '../../styles/mainTheme';

export default function Loader() {
  return (
    <PacmanLoader loading={true} color={mainTheme.primaryColor} size={25} />
  );
}
