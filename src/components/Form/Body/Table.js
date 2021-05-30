import React from "react";
import {
  Editor,
  Transforms,
  createEditor,
  Range,
  Element as SlateElement,
} from "slate";

const Table = ({ columns }) => {
  const columnArr = new Array(columns).fill(0);
  return (
    <table>
      <thead>
        <tr>
          {columnArr.map((_) => {
            <th>Header</th>;
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          {columnArr.map((_) => {
            <td></td>;
          })}
        </tr>
      </tbody>
    </table>
  );
};

const isTableActive = (editor) => {
  const [table] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "table",
  });
  return !!table;
};
const insertTable = (editor, columns) => {
  const table = {
    type: "table",
    columns,
  };
  Transforms.collapse(editor, { edge: "end" });
  Transforms.move(editor, {
    distance: 1,
    unit: "line",
  });
  const isCollapsed = selection && Range.isCollapsed(selection);
};

const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};
