import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';

function ClothesSection({
  onCardClick,
  onDelete,
  clothingItems,
  handleAddClick,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__options">
        <p className="clothes-section__title">Your Items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__add-new"
        >
          {' '}
          + Add New
        </button>
      </div>
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
    </div>
  );
}

export default ClothesSection;
