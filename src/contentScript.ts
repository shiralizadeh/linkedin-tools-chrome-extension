import { getUsername } from "./utilities";

const notesSelector = ".linkedin-tools-notes";

const generateKey = () =>
  `linkedin-tools-notes-${getUsername(window.location.href)}`;

function buildUI() {
  const $layout = document.querySelector(".scaffold-layout__main section");

  if (document.querySelector(".linkedin-tools")) return;
  if (!document.querySelector(".pv-top-card-profile-picture__image")) return;

  // LinkedIn Tools container
  const $div = document.createElement("div");

  $div.innerHTML = `
<section
  class="linkedin-tools artdeco-card ember-view relative break-words pb3 mt2"
>
  <div class="pvs-header__container">
    <h1 style="font-size: 2rem; margin-bottom: 10px;">LinkedIn Tools</h1>
    <h2 style="font-size: 1.5rem;">Notes:</h2>
    <textarea class="linkedin-tools-notes" style="height: 200px;"></textarea>
  </div>
</section>
`;

  $layout?.after($div);

  const $notes = document.querySelector(notesSelector) as HTMLTextAreaElement;

  $notes?.addEventListener("focus", (e) => {
    initValues();
  });

  $notes?.addEventListener("change", (e) => {
    const notes = (e.target as HTMLTextAreaElement).value;

    localStorage.setItem(generateKey(), notes);
  });
}

function initValues() {
  const $notes = document.querySelector(notesSelector) as HTMLTextAreaElement;

  if (!$notes) return;

  $notes.value = localStorage.getItem(generateKey()) || "";
}

// init
buildUI();
initValues();

// obeserve changes in the DOM
const $img = document.querySelector(".pv-top-card-profile-picture__image");

$img?.addEventListener("load", () => {
  console.log("loaded");

  buildUI();
  initValues();
});

window.addEventListener("popstate", function (event) {
  buildUI();
  initValues();
});
