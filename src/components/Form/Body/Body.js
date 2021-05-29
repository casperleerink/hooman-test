import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import isHotkey from "is-hotkey";
import isUrl from "is-url";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Range,
  Element as SlateElement,
} from "slate";
// import { withHistory } from "slate-history";
import { withTables } from "./util.js";

import { Toolbar } from "./Toolbar";
import style from "./Body.module.scss";
import { ReactComponent as ListIcon } from "../../../Icons/unordered-list.svg";
import LinkInput from "./LinkInput.js";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+k": "link",
};

const LIST_TYPES = ["bulleted-list"];

const Body = ({ value, onChange }) => {
  // const [value, setValue] = useState(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withTables(withLinks(withReact(createEditor()))),
    []
  );

  return (
    <div style={{ position: "relative" }}>
      <Slate editor={editor} value={value} onChange={(val) => onChange(val)}>
        <Toolbar className={style.toolbar}>
          <p className={style.label}>Body</p>
          <MarkButton format="bold" icon="bold" />
          <BlockButton format="heading-one" icon="H2" />
          <BlockButton format="heading-two" icon="H3" />
          <LinkButton icon="Link" />
          <BlockButton format="table" icon="Table" />
          <BlockButton format="bulleted-list" icon={<ListIcon />} />
        </Toolbar>
        <Editable
          className={style.container}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Good luck..."
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </div>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
      ),
    split: true,
  });
  const newProperties = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h2 {...attributes}>{children}</h2>;
    case "heading-two":
      return <h3 {...attributes}>{children}</h3>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "link":
      return (
        <a {...attributes} href={element.url}>
          {children}
        </a>
      );
    case "table":
      return (
        <table>
          <tbody {...attributes}>{children}</tbody>
        </table>
      ); //TO DO, HOW TO ADD TABLE ROWS AND COLUMNS?
    case "table-row":
      return <tr {...attributes}>{children}</tr>;
    case "table-cell":
      return <td {...attributes}>{children}</td>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <button
      className={isBlockActive(editor, format) ? style.active : ""}
      onClick={(e) => e.preventDefault()}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <button
      className={isMarkActive(editor, format) ? style.active : ""}
      onClick={(e) => e.preventDefault()}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </button>
  );
};

const LinkButton = ({ icon }) => {
  const editor = useSlate();
  const [dialog, setDialog] = useState(false);
  const selectionRef = useRef(null);
  useEffect(() => {
    if (dialog && editor.selection) {
      selectionRef.current = editor.selection;
    }
  }, [dialog, editor.selection]);
  const handleUrl = (url) => {
    setDialog(false);
    if (!url) return;
    editor.selection = selectionRef.current;
    insertLink(editor, url);
  };
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={(e) => e.preventDefault()}
        className={isBlockActive(editor, "link") ? style.active : ""}
        onMouseDown={(event) => {
          event.preventDefault();
          if (isLinkActive(editor)) {
            unwrapLink(editor);
          } else {
            setDialog(true);
            // const url = window.prompt("Enter the URL of the link:");
            //   if (!url) return;
            //   insertLink(editor, url);
          }
        }}
      >
        {icon}
      </button>
      {dialog && (
        <LinkInput
          className={style.linkInput}
          callback={handleUrl}
          cancel={() => setDialog(false)}
        />
      )}
    </div>
  );
};

const withLinks = (editor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) => {
    return element.type === "link" ? true : isInline(element);
  };

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
  return !!link;
};

const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
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

export default Body;
