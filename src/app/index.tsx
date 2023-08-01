import { createSignal } from "solid-js";

export default function App() {
  const [count, setCount] = createSignal(0);

  setInterval(() => {
    setCount((count) => count + 1);
  }, 1000);

  return <>Count: {count()}</>;
}
