import './ModalWithForm.css';
import close from '../../assets/close-grey.png';

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  altBtnText,
  onAltBtnClick,
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
          <div className="modal__button-group">
            <button className="modal__submit" type="submit">
              {buttonText}
            </button>
            {altBtnText && onAltBtnClick && (
              <button
                className="modal__alt-btn"
                type="button"
                onClick={onAltBtnClick}
              >
                {altBtnText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
