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
          .filter((item) => {
            console.log("All clothing items:", clothingItems);
            console.log("Current user for filtering:", currentUser);
            const itemOwner = item.owner?._id || item.owner;
            const userId =
              currentUser?.data?._id || currentUser?._id || currentUser?.id;
            return itemOwner === userId;
          })
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
