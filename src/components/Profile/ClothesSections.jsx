import ItemCard from '../ItemCard/ItemCard';
import { defaultClothingItems } from '../../utils/constants';

function ClothesSection() {
  return (
    <div className="clothes-section">
      <div>
        <p>Your Items</p>\<button> + Add New</button>
      </div>
      <div>
        <ul className="cards__list">
          {defaultClothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                // TODO - Pass as prop
                // onCardClick={handleCardClick}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ClothesSection;
