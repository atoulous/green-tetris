import React from "react";
import Cell from "./cell.js";

const Row = ({ row }) => {
  const rowStyle = {
    display: "flex",
    justifyContent: "center",
  };
  return (
    <div style={rowStyle}>
      {" "}
      {row.map((e, i) => {
        return <Cell key={i} fill={e.fill} color={e.color} />;
      })}
    </div>
  );
};

export default Row;
