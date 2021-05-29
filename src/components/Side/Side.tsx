import React, { useState } from "react";
import NavItems from "./NavItems";
import style from "./Side.module.scss";

import { ReactComponent as Menu } from "../../Icons/burger-menu.svg";
import { ReactComponent as CaretLeft } from "../../Icons/caret-left.svg";
import { ReactComponent as Logo } from "../../Icons/hooman-studio-logo.svg";
import { ReactComponent as Logout } from "../../Icons/Logout.svg";

const Side: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  // const headerRef = useRef<HTMLElement | null>(null);
  // useEffect(() => {
  //   const onScroll = () => {
  //     if (headerRef.current && window.innerWidth < 800) {
  //       const offset = headerRef.current.offsetTop;
  //       console.log(window.scrollY);
  //       if (window.scrollY > offset) {
  //         headerRef.current.style.marginTop = `${window.scrollY - offset}px`;
  //       } else {
  //         headerRef.current.style.marginTop = "0px";
  //       }
  //     }
  //   };
  //   const scrollListener = document.addEventListener("scroll", onScroll);

  //   return () => document.removeEventListener("scroll", onScroll);
  // }, [headerRef.current]);
  return (
    <header className={`${style.header} ${!expanded ? style.small : ""}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className={style.menuButton}
      >
        {expanded ? <CaretLeft /> : <Menu />}
      </button>
      <NavItems expanded={expanded} />
      {expanded && (
        <a href="https://hoomanstudio.com/" className={style.hooman}>
          <Logo />
        </a>
      )}
      <a href="/" className={expanded ? style.logoutExp : style.logout}>
        <Logout />
      </a>
    </header>
  );
};

export default Side;
