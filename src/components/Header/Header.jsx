import './Header.css';
import logo from '../../assets/logo.svg';
import avatar from '../../assets/avatar.png';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { Link } from 'react-router-dom';

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  });
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Header Logo" className="header__logo" />
      </Link>

      <p className="header__date-and-loc">
        {currentDate}, {weatherData.city}
      </p>
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
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
        {/* <div className="header__user-container">
            <div className="header__username">{username}</div>
            {avatar ? (
              <img
                src={avatar || avatarDefault}
                alt="user avatar"
                className="header__avatar"
              />
            ) : (
              <span className="header__avatar header__avatar_none">
                {username?.toUpperCase().charAt(0) || ''}
              </span>
            )}
          </div> */}
      </Link>
    </header>
  );
}

export default Header;
