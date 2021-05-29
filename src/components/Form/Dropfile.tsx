import React, { useRef, useEffect, ReactChild } from "react";
interface DropfileProps {
  callback: (file: File) => void;
  children: ReactChild | null;
}

const Dropfile: React.FC<DropfileProps> = ({ callback, children }) => {
  const dropRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    let div = dropRef.current;
    const handleDrag = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const handleDrop = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        // If dropped items aren't files, reject them
        if (e.dataTransfer.items[0].kind === "file") {
          const file = e.dataTransfer.items[0].getAsFile();
          callback(file); //send file to parent
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        const file = e.dataTransfer.files[0];
        callback(file); //send file to parent
      }
    };
    if (div) {
      div.addEventListener("dragover", handleDrag);
      div.addEventListener("drop", handleDrop);
    }
    return () => {
      if (div) {
        div.removeEventListener("dragover", handleDrag);
        div.removeEventListener("drop", handleDrop);
      }
    };
  }, [callback]);
  return <div ref={dropRef}>{children}</div>;
};

export default Dropfile;
