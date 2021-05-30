import {
  getPreventDefaultHandler,
  someNode,
} from "@udecode/slate-plugins-common";
import { useTSlate } from "@udecode/slate-plugins";
import { getSlatePluginType } from "@udecode/slate-plugins-core";
import { ELEMENT_TABLE } from "@udecode/slate-plugins-table";
// import { TablePluginOptions } from "@udecode/slate-plugins-table";
import { SPEditor } from "@udecode/slate-plugins-core";
import style from "./Body.module.scss";

interface ToolbarTableProps {
  icon: string | React.FC;
  transform: (editor: SPEditor, options: { header?: boolean }) => void;
}
const ToolbarTableButton = ({ icon, transform }: ToolbarTableProps) => {
  const editor = useTSlate();
  const type = getSlatePluginType(editor, ELEMENT_TABLE);
  const active =
    !!editor?.selection &&
    someNode(editor, {
      match: { type },
    });
  return (
    <button
      className={`${style.toolbarBtn} ${active ? style.active : ""}`}
      onMouseDown={
        !!type && editor
          ? getPreventDefaultHandler(transform, editor, { header: true })
          : undefined
      }
    >
      {icon}
    </button>
  );
};

export default ToolbarTableButton;
