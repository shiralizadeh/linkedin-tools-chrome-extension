import { Notes } from "./components/notes";
import { openDb } from "../libs/db";

import "./index.scss";

export default function App() {
  return (
    <div class="lt-container">
      <h1 class="lt-header">
        <img
          class="lt-logo"
          src={chrome.runtime.getURL("assets/logo-128.png")}
          alt="LinkedIn Tools"
        />
        LinkedIn Tools
      </h1>
      <div class="lt-tools-box">
        <div class="lt-box">
          <Notes />
        </div>
        <div class="lt-box lt-coming-soon">Coming Soon...</div>
      </div>
    </div>
  );
}
