import React from "react";
import "./Spinner.css"
const Spinner = () => {
  return (
    <div className="lds-roller cargando">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
