import "./SideBar.css";
import avatar from "../../assets/avatar.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ onEditProfileModal, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const avatarDefault = currentUser?.data?.avatar || avatar;
  const username = currentUser?.data?.name;
  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar__profile">
          <div className="sidebar__user">
            <p className="sidebar__user-name">{username}</p>
            <img
              src={avatarDefault}
              alt="User Avatar"
              className="sidebar__avatar"
            />
          </div>
          <button className="sidebar__button" onClick={onEditProfileModal}>
            Edit profile
          </button>
          <button
            type="button"
            className="sidebar__button"
            onClick={() => handleLogout()}
          >
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}
