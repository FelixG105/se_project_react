import './SideBar.css';
// import avatar from '../../assets/avatar.png';
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function SideBar() {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser.avatar}
        alt="Default-avatar"
      />
      <p className="sidebar__username">{currentUser.name}</p>
    </div>
  );
}

export default SideBar;
