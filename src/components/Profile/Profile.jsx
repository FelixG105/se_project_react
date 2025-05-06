import ClothesSection from './ClothesSection';
import './Profile.css';
import SideBar from './SideBar';

function Profile({ onCardClick, onDelete, clothingItems }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
        <img src="" alt="" />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          onDelete={onDelete}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
