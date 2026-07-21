// storage.js — localStorage se data save/load karne ke functions

const APPS_KEY = "flightdeck_apps";
const THEME_KEY = "flightdeck_theme";
const PROFILE_KEY = "flightdeck_profile";

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

// Naya: user profile (naam + photo) get/save karne ke liye
function getUserProfile() {
  const raw = localStorage.getItem(PROFILE_KEY);
  if (raw) {
    return JSON.parse(raw);
  } else {
    return { name: "", photo: "" };
  }
}

function saveUserProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}