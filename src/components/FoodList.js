import { useState } from "react";
import "./FoodList.css";
import FoodForm from "./FoodForm";

function formatDate(value) {
  const date = new Date();
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function FoodListItem({ item, onDelete, onEdit }) {
  const { imgUrl, title, calorie, content, createdAt } = item;
  const handleDeleteClick = () => onDelete(item.id);

  const handleEditClick = () => onEdit(item.id);

  return (
    <div className="FoodListItem">
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>칼로리 : {calorie}</div>
      <div>{content}</div>
      <div>{formatDate(createdAt)}</div>
      <button onClick={handleEditClick}>수정</button>
      <button onClick={handleDeleteClick}>삭제</button>
    </div>
  );
}

function FoodList({ items, onDelete }) {
  const [editingId, setEditingId] = useState();

  return (
    <ul className="FoodList">
      {items.map((item) => {
        if (item.id === editingId) {
          const { title, calorie, content, imgUrl } = item;
          const initialValues = { title, calorie, content, imgUrl };

          return (
            <li key={item.id}>
              <FoodForm initialValues={initialValues} />
            </li>
          );
        }
        return (
          <li key={item.id}>
            <FoodListItem item={item} onDelete={onDelete} onEdit={setEditingId} />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;
