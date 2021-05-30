import React from "react";
import {
  useTSlate,
  deleteTable,
  addRow,
  addColumn,
  deleteRow,
  deleteColumn,
} from "@udecode/slate-plugins";
// import { TablePluginOptions } from "@udecode/slate-plugins-table";
import { SPEditor } from "@udecode/slate-plugins-core";
import style from "./Body.module.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface TableElementProps {
  children: React.ReactNode;
}

const TableElement: React.FC<TableElementProps> = ({ children }) => {
  const editor = useTSlate();

  const handleMouseDown = (
    transform: (editor: SPEditor, options: { header?: boolean }) => void,
    e: any
  ) => {
    editor && transform(editor, { header: true });
  };
  return (
    <div className={style.tableContainer}>
      <table className={style.tableElement}>
        <tbody>{children}</tbody>
      </table>
      <div className={style.tableToolbar} contentEditable={false}>
        <div className={style.topLeft}>
          <button onMouseDown={(e) => handleMouseDown(deleteTable, e)}>
            <AiOutlineDelete />
          </button>
        </div>
        <div className={style.bottomLeft}>
          <button onMouseDown={(e) => handleMouseDown(addColumn, e)}>
            <IoAddCircleOutline /> Column
          </button>
          <button onMouseDown={(e) => handleMouseDown(deleteColumn, e)}>
            <IoRemoveCircleOutline /> Column
          </button>
          <button onMouseDown={(e) => handleMouseDown(addRow, e)}>
            <IoAddCircleOutline /> Row
          </button>
          <button onMouseDown={(e) => handleMouseDown(deleteRow, e)}>
            <IoRemoveCircleOutline /> Row
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableElement;
