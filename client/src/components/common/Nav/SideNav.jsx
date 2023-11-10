import { Link, useLocation } from "react-router-dom";

function SideNav({ items }) {
  const location = useLocation();

  return (
    <ul className="menu">
      {items.map((item, index) => (
        <li
          key={index}
          className={location.pathname === item.link ? "active" : ""}
        >
          <Link to={item.link}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
}

export default SideNav;
