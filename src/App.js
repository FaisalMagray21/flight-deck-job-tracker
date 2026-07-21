// App.js — poori app ka render logic yahan hai

let currentSearch = "";
let currentStatusFilter = "all";
let currentSortOrder = "newest";

const AVATAR_COLORS = ["#FBBF24", "#38BDF8", "#34D399", "#F87171", "#A78BFA", "#F472B6"];

function renderApp() {
  const container = document.getElementById("app");
  const apps = getVisibleApplications();
  const totalCount = getAllApplications().length;
  const isDark = document.documentElement.classList.contains("dark");
  const profile = getUserProfile();

  let html = "";

  // Header
  html += `
    <header id="app-header" class="border-b border-[#E5E0D5] dark:border-[#1F2937] px-4 sm:px-6 py-4 sticky top-0 bg-[#FAF7F0]/95 dark:bg-[#0A0E1A]/95 backdrop-blur z-10">
      <div class="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-[#1A1D29] dark:bg-[#1F2937] border border-transparent dark:border-amber/30 flex items-center justify-center flex-shrink-0">
            <span class="text-amber font-mono font-semibold text-xs">FD</span>
          </div>
          <div>
            <h1 class="font-display font-bold text-base sm:text-lg leading-tight">Flight Deck</h1>
            <p class="text-[10px] sm:text-[11px] font-mono text-[#8B93A7] tracking-wide">JOB APPLICATION CONTROL TOWER</p>
          </div>
        </div>

        <div class="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
          <div class="flex items-center gap-2">
            ${renderProfileChip(profile)}

            <button id="print-btn" title="Print your applications" class="w-10 h-10 rounded-lg border border-[#E5E0D5] dark:border-[#1F2937] flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition flex-shrink-0 text-[#1A1D29] dark:text-[#E8EAED]">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a1 1 0 001-1v-4a1 1 0 00-1-1H9a1 1 0 00-1 1v4a1 1 0 001 1zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
            </button>

            <button id="theme-toggle" class="w-10 h-10 rounded-lg border border-[#E5E0D5] dark:border-[#1F2937] flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition flex-shrink-0 text-[#1A1D29] dark:text-[#E8EAED]">
              ${isDark ? `
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>
              ` : `
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
              `}
            </button>
          </div>

          <button id="add-btn" class="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-[#1A1D29] dark:bg-[#1F2937] dark:border dark:border-amber/40 text-white dark:text-amber text-sm font-semibold hover:opacity-90 dark:hover:bg-amber/10 active:scale-[0.98] transition flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
            <span>Add Application</span>
          </button>
        </div>
      </div>
    </header>
  `;

  html += `<main id="print-area" class="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">`;

  // Print-only title (sirf print hote waqt dikhega)
  html += `
    <div class="print-only hidden mb-6">
      <h1 class="text-2xl font-display font-bold">Flight Deck — Job Applications</h1>
      <p class="text-sm text-gray-600">${profile.name ? profile.name + " — " : ""}Exported on ${formatDate(new Date().toISOString().slice(0, 10))}</p>
    </div>
  `;

  if (totalCount > 0) {
    html += `
      <div class="no-print flex items-start gap-2 bg-[#FDF6E3] dark:bg-[#1F1A0D] border border-amber/30 dark:border-amber/20 rounded-lg px-3 py-2.5 mb-3 text-[12px] text-[#8A6D1D] dark:text-amber">
        <svg class="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
        <span>Your data lives only in this browser. Export a CSV backup regularly so you never lose it.</span>
      </div>
    `;

    // Naya: streak/gap insight banner
    html += renderInsight();
  }

  html += renderStats();
  html += `<div class="no-print">${renderToolbar()}</div>`;

  if (apps.length === 0) {
    if (totalCount === 0) {
      html += `
        <div class="text-center py-16 px-4">
          <div class="w-12 h-12 rounded-full bg-[#F5F2EA] dark:bg-[#111827] flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-[#8B93A7]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/></svg>
          </div>
          <p class="font-display font-semibold text-base">Board's empty</p>
          <p class="text-sm text-[#8B93A7] mt-1">No applications logged yet. Add your first one to start tracking.</p>
        </div>
      `;
    } else {
      html += `
        <div class="text-center py-16 px-4">
          <div class="w-12 h-12 rounded-full bg-[#F5F2EA] dark:bg-[#111827] flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-[#8B93A7]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"/></svg>
          </div>
          <p class="font-display font-semibold text-base">No matches found</p>
          <p class="text-sm text-[#8B93A7] mt-1">Try a different search term or clear your filters.</p>
        </div>
      `;
    }
  } else {
    html += `<div class="space-y-3">`;
    for (let i = 0; i < apps.length; i++) {
      html += renderApplicationCard(apps[i]);
    }
    html += `</div>`;
  }

  html += `</main>`;

  html += `<div class="no-print">${renderModal()}</div>`;
  html += `<div class="no-print">${renderProfileModal(profile)}</div>`;
  html += `<div id="toast" class="no-print hidden fixed bottom-5 left-1/2 -translate-x-1/2 bg-[#1A1D29] dark:bg-amber text-white dark:text-[#0A0E1A] text-sm px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 z-50"></div>`;

  container.innerHTML = html;

  attachEventListeners();
}

