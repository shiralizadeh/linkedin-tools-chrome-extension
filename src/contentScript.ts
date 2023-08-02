import App from "./app";
import { render, createComponent } from "solid-js/web";

function buildUI() {
  const $layout = document.querySelector(".scaffold-layout__main section");

  if (!$layout) return false;

  // LinkedIn Tools container
  const $div = document.createElement("div");

  $layout?.after($div);

  render(() => createComponent(App, {}), $div);

  return true;
}

// init
function init() {
  const timerId = setInterval(() => {
    const stop = buildUI();

    if (stop) {
      clearInterval(timerId);
    }
  }, 500);
}

document.addEventListener("DOMContentLoaded", init);
