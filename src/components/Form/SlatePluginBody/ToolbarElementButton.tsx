import React from "react";
import { useTSlate } from "@udecode/slate-plugins";
import {
  getPreventDefaultHandler,
  someNode,
  toggleNodeType,
} from "@udecode/slate-plugins-common";

import style from "./Body.module.scss";

interface ToolbarElementButtonProps {
  type: string;
  icon: string | React.FC;
}

const ToolbarElementButton: React.FC<ToolbarElementButtonProps> = ({
  type,
  icon,
}) => {
  const editor = useTSlate();
  const active = !!editor?.selection && someNode(editor, { match: { type } });
  return (
    <button
      className={`${style.toolbarBtn} ${active ? style.active : ""}`}
      onMouseDown={
        editor &&
        getPreventDefaultHandler(toggleNodeType, editor, {
          activeType: type,
        })
      }
    >
      {icon}
    </button>
  );
};

export default ToolbarElementButton;
