import { useState } from "react";
import "./FoodForm.css";
import FileInput from "./FileInput";
import { createFood } from "../api";

const INITIAL_VALUE = {
  title: "",
  calorie: 0,
  content: "",
  imgFile: null,
};

function FoodForm({ onSubmitSuccess }) {
  const [values, setValues] = useState(INITIAL_VALUE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("calorie", values.calorie);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);
    let result;
    try {
      setIsSubmitting(true);
      setSubmittingError(null);
      result = await createFood(formData);
    } catch (e) {
      setSubmittingError(e);
      return;
    } finally {
      setIsSubmitting(false);
    }
    const { food } = result;
    onSubmitSuccess(food);
    setValues(INITIAL_VALUE);
  };

  const isFormValid = values.title && values.calorie && values.content;

  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <FileInput name="imgFile" value={values.imgFile} onChange={handleChange} />
      <input name="title" value={values.title} onChange={handleInputChange} />
      <input name="calorie" value={values.calorie} type="number" onChange={handleInputChange} />
      <textarea name="content" value={values.content} onChange={handleInputChange} />

      <button type="submit" disabled={isSubmitting || !isFormValid}>
        저장
      </button>
      {submittingError?.message && <p>{submittingError.message}</p>}
    </form>
  );
}

export default FoodForm;
