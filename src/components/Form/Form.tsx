// import { useFormik } from 'formik';
import React, { useState } from "react";
import ImageField from "./ImageField";
import Title from "./Title";
import style from "./Form.module.scss";
import ActionButtons from "./ActionButtons";
import CustomSelect from "./Select";
import Date from "./Date";
import Minutes from "./Minutes";
import Body, { createElement } from "./SlatePluginBody/Body";
import Authors, { Author } from "./Authors/Authors";
import Tags from "./Tags";
import { TNode, ELEMENT_PARAGRAPH } from "@udecode/slate-plugins";
import { OptionTypeBase } from "react-select";

interface Tag {
  id: string;
  text: string;
}

interface FormValues {
  title: string;
  image: File | null;
  imageDescription: string;
  category: OptionTypeBase;
  date: string;
  length: number;
  body: TNode<{}>[];
  metaDescription: string;
  authors: Author[];
  pageTitleTag: string;
  tags: Tag[];
}

const initialBody = [
  createElement("Your article goes here...", { type: ELEMENT_PARAGRAPH }),
];
const initalValues: FormValues = {
  title: "",
  image: null,
  imageDescription: "",
  category: { label: "All", value: "All" },
  date: "",
  length: 0,
  body: initialBody,
  metaDescription: "",
  authors: [],
  pageTitleTag: "",
  tags: [
    {
      id: "Tags",
      text: "Tags",
    },
  ],
};

const Form: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>(initalValues);

  return (
    <main className={style.main}>
      <ActionButtons
        className={style.actionButtons}
        onDiscard={() => setFormValues(initalValues)}
        onSave={() => {
          console.log(formValues);
          alert("Article Saved!");
        }}
      />
      <form className={style.form} onSubmit={(e) => e.preventDefault()}>
        {/* Row 1 */}
        <div className={style.row}>
          <Title
            className={style.title}
            value={formValues.title}
            onChange={(v) => setFormValues({ ...formValues, title: v })}
          />
          <div className={style.imageContainer}>
            <ImageField
              onChange={(file) => {
                setFormValues({ ...formValues, image: file });
              }}
            />
            <input
              type="text"
              aria-label="Image Description"
              placeholder="Image Description"
              value={formValues.imageDescription}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  imageDescription: e.target.value,
                });
              }}
              className={style.imageDesc}
            />
          </div>
        </div>
        {/* Row 2! */}
        <div className={`${style.row} ${style.row2}`}>
          <Minutes
            className={style.minutes}
            value={formValues.length}
            onChange={(v) => {
              setFormValues({ ...formValues, length: v });
            }}
          />
          <Date
            className={style.date}
            date={formValues.date}
            setDate={(date) => setFormValues({ ...formValues, date })}
          />
          <CustomSelect
            className={style.select}
            onChange={(val) => setFormValues({ ...formValues, category: val })}
            category={formValues.category}
          />
        </div>
        {/* Row 3 */}
        {/* <Body
          value={formValues.body}
          onChange={(v: any) => {
            setFormValues({ ...formValues, body: v });
          }}
        /> */}
        <Body
          value={formValues.body}
          setValue={(value) => {
            setFormValues({
              ...formValues,
              body: value,
            });
          }}
        />
        {/* Row 4! */}
        <div className={`${style.row} ${style.row4}`}>
          {/* Column 1 */}
          <div className={style.leftColumn}>
            <textarea
              name="metaDescription"
              aria-label="metadescription"
              rows={2}
              placeholder="Enter metadescription"
              className={style.metaDescription}
              value={formValues.metaDescription}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  metaDescription: e.target.value,
                });
              }}
            />
            <Authors
              authors={formValues.authors}
              setAuthors={(authors) => {
                setFormValues({
                  ...formValues,
                  authors,
                });
              }}
            />
          </div>
          {/* Column 2! */}
          <div className={style.rightColumn}>
            <textarea
              name="pageTitleTag"
              aria-label="Page Title Tag"
              rows={2}
              placeholder="Enter page title tag"
              className={style.pageTitleTag}
              value={formValues.pageTitleTag}
              onChange={(e) =>
                setFormValues({ ...formValues, pageTitleTag: e.target.value })
              }
            />
            <Tags
              tags={formValues.tags}
              setTags={(t) => {
                setFormValues({ ...formValues, tags: t });
              }}
            />
          </div>
        </div>
      </form>
    </main>
  );
};

export default Form;
