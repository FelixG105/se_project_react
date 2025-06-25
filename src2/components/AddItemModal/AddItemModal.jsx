import './AddItemModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useState } from 'react';

function AddItemModal({ onClose, isOpen, onAddItemModalSubmit }) {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [weather, setWeather] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({ name, imageUrl, weather });
    // empty the inputs
    setName('');
    setImageUrl('');
    setWeather('');
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{' '}
        <input
          type="text"
          className="modal__input"
          id="clothing-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{' '}
        <input
          type="text"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
          minLength="1"
          onChange={handleImageChange}
          value={imageUrl}
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
            value="hot"
            onChange={handleWeatherChange}
            checked={weather === 'hot'}
          />
          <span>Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio-input "
            type="radio"
            name="weatherType"
            id="warm"
            value="warm"
            onChange={handleWeatherChange}
            checked={weather === 'warm'}
          />
          <span>Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio-input "
            type="radio"
            name="weatherType"
            id="cold"
            value="cold"
            onChange={handleWeatherChange}
            checked={weather === 'cold'}
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
