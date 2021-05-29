import React from "react";

interface TitleProps {
  className: string;
  value: string;
  onChange: (val: string) => void;
}

const Title: React.FC<TitleProps> = ({ className, value, onChange }) => {
  return (
    <label className={className}>
      <p>Title</p>
      <textarea
        name="title"
        rows={2}
        maxLength={100}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </label>
  );
};

export default Title;
