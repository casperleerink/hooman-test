import React, { useState } from "react";
import Dropfile from "./Dropfile";
import style from "./Form.module.scss";
import { ReactComponent as ImagePlaceholder } from "../../Icons/image-placeholder.svg";

interface ImageFieldProps {
  onChange: (photo: File) => void;
}
const ImageField: React.FC<ImageFieldProps> = ({ onChange }) => {
  const [url, setUrl] = useState("");

  const handleChange = async (file: File) => {
    const url = URL.createObjectURL(file);
    setUrl(url);
    onChange(file);
  };

  return (
    <Dropfile callback={handleChange}>
      <div className={style.dropContainer}>
        <label>
          <input
            name="image"
            type="file"
            aria-label="Upload Image"
            accept="image/jpeg, image/png"
            onChange={(e: any) => handleChange(e.target.files[0])}
          />
        </label>

        <div className={style.image}>
          {url ? <img src={url} alt="your upload" /> : <ImagePlaceholder />}
        </div>
      </div>
    </Dropfile>
  );
};

export default ImageField;
