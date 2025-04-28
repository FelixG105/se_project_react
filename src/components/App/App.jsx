import { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import { coordinates, APIkey } from '../../utils/constants';

function App() {
  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { F: 999 },
    city: '',
  });
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});

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

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        // debugger;
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>
      <Footer />
      <ModalWithForm
        title="New Garment"
        buttonText="Add Garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{' '}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{' '}
          <input
            type="text"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              className="modal__radio-input "
              type="radio"
              name="weatherType"
              id="hot"
            />
            <span>Hot</span>
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              className="modal__radio-input "
              type="radio"
              name="weatherType"
              id="warm"
            />
            <span>Warm</span>
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              className="modal__radio-input "
              type="radio"
              name="weatherType"
              id="cold"
            />
            <span>Cold</span>
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
