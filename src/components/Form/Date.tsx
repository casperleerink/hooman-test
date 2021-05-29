import React from "react";

interface DateProps {
  className: string;
  date: string;
  setDate: (date: string) => void;
}

const Date: React.FC<DateProps> = ({ className, date, setDate }) => {
  // const [date, setDate] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val.length <= date.length) {
      setDate(val);
      return;
    } else {
      const regex = /^\d*\.?\d*$/;
      const lastChar = e.target.value[e.target.value.length - 1];
      if (regex.test(lastChar)) {
        if (val.length === 2 || val.length === 5) {
          val += ".";
        }
        setDate(val);
      }
    }
  };
  return (
    <label className={className}>
      <p>Date</p>
      <input
        type="text"
        name="date"
        placeholder={"MM.DD.YY"}
        value={date}
        onChange={handleChange}
        maxLength={8}
      />
    </label>
  );
};

export default Date;
