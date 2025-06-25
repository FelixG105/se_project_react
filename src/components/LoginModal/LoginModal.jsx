import './LoginModal.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LogInModal({ onClose, isOpen, onLogInModalSubmit, userError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogInModalSubmit({ email, password })
      .then((res) => {
        navigate('/profile');
        onClose();
        return res.ok;
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (isOpen && !userError) {
      setEmail('');
      setPassword('');
    }
  }, [isOpen, userError]);

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email{' '}
        <input
          type="email"
          className="modal__input"
          id="email-address"
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
          id="password"
          placeholder="Password"
          required
          minLength="1"
          maxLength="30"
          onChange={handlePasswordChange}
          value={password}
          autoComplete="current-password"
        />
      </label>
    </ModalWithForm>
  );
}

export default LogInModal;
