import App from "./app";
import { createSignal } from "solid-js";
import { render, createComponent } from "solid-js/web";

import { extractUsername } from "./utilities";

const notesSelector = ".linkedin-tools-notes";

const generateKey = () =>
  `linkedin-tools-notes-${extractUsername(window.location.href)}`;

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
