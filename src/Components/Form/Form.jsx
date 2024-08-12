import React, { useState } from "react";
import "./Form.css";

const Form = ({ newLocation }) => {
  const [city, setCity] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ city });

    if (city === "") return;
    newLocation(city);
    setCity('');
  };

  return (
    <div className="search">
      <form onSubmit={onSubmit}>
        <div>
          <input
            className="input"
            type="text"
            placeholder="Buscar Ciudad"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <div className="buscar">
          <button type="submit">Buscar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
