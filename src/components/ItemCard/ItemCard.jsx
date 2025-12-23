import "./ItemCard.css";
import likeButton from "../../assets/like-button.png";

function ItemCard({ item, onCardClick, onCardLike, currentUser, isLoggedIn }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked =
    isLoggedIn &&
    currentUser &&
    item.likes &&
    item.likes.includes(currentUser._id);

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
          <img src={likeButton} alt="Like Button" />
        </button>
      )}
    </li>
  );
}

export default ItemCard;
