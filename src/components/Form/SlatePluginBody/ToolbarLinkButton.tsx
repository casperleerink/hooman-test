import React, { useState, useEffect, useRef, MouseEvent } from "react";
import { useTSlate } from "@udecode/slate-plugins";
import { getAbove, someNode, unwrapNodes } from "@udecode/slate-plugins-common";
import { getSlatePluginType } from "@udecode/slate-plugins-core";
import {
  ELEMENT_LINK,
  upsertLinkAtSelection,
} from "@udecode/slate-plugins-link";

import style from "./Body.module.scss";

interface ToolbarLinkButtonProps {
  icon: string | React.FC;
}

const ToolbarLinkButton: React.FC<ToolbarLinkButtonProps> = ({ icon }) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const selectionRef: any = useRef(null);
  const editor = useTSlate();
  useEffect(() => {
    if (showPrompt && editor.selection) {
      selectionRef.current = editor.selection;
    }
  }, [showPrompt, editor.selection]);
  const type = getSlatePluginType(editor, ELEMENT_LINK);
  const isLink = !!editor?.selection && someNode(editor, { match: { type } });

  const handleMouseDown = async (event: React.MouseEvent) => {
    if (!editor) return;
    event.preventDefault();
    const linkNode = getAbove(editor, {
      match: { type },
    });
    if (linkNode) {
      editor.selection &&
        unwrapNodes(editor, {
          at: editor.selection,
          match: { type: getSlatePluginType(editor, ELEMENT_LINK) },
        });
    } else {
      setShowPrompt(true);
    }
  };

  const handleInsertLink = (url: string) => {
    if (selectionRef.current) {
      editor.selection = selectionRef.current;
    }
    upsertLinkAtSelection(editor, { url });
    setShowPrompt(false);
  };
  return (
    <div style={{ position: "relative" }}>
      <button
        className={`${style.toolbarBtn} ${isLink ? style.active : ""}`}
        onMouseDown={handleMouseDown}
      >
        {icon}
      </button>
      {showPrompt && (
        <LinkInput
          className={style.linkInput}
          callback={handleInsertLink}
          cancel={() => setShowPrompt(false)}
        />
      )}
    </div>
  );
};

export default ToolbarLinkButton;

//POPUP PROMPTING THE URL
interface LinkInputProps {
  className: string;
  callback: (url: string) => void;
  cancel: () => void;
}

const LinkInput: React.FC<LinkInputProps> = ({
  className,
  callback,
  cancel,
}) => {
  const [url, setUrl] = useState("");
  const wrapperRef = useRef(null);
  const inputRef: React.LegacyRef<HTMLInputElement> = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  useOutsideAlerter(wrapperRef, cancel);
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
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
          onMouseDown={(e) => {
            e.preventDefault();
            cancel();
          }}
        >
          Cancel
        </button>
        <button onMouseDown={handleClick}>Insert Link</button>
      </div>
    </div>
  );
};

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideAlerter(ref: any, cancel: () => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
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
