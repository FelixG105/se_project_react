import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useEffect, useState } from 'react';

function LogInModal({
  onClose,
  isOpen,
  onLogInModalSubmit,
  userError,
  handleSignUpClick,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogInModalSubmit({ email, password })
      .then(() => {
        onClose();
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
      altBtnText="Sign Up"
      onAltBtnClick={handleSignUpClick}
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
