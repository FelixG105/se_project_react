import './Header.css';
import logo from '../../assets/logo.svg';
import avatar from '../../assets/avatar.png';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Header({
  handleAddClick,
  weatherData,
  handleSignOut,
  setActiveModal,
}) {
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
        {currentUser ? (
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
        ) : (
          <button
            onClick={() => setActiveModal('register')}
            type="button"
            className="header__signup"
          >
            Sign Up
          </button>
        )}
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">
              {currentUser ? (
                currentUser.name
              ) : (
                <button
                  type="button"
                  className="header__login"
                  onClick={() => setActiveModal('login')}
                >
                  Log In
                </button>
              )}
            </p>
            <img
              src={currentUser ? currentUser.avatar : avatar}
              alt="User avatar"
              className="header__avatar"
            />
          </div>
        </Link>
        <Link to="/" className="header__link">
          <div className="header__user-container">
            {currentUser ? (
              <button
                type="button"
                className="header__signout"
                onClick={() => handleSignOut()}
              >
                Sign Out
              </button>
            ) : null}
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
