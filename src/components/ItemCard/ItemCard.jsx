import './ItemCard.css';
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    if (!currentUser) return;
    const isLiked = item.likes.some((id) => id === currentUser._id);
    onCardLike({ id: item._id, isLiked });
  };

  const isLiked =
    currentUser && item.likes.some((id) => id === currentUser._id);
  const likeButtonClass = `card__like-btn ${isLiked ? 'card__like-btn_active' : ''}`;

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      {currentUser && (
        <button className={likeButtonClass} onClick={handleLike}></button>
      )}
    </li>
  );
}

export default ItemCard;
