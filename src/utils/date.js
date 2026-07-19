// date.js — date se related functions

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function daysSince(dateStr) {
  const applied = new Date(dateStr);
  const today = new Date();
  applied.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const diffMs = today - applied;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
}

function needsFollowUp(application) {
  if (application.status === "Applied" && daysSince(application.dateApplied) >= 7) {
    return true;
  } else {
    return false;
  }
}