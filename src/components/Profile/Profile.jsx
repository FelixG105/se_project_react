import ClothesSection from '../ClothesSection/ClothesSection';
import './Profile.css';
import SideBar from '../SideBar/SideBar';

function Profile({ onCardClick, onDelete, clothingItems, handleAddClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          onDelete={onDelete}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
