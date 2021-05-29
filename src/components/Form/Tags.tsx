import React from "react";
import { WithContext as ReactTags } from "react-tag-input";
import "./react-tags.scss";
const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
interface Tag {
  id: string;
  text: string;
}

interface TagProps {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}

const Tags: React.FC<TagProps> = ({ tags, setTags }) => {
  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, idx) => idx !== i));
  };
  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag]);
  };

  return (
    <div className="react-tags-container">
      <ReactTags
        tags={tags}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        delimiters={delimiters}
        placeholder=""
        allowDragDrop={false}
      />
    </div>
  );
};

export default Tags;
