import './ClothesSection.css';
import ItemCard from '../ItemCard/ItemCard';
import { defaultClothingItems } from '../../utils/constants';

function ClothesSection({ onCardClick }) {
  return (
    <div className="clothes-section">
      <div>
        <p className="clothes-section__title">Your Items</p>
        <button className="clothes-section__add-new"> + Add New</button>
      </div>
      <div>
        <ul className="clothes-section__items">
          {defaultClothingItems.map((item) => {
            return (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ClothesSection;
