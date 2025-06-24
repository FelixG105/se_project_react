import './Header.css';
import logo from '../../assets/logo.svg';
import avatar from '../../assets/avatar.png';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img src={logo} alt="Header Logo" className="header__logo" />
        </Link>

        <p className="header__date-and-loc">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__right">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">
              {currentUser ? currentUser.name : 'Log In'}
            </p>
            <img
              src={currentUser ? currentUser.avatar : avatar}
              alt="User avatar"
              className="header__avatar"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
