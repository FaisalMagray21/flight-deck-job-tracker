// storage.js — localStorage se data save/load karne ke functions

const APPS_KEY = "flightdeck_apps";
const THEME_KEY = "flightdeck_theme";

function getApplications() {
  const raw = localStorage.getItem(APPS_KEY);
  if (raw) {
    return JSON.parse(raw);
  } else {
    return [];
  }
}

function saveApplications(applications) {
  localStorage.setItem(APPS_KEY, JSON.stringify(applications));
}

function getTheme() {
  return localStorage.getItem(THEME_KEY);
}

function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}