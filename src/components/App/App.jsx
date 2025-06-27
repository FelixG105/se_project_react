import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import ItemModal from '../ItemModal/ItemModal.jsx';
import { getWeather, filterWeatherData } from '../../utils/weatherApi.js';
import { coordinates, APIkey } from '../../utils/constants.js';
import CurrentTempUnitContext from '../../contexts/CurrentTempUnitContext.jsx';
import CurrentUserContext from '../../contexts/CurrentUserContext.jsx';
import AddItemModal from '../AddItemModal/AddItemModal.jsx';
import RegisterModal from '../RegisterModal/RegisterModal.jsx';
import { defaultClothingItems } from '../../utils/constants.js';
import Profile from '../Profile/Profile.jsx';
import { api } from '../../utils/api.js';
import LogInModal from '../LoginModal/LoginModal.jsx';
import { signIn, signUp, signOut, validateToken } from '../../utils/auth.js';
import ProtectedRoute from '../ProtectedRoute.jsx';

function App() {
  console.log('loading');
  console.log('TESTING');
  console.log('TESTING 2');
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
  const [currentUser, setCurrentUser] = useState(false);
  const [userError, setUserError] = useState('');
  const navigate = useNavigate();

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

  console.log(clothingItems);

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem('jwt');
    api
      .postItems({ name, imageUrl, weather, token })
      .then((newItem) => {
        // Use the returned item from the server, which includes _id
        setClothingItems([newItem.data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

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

  const handleLogIn = ({ email, password }) => {
    return signIn({ email, password })
      .then((user) => {
        if (user.token) {
          localStorage.setItem('jwt', user.token);
        }
        setCurrentUser(user);
        closeActiveModal();
        navigate('/profile');
      })
      .catch(console.error);
  };

  const handleSignOut = () => {
    signOut()
      .then(() => {
        localStorage.removeItem('jwt');
        navigate('/');
        setCurrentUser(false);
      })
      .catch(console.error);
  };

  const handleDeleteCard = () => {
    const token = localStorage.getItem('jwt');
    console.log('Token from local stoarge:', token);
    return api
      .deleteItems({ _id: selectedCard._id, token })
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem('jwt');
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
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
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      validateToken(token)
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem('jwt');
          setCurrentUser(false);
        });
    } else {
      setCurrentUser(false);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleSignOut={handleSignOut}
              handleLogIn={handleLogIn}
              setActiveModal={setActiveModal}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      onCardClick={handleCardClick}
                      onDelete={handleDeleteCard}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      currentUser={currentUser}
                    />
                  </ProtectedRoute>
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
            onLogInModalSubmit={handleLogIn}
            userError={userError}
          />
        </div>
      </CurrentTempUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
