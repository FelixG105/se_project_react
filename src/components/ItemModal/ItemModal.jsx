import './ItemModal.css';
import close from '../../assets/close-white.png';

function ItemModal({ activeModal, onClose, card }) {
  return (
    <div className={`modal ${activeModal === 'preview' && 'modal_opened'}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_preview"
        >
          <img src={close} alt="close-button" />
        </button>
        <img src={card.link} alt="" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__footer-caption">{card.name}</h2>
          <p className="modal__footer-weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
