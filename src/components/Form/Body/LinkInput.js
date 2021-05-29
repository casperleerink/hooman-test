import React, { useState, useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideAlerter(ref, cancel) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        cancel();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, cancel]);
}

const LinkInput = ({ className, callback, cancel }) => {
  const [url, setUrl] = useState("");
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  useOutsideAlerter(wrapperRef, cancel);
  const handleClick = () => {
    callback(url);
  };
  return (
    <div className={className} ref={wrapperRef}>
      <label>
        Insert URL
        <input
          ref={inputRef}
          type="text"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            cancel();
          }}
        >
          Cancel
        </button>
        <button onClick={handleClick}>Insert Link</button>
      </div>
    </div>
  );
};

export default LinkInput;
