import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ItemModal from '../ItemModal/ItemModal';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import { coordinates, APIkey } from '../../utils/constants';
import CurrentTempUnitContext from '../../contexts/CurrentTempUnitContext';
import CurrentUserContext from '../../contexts/CurrentUserContext.jsx';
import AddItemModal from '../AddItemModal/AddItemModal';
import RegisterModal from '../RegisterModal/RegisterModal.jsx';
import { defaultClothingItems } from '../../utils/constants.js';
import Profile from '../Profile/Profile.jsx';
import {
  getItems,
  postItems,
  deleteItems,
  signUp,
  signIn,
} from '../../utils/api.js';
import LogInModal from '../LoginModal/LoginModal.jsx';

function App() {
  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { F: 999, C: 999 },
    city: '',
    condition: '',
    isDay: true,
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState('F');
  const [currentUser, setCurrentUser] = useState('');
  const [userError, setUserError] = useState('');

  const handleToggleSwitchChange = () => {
    setCurrentTempUnit(currentTempUnit === 'F' ? 'C' : 'F');
  };

  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal('add-garment');
  };

  const closeActiveModal = () => {
    setActiveModal('');
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    postItems({ name, imageUrl: imageUrl, weather })
      .then((newItem) => {
        // Use the returned item from the server, which includes _id
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  // const handleSignIn = ({ email, password }) => {
  //   signIn({ email, password }).then((user) => {
  //     setCurrentUser(user);
  //   });
  // };

  // const handleSignOut = ({ email, password }) => {
  //   signOut({ email, password });
  // };

  const handleRegisterModalSubmit = ({ name, imageUrl, email, password }) => {
    signUp({ name, imageUrl, email, password })
      .then(() => {
        signIn({ email, password })
          .then((user) => {
            setCurrentUser(user);
            closeActiveModal();
          })
          .catch(console.error);
      })
      .catch((userError) => {
        console.error(userError);
        setUserError(userError.message);
      });
  };

  const handleLogInModalSubmit = ({ email, password }) => {
    signIn({ email, password })
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteCard = () => {
    deleteItems(selectedCard._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    onCardClick={handleCardClick}
                    onDelete={handleDeleteCard}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    currentUser={currentUser}
                  />
                }
              />
            </Routes>
          </div>
          <Footer />

          <AddItemModal
            isOpen={activeModal === 'add-garment'}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleDeleteCard}
          />
          <RegisterModal
            isOpen={activeModal === 'register'}
            onClose={closeActiveModal}
            onRegisterModalSubmit={handleRegisterModalSubmit}
            userError={userError}
          />
          <LogInModal
            isOpen={activeModal === 'login'}
            onClose={closeActiveModal}
            onLogInModalSubmit={handleLogInModalSubmit}
            userError={userError}
          />
        </div>
      </CurrentTempUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
