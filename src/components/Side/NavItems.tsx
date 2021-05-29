import React from "react";
import NavItem from "./NavItem";
import style from "./Items.module.scss";

import { ReactComponent as NewsAndArticles } from "../../Icons/news-and-articles.svg";
import { ReactComponent as Lawyers } from "../../Icons/lawyers.svg";
import { ReactComponent as Vector } from "../../Icons/Vector.svg";
import { ReactComponent as UserLogo } from "../../Icons/3-User.svg";
import { ReactComponent as Category } from "../../Icons/Category.svg";
import { ReactComponent as Folder } from "../../Icons/Folder.svg";
import { ReactComponent as Expand } from "../../Icons/expand.svg";
interface INavItems {
  expanded: boolean;
}

const NavItems: React.FC<INavItems> = ({ expanded }) => {
  return (
    <ul className={style.container}>
      <NavItem
        title="News and articles"
        active={true}
        logo={<NewsAndArticles />}
        expanded={expanded}
      />
      <NavItem title="Lawyers" logo={<Lawyers />} expanded={expanded} />
      <NavItem title="Webinars" logo={<Vector />} expanded={expanded} />
      <NavItem title="Investments" logo={<Category />} expanded={expanded} />
      <NavItem
        title="Closed Investments"
        logo={<Category />}
        expanded={expanded}
      />
      {expanded ? (
        <hr className={style.line} />
      ) : (
        <hr className={style.smallLine} />
      )}
      <NavItem
        title="Read"
        active={true}
        logo={<Expand />}
        outline={true}
        expanded={expanded}
      />
      <NavItem
        title="Watch"
        logo={<Expand />}
        outline={true}
        expanded={expanded}
      />
      <NavItem
        title="Listen"
        logo={<Expand />}
        outline={true}
        expanded={expanded}
      />
      <NavItem
        title="Fundamentals"
        logo={<Expand />}
        outline={true}
        expanded={expanded}
      />
      <NavItem title="Authors" logo={<UserLogo />} expanded={expanded} />
      <NavItem title="Categories" logo={<Folder />} expanded={expanded} />
    </ul>
  );
};

export default NavItems;
