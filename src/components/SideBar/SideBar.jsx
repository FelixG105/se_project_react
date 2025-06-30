import './SideBar.css';
// import avatar from '../../assets/avatar.png';
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function SideBar({ openEditModal, handleSignOut }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt="Default-avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__buttons">
        {' '}
        <button className="sidebar__edit-btn" onClick={openEditModal}>
          Edit Profile
        </button>
        <button className="sidebar__logout-btn" onClick={handleSignOut}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
