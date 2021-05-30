import {
  useTSlate,
  getPreventDefaultHandler,
  ELEMENT_UL,
  toggleList,
  someNode,
} from "@udecode/slate-plugins";

import React from "react";
import style from "./Body.module.scss";
import { ReactComponent as ListIcon } from "../../../Icons/unordered-list.svg";

interface ToolbarListButtonProps {
  type?: string;
}

const ToolbarListButton: React.FC<ToolbarListButtonProps> = ({
  type = ELEMENT_UL,
}) => {
  const editor = useTSlate();
  const active = !!editor?.selection && someNode(editor, { match: { type } });
  return (
    <button
      className={`${style.toolbarBtn} ${active ? style.active : ""}`}
      onMouseDown={
        editor &&
        getPreventDefaultHandler(toggleList, editor, {
          type,
        })
      }
    >
      <ListIcon />
    </button>
  );
};

export default ToolbarListButton;
