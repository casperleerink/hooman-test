import React, { useRef } from "react";
import { Author } from "./Authors";
import style from "./Authors.module.scss";
import { useOutsideAlerter } from "../SlatePluginBody/ToolbarLinkButton";

interface ChooseAuthorProps {
  authorsList: Author[];
  callback: (author: Author) => void;
  cancel: () => void;
}

// const availableAuthors: Author[] = [
//   {
//     img: "https://miro.medium.com/max/3150/1*PCGeDhSWKtR3ynypK9sT-Q.jpeg",
//     name: "Casper Leerink",
//   },
//   {
//     img: "https://media-exp1.licdn.com/dms/image/C4D03AQEgtALLHUJhLA/profile-displayphoto-shrink_400_400/0/1618013106261?e=1627516800&v=beta&t=zMng-BKZ_3Uho3rzLjkOqBGVG_F_f_sADQivmKLmvHk",
//     name: "Hooman Jenabian",
//   },
// ];

const ChooseAuthor: React.FC<ChooseAuthorProps> = ({
  authorsList,
  callback,
  cancel,
}) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, cancel);
  return (
    <div className={style.chooseAuthor} ref={wrapperRef}>
      {authorsList.map((author) => {
        return (
          <button
            key={author.name}
            onClick={(e) => {
              e.preventDefault();
              callback(author);
            }}
            className={style.authorBlock}
          >
            <div className={style.authorBlockImg}>
              <img src={author.img} alt={author.name} />
            </div>
            <div className={style.authorBlockName}>
              <p>{author.name}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ChooseAuthor;
