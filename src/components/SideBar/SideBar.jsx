import "./SideBar.css";
import avatar from "../../assets/avatar.png";

export default function SideBar() {
  const avatarDefault = avatar;
  const username = "Terrence Tegegne";
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
        </div>
      </div>
    </aside>
  );
}
