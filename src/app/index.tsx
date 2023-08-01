import { createSignal } from "solid-js";
import "./index.css";

export default function App() {
  const [count, setCount] = createSignal(0);

  setInterval(() => {
    setCount((count) => count + 1);
  }, 1000);

  return <div class="lt-container">Count: {count()}</div>;
}
