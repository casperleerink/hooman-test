import { useState } from "react";
import style from "./Body.module.scss";
import "./Body.scss"; //for node styling
import {
  SlatePlugins,
  TNode,
  createReactPlugin,
  createHistoryPlugin,
  createParagraphPlugin,
  createHeadingPlugin,
  createBoldPlugin,
  createItalicPlugin,
  createUnderlinePlugin,
  ELEMENT_PARAGRAPH,
  ELEMENT_H2,
  ELEMENT_H3,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  createSlatePluginsComponents,
  createSlatePluginsOptions,
  createKbdPlugin,
  createTablePlugin,
  createLinkPlugin,
  HeadingToolbar,
  ToolbarLink,
  insertTable,
  ToolbarTable,
  ToolbarMark,
  ToolbarElement,
} from "@udecode/slate-plugins";

const pluginsBasic = [
  createKbdPlugin(),
  // editor
  createReactPlugin(), // withReact
  createHistoryPlugin(), // withHistory

  // elements
  createParagraphPlugin(), // paragraph element
  createHeadingPlugin(), // heading elements

  // marks
  createBoldPlugin(), // bold mark
  createItalicPlugin(), // italic mark
  createUnderlinePlugin(), // underline mark
  createLinkPlugin(),
  createTablePlugin(),
];
const editableProps = {
  placeholder: "Type…",
  // style: {
  //   fontFamily: "SupremeLLWeb-Light",
  //   padding: "1rem",
  //   backgroundColor: "#1e2735",
  //   borderRadius: "1rem",
  //   marginTop: "1rem",
  //   overflow: "scroll",
  //   maxHeight: "18.75rem",
  // },
  className: style.container,
};

// Quick helper to create a block element with (marked) text
export const createElement = (
  text = "",
  {
    type = ELEMENT_PARAGRAPH,
    mark,
  }: {
    type?: string;
    mark?: string;
  } = {}
) => {
  const leaf: any = { text };
  if (mark) {
    leaf[mark] = true;
  }

  return {
    type,
    children: [leaf],
  };
};
const initialValue = [
  createElement("🧱 Elements", { type: ELEMENT_H2 }),
  createElement("🔥 Basic Elements", { type: ELEMENT_H2 }),
  createElement("These are the most common elements, known as blocks:"),
  createElement("Heading 2", { type: ELEMENT_H2 }),
  createElement("Heading 3", { type: ELEMENT_H3 }),
  createElement("This text is bold.", { mark: MARK_BOLD }),
  createElement("This text is italic.", { mark: MARK_ITALIC }),
  createElement("This text is underlined.", {
    mark: MARK_UNDERLINE,
  }),
];

const components = createSlatePluginsComponents();
const options = createSlatePluginsOptions();

const Body: React.FC = () => {
  const [value, setValue] = useState<TNode<{}>[] | null>(null);
  return (
    <SlatePlugins
      editableProps={editableProps}
      initialValue={initialValue}
      onChange={(newValue) => {
        setValue(newValue);
      }}
      plugins={pluginsBasic}
      components={components}
      options={options}
    >
      <HeadingToolbar className="toolbar">
        <p className={style.toolbarLabel}>Body</p>
        <ToolbarElement
          type={ELEMENT_H2}
          icon={"H2"}
          className={style.toolbarBtn}
          as="button"
        />
        <ToolbarElement
          type={ELEMENT_H3}
          icon={"H3"}
          className={style.toolbarBtn}
          as="button"
        />
        <ToolbarMark
          type={MARK_BOLD}
          icon={"Bold"}
          className={style.toolbarBtn}
          as="button"
        />
        <ToolbarLink icon={"Link"} className={style.toolbarBtn} as="button" />
        <ToolbarTable
          icon={"Table"}
          transform={insertTable}
          className={style.toolbarBtn}
          as="button"
        />
      </HeadingToolbar>
    </SlatePlugins>
  );
};

export default Body;
