import "./Header.css";
import logo from "../../assets/header__logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";

function Header({
  handleAddClick,
  onCreateModal,
  onRegisterModal,
  onLoginModal,
  onLogout,
  currentUser,
  isLoggedIn,
  weatherData,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  console.log("Header - isLoggedIn:", isLoggedIn, "currentUser:", currentUser);

  return (
    <header className="header">
      <NavLink to="/">
        <img src={logo} alt="Header Logo" className="header__logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={onCreateModal || handleAddClick}
        type="button"
        className="header__add-clothes-button"
      >
        + Add Clothes
      </button>

      {isLoggedIn ? (
        <div className="header__auth">
          <NavLink className="header__nav-link" to="/profile">
            <div className="header__user-container">
              <p className="header__username">
                {currentUser?.data?.name ?? "User"}
              </p>
              {currentUser?.data?.avatar ? (
                <img
                  src={currentUser.data.avatar}
                  alt={currentUser.data.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser?.data?.name?.[0]?.toUpperCase() ?? "U"}
                </div>
              )}
            </div>
          </NavLink>
          
        </div>
      ) : (
        <div className="header__auth">
          <button className="header__auth-btn" onClick={onRegisterModal}>
            Sign up
          </button>
          <button className="header__auth-btn" onClick={onLoginModal}>
            Log in
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
