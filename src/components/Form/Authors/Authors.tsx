import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import style from "./Authors.module.scss";

import { ReactComponent as AddIcon } from "../../../Icons/expand.svg";
import ChooseAuthor from "./ChooseAuthor";

export interface Author {
  img: string;
  name: string;
}
interface AuthorsProps {
  onChange: (authors: Author[]) => void;
}
const Authors: React.FC<AuthorsProps> = ({ onChange }) => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [showChoose, setShowChoose] = useState(false);

  const handleRemove = (e: any, author: Author) => {
    e.preventDefault();
    const filtered = authors.filter((a) => {
      if (author.name === a.name) {
        return false;
      } else {
        return true;
      }
    });
    setAuthors(filtered);
    onChange(filtered);
  };

  const showChooseAuthor = (e: any) => {
    e.preventDefault();
    setShowChoose(!showChoose);
  };
  return (
    <div className={style.container}>
      {authors.map((author, idx) => {
        return (
          <div className={style.authorImg} key={idx}>
            <img src={author.img} alt={author.name} />
            <button
              className={style.removeAuthor}
              onClick={(e) => handleRemove(e, author)}
            >
              <AiOutlineDelete />
            </button>
          </div>
        );
      })}
      <button className={style.addAuthor} onClick={showChooseAuthor}>
        <AddIcon />
      </button>
      {showChoose && (
        <ChooseAuthor
          callback={(author) => {
            setAuthors([...authors, author]);
            onChange([...authors, author]);
            setShowChoose(false);
          }}
          cancel={() => setShowChoose(false)}
        />
      )}
    </div>
  );
};

export default Authors;
