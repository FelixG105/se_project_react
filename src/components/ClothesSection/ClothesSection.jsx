import './ClothesSection.css';
import { useContext } from 'react';
import ItemCard from '../ItemCard/ItemCard';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function ClothesSection({
  onCardClick,
  onDelete,
  clothingItems,
  handleAddClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__options">
        <p className="clothes-section__title">Your Items</p>
        {currentUser ? (
          <button
            onClick={handleAddClick}
            type="button"
            className="clothes-section__add-new"
          >
            {' '}
            + Add New
          </button>
        ) : null}
      </div>
      {currentUser ? (
        <ul className="clothes-section__items">
          {clothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                onDelete={onDelete}
              />
            );
          })}
        </ul>
      ) : (
        <p>Sign Up or Log In To View Your Items!</p>
      )}
    </div>
  );
}

export default ClothesSection;