// ============================================================
// Streak / Gap Insight — motivational banner
// ============================================================
function renderInsight() {
  const allApps = getAllApplications();
  if (allApps.length === 0) return "";

  // Sabse recent application ki date dhoondo
  let mostRecentDate = allApps[0].dateApplied;
  for (let i = 1; i < allApps.length; i++) {
    if (new Date(allApps[i].dateApplied) > new Date(mostRecentDate)) {
      mostRecentDate = allApps[i].dateApplied;
    }
  }

  const gap = daysSince(mostRecentDate);

  let message = "";
  let icon = "";
  let colorClasses = "";

  if (gap === 0) {
    message = "You applied today — momentum looks great, keep it going!";
    icon = `<svg class="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`;
    colorClasses = "bg-[#EAF9F1] dark:bg-[#0D1F17] border-jade/30 dark:border-jade/20 text-[#0E7A4E] dark:text-jade";
  } else if (gap === 1) {
    message = "You applied yesterday — try to add one more today to keep the streak alive.";
    icon = `<svg class="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`;
    colorClasses = "bg-[#EAF6FD] dark:bg-[#0C1B24] border-skyc/30 dark:border-skyc/20 text-[#0369A1] dark:text-skyc";
  } else if (gap <= 3) {
    message = `It's been ${gap} days since your last application — a good time to add a new one.`;
    icon = `<svg class="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
    colorClasses = "bg-[#FDF6E3] dark:bg-[#1F1A0D] border-amber/30 dark:border-amber/20 text-[#8A6D1D] dark:text-amber";
  } else {
    message = `You haven't applied in ${gap} days — keep the momentum going!`;
    icon = `<svg class="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
    colorClasses = "bg-[#FDEEEE] dark:bg-[#241010] border-rose/30 dark:border-rose/20 text-[#B91C1C] dark:text-rose";
  }

  return `
    <div class="no-print flex items-start gap-2 border rounded-lg px-3 py-2.5 mb-5 text-[12px] ${colorClasses}">
      ${icon}
      <span>${message}</span>
    </div>
  `;
}

// ============================================================
// Profile — avatar chip aur edit modal
// ============================================================
function getAvatarColor(name) {
  if (!name) return AVATAR_COLORS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

function getInitials(name) {
  if (!name || name.trim() === "") return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function renderProfileChip(profile) {
  const hasPhoto = profile.photo && profile.photo !== "";
  const displayName = profile.name && profile.name.trim() !== "" ? profile.name : "Set your name";
  const avatarColor = getAvatarColor(profile.name);

  let avatarHtml;
  if (hasPhoto) {
    avatarHtml = `<img src="${profile.photo}" alt="Profile" class="w-8 h-8 rounded-full object-cover flex-shrink-0">`;
  } else {
    avatarHtml = `
      <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[11px] font-semibold" style="background:${avatarColor}">
        ${getInitials(profile.name)}
      </div>
    `;
  }

  return `
    <button id="profile-chip" class="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-[#E5E0D5] dark:border-[#1F2937] hover:bg-black/5 dark:hover:bg-white/5 transition flex-shrink-0">
      ${avatarHtml}
      <span class="hidden sm:inline text-sm font-medium max-w-[110px] truncate">${displayName}</span>
    </button>
  `;
}

function renderProfileModal(profile) {
  const hasPhoto = profile.photo && profile.photo !== "";
  const avatarColor = getAvatarColor(profile.name);

  let previewHtml;
  if (hasPhoto) {
    previewHtml = `<img id="profile-preview-img" src="${profile.photo}" alt="Preview" class="w-20 h-20 rounded-full object-cover">`;
  } else {
    previewHtml = `
      <div id="profile-preview-initials" class="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-semibold" style="background:${avatarColor}">
        ${getInitials(profile.name)}
      </div>
    `;
  }

  return `
    <div id="profile-modal-overlay" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-[#111827] rounded-xl w-full max-w-sm p-5 sm:p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-display font-bold text-lg">Your Profile</h2>
          <button type="button" id="profile-modal-close-x" class="text-[#8B93A7] hover:text-current w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div class="flex flex-col items-center gap-3 mb-5">
          <div id="profile-preview-wrap">${previewHtml}</div>
          <div class="flex items-center gap-2">
            <label for="profile-photo-input" class="cursor-pointer text-xs font-medium px-3 py-1.5 rounded-lg border border-[#E5E0D5] dark:border-[#1F2937] hover:bg-black/5 dark:hover:bg-white/5 transition">
              Upload Photo
            </label>
            <input type="file" id="profile-photo-input" accept="image/*" class="hidden">
            ${hasPhoto ? `<button type="button" id="profile-photo-remove" class="text-xs font-medium px-3 py-1.5 rounded-lg border border-[#E5E0D5] dark:border-[#1F2937] hover:bg-rose/10 hover:text-rose transition">Remove</button>` : ""}
          </div>
        </div>

        <form id="profile-form" class="space-y-3">
          <div>
            <label class="text-xs font-medium text-[#8B93A7] block mb-1">Your Name</label>
            <input id="profile-name-input" type="text" value="${profile.name || ""}" placeholder="e.g. Faisal Mehmood" class="w-full px-3 py-2.5 rounded-lg border border-[#E5E0D5] dark:border-[#1F2937] bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-amber/40">
          </div>
          <div class="flex gap-2 pt-2">
            <button type="button" id="profile-modal-cancel" class="flex-1 py-2.5 rounded-lg border border-[#E5E0D5] dark:border-[#1F2937] text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition">Cancel</button>
            <button type="submit" class="flex-1 py-2.5 rounded-lg bg-[#1A1D29] dark:bg-[#1F2937] dark:border dark:border-amber/40 text-white dark:text-amber text-sm font-semibold hover:opacity-90 dark:hover:bg-amber/10 transition">Save</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function resizeImageToBase64(file, callback) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const maxSize = 160;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxSize) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      callback(dataUrl);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function openProfileModal() {
  const overlay = document.getElementById("profile-modal-overlay");
  overlay.classList.remove("hidden");
  overlay.classList.add("flex");
  setTimeout(function () {
    document.getElementById("profile-name-input").focus();
  }, 50);
}

function closeProfileModal() {
  const overlay = document.getElementById("profile-modal-overlay");
  overlay.classList.add("hidden");
  overlay.classList.remove("flex");
}

function getVisibleApplications() {
  let list = getAllApplications();

  if (currentSearch.trim() !== "") {
    const query = currentSearch.trim().toLowerCase();
    list = list.filter(function (app) {
      return (
        app.company.toLowerCase().includes(query) ||
        app.role.toLowerCase().includes(query)
      );
    });
  }

  if (currentStatusFilter !== "all") {
    list = list.filter(function (app) {
      return app.status === currentStatusFilter;
    });
  }

  list = list.slice().sort(function (a, b) {
    const diff = new Date(a.dateApplied) - new Date(b.dateApplied);
    return currentSortOrder === "newest" ? -diff : diff;
  });

  return list;
}

function renderToolbar() {
  return `
    <div class="flex flex-col sm:flex-row gap-2 mb-5">
      <div class="relative flex-1">
        <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8B93A7]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"/></svg>
        <input id="search-input" type="text" placeholder="Search by company or role..."
          value="${currentSearch}"
          class="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#E5E0D5] dark:border-[#1F2937] text-sm bg-white dark:bg-[#111827] dark:text-[#E8EAED] focus:outline-none focus:ring-2 focus:ring-amber/40">
      </div>

      <div class="flex gap-2">
        <select id="filter-status" class="flex-1 sm:flex-none px-3 py-2.5 rounded-lg border border-[#E5E0D5] dark:border-[#1F2937] text-sm bg-white dark:bg-[#111827] dark:text-[#E8EAED] focus:outline-none focus:ring-2 focus:ring-amber/40">
          <option value="all">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select id="sort-order" class="flex-1 sm:flex-none px-3 py-2.5 rounded-lg border border-[#E5E0D5] dark:border-[#1F2937] text-sm bg-white dark:bg-[#111827] dark:text-[#E8EAED] focus:outline-none focus:ring-2 focus:ring-amber/40">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <button id="export-btn" class="px-4 py-2.5 rounded-lg border border-[#E5E0D5] dark:border-[#1F2937] text-sm font-medium bg-white dark:bg-[#111827] hover:bg-black/5 dark:hover:bg-white/5 transition flex items-center justify-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M7 10l5 5 5-5M12 15V3"/></svg>
        <span class="hidden sm:inline">Export</span>
      </button>
    </div>
  `;
}

function renderStats() {
  const allApps = getAllApplications();

  const total = allApps.length;

  let appliedCount = 0;
  let interviewCount = 0;
  let offerCount = 0;
  let rejectedCount = 0;

  for (let i = 0; i < allApps.length; i++) {
    const status = allApps[i].status;
    if (status === "Applied") appliedCount++;
    if (status === "Interview") interviewCount++;
    if (status === "Offer") offerCount++;
    if (status === "Rejected") rejectedCount++;
  }

  let successRate = 0;
  if (total > 0) {
    successRate = Math.round((offerCount / total) * 100);
  }

  const cards = [
    { label: "TOTAL", value: total, color: "" },
    { label: "APPLIED", value: appliedCount, color: "text-amber" },
    { label: "INTERVIEW", value: interviewCount, color: "text-skyc" },
    { label: "OFFERS", value: offerCount, color: "text-jade" },
    { label: "REJECTED", value: rejectedCount, color: "text-rose" },
    { label: "SUCCESS", value: successRate + "%", color: "" },
  ];

  let cardsHtml = "";
  for (let i = 0; i < cards.length; i++) {
    cardsHtml += `
      <div class="border border-[#E5E0D5] dark:border-[#1F2937] rounded-xl p-3 sm:p-4 text-center bg-white dark:bg-[#111827] shadow-sm">
        <p class="text-[9px] sm:text-[10px] font-mono text-[#8B93A7] tracking-wider mb-1">${cards[i].label}</p>
        <p class="text-lg sm:text-xl font-display font-bold ${cards[i].color}">${cards[i].value}</p>
      </div>
    `;
  }

  let barChartHtml = "";
  if (total > 0) {
    const appliedPct = (appliedCount / total) * 100;
    const interviewPct = (interviewCount / total) * 100;
    const offerPct = (offerCount / total) * 100;
    const rejectedPct = (rejectedCount / total) * 100;

    barChartHtml = `
      <div class="no-print mb-6">
        <div class="w-full h-2.5 rounded-full overflow-hidden flex bg-[#F0EDE4] dark:bg-[#1F2937]">
          <div style="width:${appliedPct}%; background:#FBBF24;"></div>
          <div style="width:${interviewPct}%; background:#38BDF8;"></div>
          <div style="width:${offerPct}%; background:#34D399;"></div>
          <div style="width:${rejectedPct}%; background:#F87171;"></div>
        </div>
        <div class="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[10px] font-mono text-[#8B93A7]">
          <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full inline-block" style="background:#FBBF24;"></span>Applied</span>
          <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full inline-block" style="background:#38BDF8;"></span>Interview</span>
          <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full inline-block" style="background:#34D399;"></span>Offer</span>
          <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full inline-block" style="background:#F87171;"></span>Rejected</span>
        </div>
      </div>
    `;
  }

  return `<div class="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">${cardsHtml}</div>${barChartHtml}`;
}

function renderApplicationCard(app) {
  const statusInfo = STATUS_CONFIG[app.status];
  const followUp = needsFollowUp(app);
  const daysAgo = daysSince(app.dateApplied);
  const isDark = document.documentElement.classList.contains("dark");

  let daysAgoText;
  if (daysAgo === 0) {
    daysAgoText = "Applied today";
  } else if (daysAgo === 1) {
    daysAgoText = "Applied 1 day ago";
  } else {
    daysAgoText = `Applied ${daysAgo} days ago`;
  }

  let followUpHtml = "";
  if (followUp) {
    followUpHtml = `
      <span class="no-print text-amber text-[11px] font-mono flex items-center gap-1">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        Follow up needed
      </span>
    `;
  }

  let companyTypeHtml = "";
  if (app.companyType && app.companyType !== "") {
    companyTypeHtml = `<span class="text-[10px] font-mono text-[#8B93A7] border border-[#E5E0D5] dark:border-[#1F2937] rounded-full px-2 py-0.5">${app.companyType}</span>`;
  }

  let hrEmailHtml = "";
  if (app.hrEmail && app.hrEmail !== "") {
    hrEmailHtml = `
      <p class="text-[12px] text-[#8B93A7] mt-1 flex items-center gap-1 truncate">
        <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        <span class="truncate">${app.hrEmail}</span>
      </p>
    `;
  }

  let notesHtml = "";
  if (app.notes && app.notes !== "") {
    notesHtml = `<p class="text-[12px] text-[#4B5163] dark:text-[#C5CAD3] mt-2 bg-[#F5F2EA] dark:bg-[#1a2030] rounded-md px-2.5 py-1.5">${app.notes}</p>`;
  }
  return `
    <div class="print-card border border-[#E5E0D5] dark:border-[#1F2937] rounded-xl p-4 bg-white dark:bg-[#111827] shadow-sm hover:shadow-md transition-shadow">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2 flex-wrap">
            <p class="font-semibold text-sm truncate">${app.company}</p>
            ${companyTypeHtml}
          </div>
          <p class="text-sm text-[#8B93A7] mt-0.5">${app.role}</p>
          ${hrEmailHtml}
        </div>
        <span class="flex-shrink-0 text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded-full whitespace-nowrap" style="background:${statusInfo.bgTint}; color:${isDark ? statusInfo.textDark : statusInfo.textLight}">
          ${statusInfo.label}
        </span>
      </div>

      ${notesHtml}

      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 pt-3 border-t border-[#F0EDE4] dark:border-[#1F2937] gap-2">
        <div class="flex flex-col">
          <p class="text-[12px] font-mono text-[#8B93A7]">${formatDate(app.dateApplied)}</p>
          <p class="text-[11px] text-[#B4BAC7]">${daysAgoText}</p>
        </div>
        <div class="flex items-center justify-between sm:justify-end gap-3">
          ${followUpHtml}
          <div class="no-print flex items-center gap-1">
            <button data-action="edit" data-id="${app.id}" class="w-8 h-8 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center text-[#8B93A7] transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            </button>
            <button data-action="delete" data-id="${app.id}" class="w-8 h-8 rounded-lg hover:bg-rose/10 flex items-center justify-center text-[#8B93A7] hover:text-rose transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderModal() {
  return `
    <div id="modal-overlay" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-[#111827] rounded-xl w-full max-w-md p-5 sm:p-6 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h2 id="modal-title-text" class="font-display font-bold text-lg">Log Application</h2>
          <button type="button" id="modal-close-x" class="text-[#8B93A7] hover:text-current w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <form id="app-form" class="space-y-3">
          <input type="hidden" id="edit-id" value="">
          <div>
            <label class="text-xs font-medium text-[#8B93A7] block mb-1">Company *</label>
            <input id="input-company" type="text" class="w-full px-3 py-2.5 rounded-lg border border-[#E5E0D5] dark:border-[#1F2937] bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-amber/40">
          </div>
          <div>
            <label class="text-xs font-medium text-[#8B93A7] block mb-1">Role *</label>
            <input id="input-role" type="text" class="w-full px-3 py-2.5 rounded-lg border border-[#E5E0D5] dark:border-[#1F2937] bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-amber/40">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs font-medium text-[#8B93A7] block mb-1">Date Applied *</label>
              <input id="input-date" type="date" class="w-full px-3 py-2.5 rounded-lg border border-[#E5E0D5] dark:border-[#1F2937] bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-amber/40">
            </div>
            <div>
              <label class="text-xs font-medium text-[#8B93A7] block mb-1">Status</label>
              <select id="input-status" class="w-full px-3 py-2.5 rounded-lg border border-[#E5E0D5] dark:border-[#1F2937] bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-amber/40">
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>
          <div>
            <label class="text-xs font-medium text-[#8B93A7] block mb-1">Company Type (optional)</label>
            <select id="input-company-type" class="w-full px-3 py-2.5 rounded-lg border border-[#E5E0D5] dark:border-[#1F2937] bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-amber/40">
              <option value="">Not specified</option>
              <option value="Product-Based">Product-Based</option>
              <option value="Service-Based">Service-Based</option>
            </select>
          </div>
          <div>
            <label class="text-xs font-medium text-[#8B93A7] block mb-1">HR / Contact Email (optional)</label>
            <input id="input-hr-email" type="email" placeholder="hr@company.com" class="w-full px-3 py-2.5 rounded-lg border border-[#E5E0D5] dark:border-[#1F2937] bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-amber/40">
          </div>
          <div>
            <label class="text-xs font-medium text-[#8B93A7] block mb-1">Notes (optional)</label>
            <textarea id="input-notes" rows="2" placeholder="Referral name, interview prep, next steps..." class="w-full px-3 py-2.5 rounded-lg border border-[#E5E0D5] dark:border-[#1F2937] bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-amber/40 resize-none"></textarea>
          </div>
          <p id="form-error" class="text-rose text-xs hidden"></p>
          <div class="flex gap-2 pt-2">
            <button type="button" id="modal-cancel" class="flex-1 py-2.5 rounded-lg border border-[#E5E0D5] dark:border-[#1F2937] text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition">Cancel</button>
            <button type="submit" class="flex-1 py-2.5 rounded-lg bg-[#1A1D29] dark:bg-[#1F2937] dark:border dark:border-amber/40 text-white dark:text-amber text-sm font-semibold hover:opacity-90 dark:hover:bg-amber/10 transition">Save</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function openModal(existingApp) {
  const overlay = document.getElementById("modal-overlay");
  overlay.classList.remove("hidden");
  overlay.classList.add("flex");

  if (existingApp) {
    document.getElementById("modal-title-text").textContent = "Edit Application";
    document.getElementById("edit-id").value = existingApp.id;
    document.getElementById("input-company").value = existingApp.company;
    document.getElementById("input-role").value = existingApp.role;
    document.getElementById("input-date").value = existingApp.dateApplied;
    document.getElementById("input-status").value = existingApp.status;
    document.getElementById("input-company-type").value = existingApp.companyType || "";
    document.getElementById("input-hr-email").value = existingApp.hrEmail || "";
    document.getElementById("input-notes").value = existingApp.notes || "";
  } else {
    document.getElementById("modal-title-text").textContent = "Log Application";
    document.getElementById("edit-id").value = "";
  }

  setTimeout(function () {
    document.getElementById("input-company").focus();
  }, 50);
}

function closeModal() {
  document.getElementById("modal-overlay").classList.add("hidden");
  document.getElementById("modal-overlay").classList.remove("flex");
  document.getElementById("app-form").reset();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerHTML = `
    <svg class="w-4 h-4 text-jade flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
    <span>${message}</span>
  `;
  toast.classList.remove("hidden");

  setTimeout(function () {
    toast.classList.add("hidden");
  }, 2500);
}

function exportToCSV() {
  const allApps = getAllApplications();

  if (allApps.length === 0) {
    alert("No applications to export yet.");
    return;
  }

  const headers = ["Company", "Role", "Date Applied", "Status", "Company Type", "HR Email", "Notes"];

  const rows = [];
  for (let i = 0; i < allApps.length; i++) {
    const app = allApps[i];
    rows.push([
      app.company,
      app.role,
      app.dateApplied,
      app.status,
      app.companyType || "",
      app.hrEmail || "",
      app.notes || "",
    ]);
  }

  let csvContent = escapeCsvRow(headers) + "\n";
  for (let i = 0; i < rows.length; i++) {
    csvContent += escapeCsvRow(rows[i]) + "\n";
  }

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "job-applications.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast("CSV downloaded successfully");
}

function escapeCsvRow(rowArray) {
  const escapedValues = rowArray.map(function (value) {
    const stringValue = String(value);
    const escaped = stringValue.replace(/"/g, '""');
    return `"${escaped}"`;
  });
  return escapedValues.join(",");
}

function toggleTheme() {
  const isDarkNow = document.documentElement.classList.toggle("dark");
  saveTheme(isDarkNow ? "dark" : "light");
  renderApp();
}

function attachEventListeners() {

  document.getElementById("theme-toggle").addEventListener("click", function () {
    toggleTheme();
  });

  // Naya: print button — browser ka print dialog kholta hai
  document.getElementById("print-btn").addEventListener("click", function () {
    window.print();
  });

  document.getElementById("profile-chip").addEventListener("click", function () {
    openProfileModal();
  });

  document.getElementById("profile-modal-close-x").addEventListener("click", function () {
    closeProfileModal();
  });

  document.getElementById("profile-modal-cancel").addEventListener("click", function () {
    closeProfileModal();
  });

  document.getElementById("profile-modal-overlay").addEventListener("click", function (e) {
    if (e.target.id === "profile-modal-overlay") {
      closeProfileModal();
    }
  });

  document.getElementById("profile-photo-input").addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    resizeImageToBase64(file, function (dataUrl) {
      const wrap = document.getElementById("profile-preview-wrap");
      wrap.innerHTML = `<img id="profile-preview-img" src="${dataUrl}" alt="Preview" class="w-20 h-20 rounded-full object-cover">`;
      wrap.dataset.pendingPhoto = dataUrl;
    });
  });

  const removeBtn = document.getElementById("profile-photo-remove");
  if (removeBtn) {
    removeBtn.addEventListener("click", function () {
      const wrap = document.getElementById("profile-preview-wrap");
      const name = document.getElementById("profile-name-input").value;
      const color = getAvatarColor(name);
      wrap.innerHTML = `<div id="profile-preview-initials" class="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-semibold" style="background:${color}">${getInitials(name)}</div>`;
      wrap.dataset.pendingPhoto = "REMOVE";
    });
  }

  document.getElementById("profile-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("profile-name-input").value.trim();
    const wrap = document.getElementById("profile-preview-wrap");
    const pendingPhoto = wrap.dataset.pendingPhoto;

    const currentProfile = getUserProfile();
    let photo = currentProfile.photo || "";

    if (pendingPhoto === "REMOVE") {
      photo = "";
    } else if (pendingPhoto) {
      photo = pendingPhoto;
    }

    saveUserProfile({ name: name, photo: photo });
    closeProfileModal();
    renderApp();
    showToast("Profile updated");
  });

  document.getElementById("search-input").addEventListener("input", function (e) {
    currentSearch = e.target.value;
    renderApp();
    document.getElementById("search-input").focus();
    const input = document.getElementById("search-input");
    input.setSelectionRange(input.value.length, input.value.length);
  });

  document.getElementById("filter-status").addEventListener("change", function (e) {
    currentStatusFilter = e.target.value;
    renderApp();
  });

  document.getElementById("sort-order").addEventListener("change", function (e) {
    currentSortOrder = e.target.value;
    renderApp();
  });

  document.getElementById("export-btn").addEventListener("click", function () {
    exportToCSV();
  });

  document.getElementById("add-btn").addEventListener("click", function () {
    openModal(null);
  });

  document.getElementById("modal-cancel").addEventListener("click", function () {
    closeModal();
  });

  document.getElementById("modal-close-x").addEventListener("click", function () {
    closeModal();
  });

  document.getElementById("modal-overlay").addEventListener("click", function (e) {
    if (e.target.id === "modal-overlay") {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;

    const modalOverlay = document.getElementById("modal-overlay");
    if (modalOverlay && !modalOverlay.classList.contains("hidden")) {
      closeModal();
      return;
    }

    const profileOverlay = document.getElementById("profile-modal-overlay");
    if (profileOverlay && !profileOverlay.classList.contains("hidden")) {
      closeProfileModal();
    }
  });

  document.getElementById("app-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      company: document.getElementById("input-company").value,
      role: document.getElementById("input-role").value,
      dateApplied: document.getElementById("input-date").value,
      status: document.getElementById("input-status").value,
      companyType: document.getElementById("input-company-type").value,
      hrEmail: document.getElementById("input-hr-email").value,
      notes: document.getElementById("input-notes").value,
      link: "",
    };

    const editId = document.getElementById("edit-id").value;
    let result;
    let wasEdit = false;

    if (editId) {
      result = updateApplication(editId, formData);
      wasEdit = true;
    } else {
      result = addApplication(formData);
    }

    if (result.success) {
      closeModal();
      renderApp();
      showToast(wasEdit ? "Application updated" : "Application saved");
    } else {
      const errorBox = document.getElementById("form-error");
      errorBox.textContent = result.errors.join(" ");
      errorBox.classList.remove("hidden");
    }
  });

  document.getElementById("app").addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;

    const id = btn.getAttribute("data-id");
    const action = btn.getAttribute("data-action");

    if (action === "edit") {
      const app = getAllApplications().find(function (a) {
        return a.id === id;
      });
      openModal(app);
    }

    if (action === "delete") {
      const confirmDelete = confirm("Are you sure you want to delete this application?");
      if (confirmDelete) {
        deleteApplication(id);
        renderApp();
        showToast("Application deleted");
      }
    }
  });
}