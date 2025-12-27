import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
  clothingItems,
  onCardClick,
  handleAddClick,
  currentUser,
  onCardLike,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p>Your Items:</p>
        <button
          className="clothes-section__add_button"
          onClick={handleAddClick}
        >
          {" "}
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems
          .filter((item) => item.owner === currentUser?._id)
          .map((item) => {
            return (
              <ItemCard
                key={item._id ?? item.id}
                item={item}
                onCardLike={onCardLike}
                onCardClick={onCardClick}
                // isLoggedIn={isLoggedIn}
                currentUser={currentUser}
              />
            );
          })}
      </ul>
    </div>
  );
}
