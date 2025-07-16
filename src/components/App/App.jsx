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
import Profile from '../Profile/Profile.jsx';
import { api } from '../../utils/api.js';
import LogInModal from '../LoginModal/LoginModal.jsx';
import {
  signIn,
  signUp,
  signOut,
  validateToken,
  updateUser,
} from '../../utils/auth.js';
import EditProfileModal from '../EditProfileModal/EditProfileModal.jsx';
import ProtectedRoute from '../ProtectedRoute.jsx';

function App() {
  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { F: 999, C: 999 },
    city: '',
    condition: '',
    isDay: true,
  });

  const [clothingItems, setClothingItems] = useState([]);

  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState('F');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
    setUserError('');
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem('jwt');
    return api
      .postItems({ name, imageUrl, weather, token })
      .then((newItem) => {
        setClothingItems([newItem.data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegisterModalSubmit = ({ name, imageUrl, email, password }) => {
    setUserError('');
    signUp({ name, imageUrl, email, password })
      .then(() => {
        return signIn({ email, password });
      })
      .then(({ token }) => {
        if (token) {
          localStorage.setItem('jwt', token);
          return validateToken(token);
        }
        throw new Error('No token received on sign in');
      })
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
        setUserError(err.message);
      });
  };

  const handleSignUpClick = () => {
    setActiveModal('register');
  };

  const handleLogInClick = () => {
    setActiveModal('login');
  };

  const handleLogIn = ({ email, password }) => {
    return signIn({ email, password })
      .then(({ token }) => {
        if (token) {
          localStorage.setItem('jwt', token);
        }
        return validateToken(token);
      })
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
        navigate('/profile');
      })

      .catch(console.error);
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem('jwt');
    console.log('Updating user with:', { name, avatar, token });
    updateUser({ name, avatar, token })
      .then((updatedUser) => {
        console.log('Updated user received:', updatedUser);
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((err) => {
        console.error('Failed to update user:', err);
      });
  };

  const handleSignOut = () => {
    signOut()
      .then(() => {
        navigate('/');
        setCurrentUser(null);
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
      ? api
          .addCardLike({ _id: id, token })
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike({ _id: id, token })
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
          setCurrentUser(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setCurrentUser(null);
      setIsLoading(false);
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
              handleSignUpClick={handleSignUpClick}
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
                  <ProtectedRoute
                    currentUser={currentUser}
                    isLoading={isLoading}
                  >
                    <Profile
                      onCardClick={handleCardClick}
                      onDelete={handleDeleteCard}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      currentUser={currentUser}
                      onCardLike={handleCardLike}
                      openEditModal={() => setActiveModal('edit-profile')}
                      handleSignOut={handleSignOut}
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
            handleLogInClick={handleLogInClick}
          />
          <LogInModal
            isOpen={activeModal === 'login'}
            onClose={closeActiveModal}
            onLogInModalSubmit={handleLogIn}
            userError={userError}
            handleSignUpClick={handleSignUpClick}
          />
          <EditProfileModal
            isOpen={activeModal === 'edit-profile'}
            onClose={closeActiveModal}
            currentUser={currentUser}
            onUpdateUser={handleUpdateUser}
          />
        </div>
      </CurrentTempUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
