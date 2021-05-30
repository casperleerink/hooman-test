import React from "react";
import { useTSlate } from "@udecode/slate-plugins";
import {
  getPreventDefaultHandler,
  isMarkActive,
  toggleMark,
} from "@udecode/slate-plugins-common";

import style from "./Body.module.scss";

interface ToolbarElementButtonProps {
  type: string;
  icon: string | React.FC;
}

const ToolbarMarkButton: React.FC<ToolbarElementButtonProps> = ({
  type,
  icon,
}) => {
  const editor = useTSlate();
  const active = !!editor?.selection && isMarkActive(editor, type);
  return (
    <button
      className={`${style.toolbarBtn} ${active ? style.active : ""}`}
      onMouseDown={
        editor ? getPreventDefaultHandler(toggleMark, editor, type) : undefined
      }
    >
      {icon}
    </button>
  );
};

export default ToolbarMarkButton;
