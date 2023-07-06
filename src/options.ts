import { LinkedInToolsPreferences } from "./utilities";

// Handle UI events
const $active = document.getElementById("active") as HTMLSelectElement;

$active.addEventListener("change", (event) => {
  const value = $active.value;

  linkedInToolsPreferences.setPreference("active", value);
});

// Handle preferences
const linkedInToolsPreferences = new LinkedInToolsPreferences();

linkedInToolsPreferences.getPreference("active").then((value) => {
  $active.value = value || "1";
});
