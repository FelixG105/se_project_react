import './ClothesSection.css';
import { useContext } from 'react';
import ItemCard from '../ItemCard/ItemCard';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function ClothesSection({
  onCardClick,
  onDelete,
  clothingItems,
  handleAddClick,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__options">
        <p className="clothes-section__title">Your Items</p>
        {clothingItems
          .filter((item) => item.owner === currentUser._id)
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                onDelete={onDelete}
                onCardLike={onCardLike}
              />
            );
          })}{' '}
        ? (
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__add-new"
        >
          {' '}
          + Add New
        </button>
        ) : null
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
                onCardLike={onCardLike}
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
