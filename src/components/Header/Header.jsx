import "./Header.css";
import logo from "../../assets/header__logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

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
              <p className="header__username">{currentUser?.name ?? "User"}</p>
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="Header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser?.name?.[0]?.toUpperCase() ?? "U"}
                </div>
              )}
            </div>
          </NavLink>
          <button type="button" className="header__logout" onClick={onLogout}>
            Log out
          </button>
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
