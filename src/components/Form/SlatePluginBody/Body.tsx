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
  ELEMENT_TABLE,
  ELEMENT_UL,
  ELEMENT_TD,
  MARK_BOLD,
  createSlatePluginsComponents,
  createSlatePluginsOptions,
  createKbdPlugin,
  createTablePlugin,
  createLinkPlugin,
  createListPlugin,
  createSoftBreakPlugin,
  createExitBreakPlugin,
  insertTable,
} from "@udecode/slate-plugins";
import ToolbarElementButton from "./ToolbarElementButton";
import ToolbarMarkButton from "./ToolbarMarkButton";
import ToolbarLinkButton from "./ToolbarLinkButton";
import ToolbarTableButton from "./ToolbarTableButton";
import TableElement from "./TableElement";
import ToolbarListButton from "./ToolbarListButton";

const optionsSoftBreakPlugin = {
  rules: [
    { hotkey: "shift+enter" },
    {
      hotkey: "enter",
      query: {
        allow: [ELEMENT_UL, ELEMENT_TD],
      },
    },
  ],
};
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
  createListPlugin(),
  createSoftBreakPlugin(optionsSoftBreakPlugin),
  createExitBreakPlugin(),
];
const editableProps = {
  placeholder: "Your article goes here...",
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

const components = createSlatePluginsComponents({
  [ELEMENT_TABLE]: TableElement,
});
const options = createSlatePluginsOptions();

interface BodyProps {
  value: TNode<{}>[];
  setValue: (value: TNode<{}>[]) => void;
}

const Body: React.FC<BodyProps> = ({ value, setValue }) => {
  return (
    <div style={{ position: "relative" }}>
      <SlatePlugins
        editableProps={editableProps}
        initialValue={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        plugins={pluginsBasic}
        components={components}
        options={options}
      >
        <div className={style.toolbarContainer}>
          <p className={style.toolbarLabel}>Body</p>
          <ToolbarElementButton type={ELEMENT_H2} icon={"H2"} />
          <ToolbarElementButton type={ELEMENT_H3} icon={"H3"} />
          <ToolbarMarkButton type={MARK_BOLD} icon={"Bold"} />
          <ToolbarLinkButton icon={"Link"} />
          <ToolbarTableButton icon="Table" transform={insertTable} />
          <ToolbarListButton type={ELEMENT_UL} />
        </div>
      </SlatePlugins>
    </div>
  );
};

export default Body;
