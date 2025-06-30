import './ItemCard.css';
import emptyHeart from '../../assets/empty-heart.svg';
import filledHeart from '../../assets/filled-heart.svg';
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked =
    currentUser && item.likes.some((id) => id === currentUser._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    if (!currentUser) return;

    onCardLike({ id: item._id, isLiked });
  };

  const likeButtonClass = `card__like-btn ${isLiked ? 'card__like-btn_active' : ''}`;

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>

        {currentUser && (
          <button
            className={likeButtonClass}
            onClick={handleLike}
            aria-label={isLiked ? 'Unlike' : 'Like'}
          >
            <img
              src={isLiked ? filledHeart : emptyHeart}
              alt="like icon"
              className="card__like-icon"
            ></img>
          </button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
