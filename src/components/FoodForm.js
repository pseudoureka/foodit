import { useState } from "react";
import "./FoodForm.css";

const INITIAL_VALUE = {
  title: "",
  calorie: 0,
  content: "",
};

function FoodForm() {
  const [values, setValues] = useState(INITIAL_VALUE);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: sanitize(type, value),
    }));
  };

  function sanitize(type, value) {
    switch (type) {
      case "number":
        return Number(value) || 0;

      default:
        return value;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    setValues(INITIAL_VALUE);
  };

  const isFormValid = values.title && values.calorie && values.content;

  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <input name="title" value={values.title} onChange={handleChange} />
      <input name="calorie" value={values.calorie} type="number" onChange={handleChange} />
      <textarea name="content" value={values.content} onChange={handleChange} />
      <button type="submit" disabled={!isFormValid}>
        보내기
      </button>
    </form>
  );
}

export default FoodForm;
