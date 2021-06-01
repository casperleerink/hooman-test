import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import style from "./Authors.module.scss";

import { ReactComponent as AddIcon } from "../../../Icons/expand.svg";
import ChooseAuthor from "./ChooseAuthor";
import axios from "axios";

export interface Author {
  img: string;
  name: string;
}
interface AuthorsProps {
  authors: Author[];
  setAuthors: (authors: Author[]) => void;
}
const Authors: React.FC<AuthorsProps> = ({ authors, setAuthors }) => {
  const [showChoose, setShowChoose] = useState(false);
  const [allAuthors, setAllAuthors] = useState([]);
  useEffect(() => {
    //get 20 random authors from randomuser api
    axios
      .get("https://randomuser.me/api/?results=20")
      .then((response) => {
        const results = response.data.results.map((user: any) => {
          return {
            img: user.picture.medium,
            name: `${user.name.first} ${user.name.last}`,
          };
        });
        setAllAuthors(results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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
          authorsList={allAuthors}
          callback={(author) => {
            setAuthors([...authors, author]);
            setShowChoose(false);
          }}
          cancel={() => setShowChoose(false)}
        />
      )}
    </div>
  );
};

export default Authors;
