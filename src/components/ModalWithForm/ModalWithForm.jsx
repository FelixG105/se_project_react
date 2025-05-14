import './ModalWithForm.css';
import close from '../../assets/close-grey.png';

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div className="modal__content modal__content_type_form">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          className="modal__close modal__close_type_form"
        >
          <img src={close} alt="close button" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
