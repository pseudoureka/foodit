import items from "../mock.json";
import FoodList from "./FoodList";

function App() {
  return (
    <li>
      <FoodList items={items} />
    </li>
  );
}

export default App;
