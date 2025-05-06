import './ConfirmDeleteModal.css';

function ConfirmDeleteModal({ activeModal, onClose, onDelete }) {
  return (
    <div
      className={`modal ${activeModal === 'confirm-delete' && 'modal_opened'}`}
    >
      <div className="modal__confirm-delete">
        <div className="modal__confirm-delete-content">
          <h2 className="modal__confirm-delete_message">
            Are you sure you want to delete this item? This action is
            irreversable!
          </h2>
          <button
            type="button"
            className="modal__confirm-delete_yes"
            onClick={onDelete}
          >
            Yes, Delete Item
          </button>
          <button
            className="modal__confirm-delete_cancel"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
