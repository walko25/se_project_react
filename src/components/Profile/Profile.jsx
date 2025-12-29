import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({
  clothingItems,
  onCardClick,
  handleAddClick,
  onEditProfileModal,
  currentUser,
  onCardLike,
  onLogout,
  isLoggedIn,
}) {
  return (
    <section className="profile">
      <SideBar
        onEditProfileModal={onEditProfileModal}
        handleLogout={onLogout}
      />
      <ClothesSection
        onCardClick={onCardClick}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        onCardLike={onCardLike}
      />
    </section>
  );
}
