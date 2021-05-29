import React from "react";
import style from "./Items.module.scss";

interface NavItemProps {
  logo?: any;
  title: string;
  active?: boolean;
  outline?: boolean;
  expanded: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  title,
  active = false,
  logo,
  outline = false,
  expanded,
}) => {
  return (
    <li
      className={`${style.item} ${active ? style.active : ""}`}
      style={{ padding: !expanded ? "0.3rem 0" : "3px 0" }}
      data-title={!expanded ? title : ""}
    >
      <span className={`${style.logo} ${outline ? style.outline : ""}`}>
        {logo}
      </span>
      {expanded && <span>{title}</span>}
    </li>
  );
};

export default NavItem;
