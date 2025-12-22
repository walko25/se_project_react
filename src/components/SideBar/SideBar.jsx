import "./SideBar.css";
import avatar from "../../assets/avatar.png";
import currentUser from "../../contexts/CurrentUserContext";

export default function SideBar({ onEditProfileModal }) {
  const avatarDefault = currentUser.avatar || avatar;
  const username = currentUser.username;
  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar__profile">
          <p className="sidebar__user-name">{username}</p>
          <img
            src={avatarDefault}
            alt="User Avatar"
            className="sidebar__avatar"
          />
          <button className="sidebar__edit-button" onClick={onEditProfileModal}>
            Edit profile
          </button>
        </div>
      </div>
    </aside>
  );
}
