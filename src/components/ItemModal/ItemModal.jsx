import './ItemModal.css';
import close from '../../assets/close-white.png';
import { useState } from 'react';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  return (
    <>
      <div className={`modal ${activeModal === 'preview' && 'modal_opened'}`}>
        <div className="modal__content modal__content_type_image">
          <button
            onClick={onClose}
            type="button"
            className="modal__close modal__close_type_preview"
          >
            <img src={close} alt="close-button" />
          </button>
          <img src={card.link} alt={card.name} className="modal__image" />
          <div className="modal__footer">
            <h2 className="modal__footer-caption">{card.name}</h2>
            <p className="modal__footer-weather">Weather: {card.weather}</p>
            <button
              type="button"
              className="modal__delete-item"
              onClick={() => setConfirmDeleteOpen(true)}
            >
              Delete Item
            </button>
          </div>
        </div>
      </div>
      <ConfirmDeleteModal
        activeModal={confirmDeleteOpen ? 'confirm-delete' : ''}
        onClose={() => setConfirmDeleteOpen(false)}
        onDelete={() => {
          setConfirmDeleteOpen(false);
          onDelete(card._id);
          onClose();
        }}
      />
    </>
  );
}

export default ItemModal;
