import ClothesSection from '../ClothesSection/ClothesSection';
import './Profile.css';
import SideBar from '../SideBar/SideBar';

function Profile({
  onCardClick,
  onDelete,
  clothingItems,
  handleAddClick,
  onCardLike,
  openEditModal,
  handleSignOut,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar openEditModal={openEditModal} handleSignOut={handleSignOut} />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          onDelete={onDelete}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
