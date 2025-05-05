import ClothesSection from './ClothesSections';
import './Profile.css';
import SideBar from './SideBar';

function Profile() {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
        <img src="" alt="" />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection />
      </section>
    </div>
  );
}

export default Profile;
