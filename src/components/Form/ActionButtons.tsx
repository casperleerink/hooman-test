import React from "react";

import { ReactComponent as NotPublished } from "../../Icons/not-published.svg";

interface ActionButtonsProps {
  className: string;
  onDiscard: () => void;
  onSave: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  className,
  onDiscard,
  onSave,
}) => {
  return (
    <div className={className}>
      <NotPublished />
      <button
        onClick={(e) => {
          e.preventDefault();
          onDiscard();
        }}
      >
        Discard
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          onSave();
        }}
      >
        Save
      </button>
    </div>
  );
};

export default ActionButtons;
