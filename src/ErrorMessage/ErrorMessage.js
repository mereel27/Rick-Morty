import errorImg from '../assets/img/rmError.png';
import { useNavigate } from 'react-router-dom';

export default function ErrorMessage({ error }) {
  const navigate = useNavigate();
  return (
    <div className="error">
      <img className="error__img" src={errorImg} alt="error"></img>
      <p className="error_message">{`The page you are trying to search has been
moved to another universe.. Error ${error?.status}`}</p>
      <button className="error__button" onClick={() => navigate('/')}>back to earth</button>
    </div>
  );
}
