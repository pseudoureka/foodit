import { useState } from "react";
import "./FoodForm.css";
import FileInput from "./FileInput";

const INITIAL_VALUE = {
  title: "",
  calorie: 0,
  content: "",
  imgFile: null,
};

function FoodForm() {
  const [values, setValues] = useState(INITIAL_VALUE);

  const handleChange = (name, value, type) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: sanitize(type, value),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, value, type);
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
    console.log(typeof values.calorie);
    setValues(INITIAL_VALUE);
  };

  const isFormValid = values.title && values.calorie && values.content;

  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <FileInput name="imgFile" value={values.imgFile} onChange={handleChange} />
      <input name="title" value={values.title} onChange={handleInputChange} />
      <input name="calorie" value={values.calorie} type="number" onChange={handleInputChange} />
      <textarea name="content" value={values.content} onChange={handleInputChange} />
      <button type="submit" disabled={!isFormValid}>
        저장
      </button>
    </form>
  );
}

export default FoodForm;
