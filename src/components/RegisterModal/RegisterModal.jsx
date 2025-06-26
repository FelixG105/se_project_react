import './RegisterModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useEffect, useState } from 'react';

function RegisterModal({ onClose, isOpen, onRegisterModalSubmit, userError }) {
  
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterModalSubmit({ name, imageUrl, email, password });
  };

  useEffect(() => {
    if (isOpen && !userError) {
      setName('');
      setImageUrl('');
      setEmail('');
      setPassword('');
    }
  }, [isOpen, userError]);

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email{' '}
        <input
          type="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          required
          minLength="1"
          maxLength="30"
          onChange={handleEmailChange}
          value={email}
          autoComplete="email"
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{' '}
        <input
          type="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          required
          minLength="1"
          maxLength="30"
          onChange={handlePasswordChange}
          value={password}
          autoComplete="new-password"
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name{' '}
        <input
          type="text"
          className="modal__input"
          id="user-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__label">
        Image{' '}
        <input
          type="text"
          className="modal__input"
          id="avatarUrl"
          placeholder="Image URL"
          required
          minLength="1"
          onChange={handleImageChange}
          value={imageUrl}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
