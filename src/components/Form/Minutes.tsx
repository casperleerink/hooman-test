import React from "react";

interface MinutesProps {
  className: string;
  value: number;
  onChange: (v: number) => void;
}

const Minutes: React.FC<MinutesProps> = ({ className, value, onChange }) => {
  return (
    <div className={className}>
      <input
        type="number"
        aria-label="Reading Minutes"
        name="minutes"
        step={1}
        min={0}
        max={1000}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
      <span>min</span>
    </div>
  );
};

export default Minutes;
