import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike, currentUser, isLoggedIn }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked = item.likes.some((id) => id === currentUser._id);

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      {isLoggedIn && (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLike}
          type="button"
        >
          ♥
        </button>
      )}
    </li>
  );
}

export default ItemCard;
