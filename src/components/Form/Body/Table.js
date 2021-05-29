import React from "react";

const Table = ({ columns }) => {
  const columnArr = new Array(columns).fill(0);
  return (
    <table>
      <thead>
        <tr>
          {columnArr.map((_) => {
            <th>Header</th>;
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          {columnArr.map((_) => {
            <td></td>;
          })}
        </tr>
      </tbody>
    </table>
  );
};
