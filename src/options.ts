import { ConfettiType } from "./serviceWorker";
import { ConfettiPreferences } from "./utilities";

// Handle UI events
const $confettiType = document.getElementById(
  "confettiType"
) as HTMLSelectElement;

$confettiType.addEventListener("change", (event) => {
  const value = $confettiType.value;

  confettiPreferences.setPreference("confettiType", value);
});

// Handle preferences
const confettiPreferences = new ConfettiPreferences();

confettiPreferences.getPreference("confettiType").then((value) => {
  $confettiType.value = value || ConfettiType.Centri;
});
