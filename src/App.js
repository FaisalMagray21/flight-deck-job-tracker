// App.js — poori app ka render logic yahan hai

function renderApp() {
  const container = document.getElementById("app");
  const apps = getAllApplications();

  let html = "";

  // Header — Add button ke sath
  html += `
    <header class="border-b border-[#E5E0D5] dark:border-[#1F2937] px-5 py-4 flex items-center justify-between">
      <div>
        <h1 class="font-display font-bold text-lg">Flight Deck</h1>
        <p class="text-[11px] font-mono text-[#8B93A7]">JOB APPLICATION CONTROL TOWER</p>
      </div>
      <button id="add-btn" class="px-4 py-2 rounded-md bg-[#1A1D29] text-white text-sm font-semibold">
        + Add Application
      </button>
    </header>
  `;

  html += `<main class="max-w-4xl mx-auto px-5 py-8">`;

  if (apps.length === 0) {
    html += `
      <div class="text-center py-16">
        <p class="font-display font-semibold text-base">Board's empty</p>
        <p class="text-sm text-[#8B93A7] mt-1">No applications logged yet.</p>
      </div>
    `;
  } else {
    html += `<div class="space-y-3">`;
    for (let i = 0; i < apps.length; i++) {
      html += renderApplicationCard(apps[i]);
    }
    html += `</div>`;
  }

  html += `</main>`;

  // Modal ka HTML bhi hamesha container mein rahega, bas hidden/visible hoga
  html += renderModal();

  container.innerHTML = html;

  // Render hone ke baad event listeners lagao (ye zaroori step hai!)
  attachEventListeners();
}

// Ek single application ka card HTML banao
// Ek single application ka card HTML banao
function renderApplicationCard(app) {
  const statusInfo = STATUS_CONFIG[app.status];
  const followUp = needsFollowUp(app);

  let followUpHtml = "";
  if (followUp) {
    followUpHtml = `<span class="text-amber text-[11px] font-mono">⏰ ${daysSince(app.dateApplied)}d — follow up</span>`;
  }

  return `
    <div class="border border-[#E5E0D5] dark:border-[#1F2937] rounded-lg p-4 bg-white dark:bg-[#111827]">
      <div class="flex items-center justify-between">
        <div>
          <p class="font-medium text-sm">${app.company}</p>
          <p class="text-sm text-[#8B93A7]">${app.role}</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[11px] font-mono px-2 py-1 rounded-full" style="background:${statusInfo.bgTint}; color:${statusInfo.textLight}">
            ${statusInfo.label}
          </span>
          <button data-action="edit" data-id="${app.id}" class="w-7 h-7 rounded-md hover:bg-black/5 flex items-center justify-center text-[#8B93A7]">
            ✏️
          </button>
          <button data-action="delete" data-id="${app.id}" class="w-7 h-7 rounded-md hover:bg-rose/10 flex items-center justify-center text-[#8B93A7]">
            🗑️
          </button>
        </div>
      </div>
      <div class="flex items-center justify-between mt-2">
        <p class="text-[12px] font-mono text-[#8B93A7]">${formatDate(app.dateApplied)}</p>
        ${followUpHtml}
      </div>
    </div>
  `;
}
// Modal (popup form) ka HTML
function renderModal() {
  return `
    <div id="modal-overlay" class="hidden fixed inset-0 bg-black/50 items-center justify-center p-4">
      <div class="bg-white rounded-lg w-full max-w-md p-6">
        <h2 id="modal-title-text" class="font-display font-bold text-lg mb-4">Log Application</h2>
        <form id="app-form" class="space-y-3">
          <input type="hidden" id="edit-id" value="">
          <div>
            <label class="text-xs font-medium text-[#8B93A7] block mb-1">Company *</label>
            <input id="input-company" type="text" class="w-full px-3 py-2 rounded-md border border-[#E5E0D5]">
          </div>
          <div>
            <label class="text-xs font-medium text-[#8B93A7] block mb-1">Role *</label>
            <input id="input-role" type="text" class="w-full px-3 py-2 rounded-md border border-[#E5E0D5]">
          </div>
          <div>
            <label class="text-xs font-medium text-[#8B93A7] block mb-1">Date Applied *</label>
            <input id="input-date" type="date" class="w-full px-3 py-2 rounded-md border border-[#E5E0D5]">
          </div>
          <div>
            <label class="text-xs font-medium text-[#8B93A7] block mb-1">Status</label>
            <select id="input-status" class="w-full px-3 py-2 rounded-md border border-[#E5E0D5]">
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>
          <p id="form-error" class="text-rose text-xs hidden"></p>
          <div class="flex gap-2 pt-2">
            <button type="button" id="modal-cancel" class="flex-1 py-2 rounded-md border border-[#E5E0D5] text-sm">Cancel</button>
            <button type="submit" class="flex-1 py-2 rounded-md bg-[#1A1D29] text-white text-sm font-semibold">Save</button>
          </div>
        </form>
      </div>
    </div>
  `;
}
// Modal kholo
// Modal kholo — agar existingApp diya hai to "edit mode", warna "add mode"
function openModal(existingApp) {
  const overlay = document.getElementById("modal-overlay");
  overlay.classList.remove("hidden");
  overlay.classList.add("flex");

  // Agar edit kar rahe hain to form ko purani values se bhar do
  if (existingApp) {
    document.getElementById("modal-title-text").textContent = "Edit Application";
    document.getElementById("edit-id").value = existingApp.id;
    document.getElementById("input-company").value = existingApp.company;
    document.getElementById("input-role").value = existingApp.role;
    document.getElementById("input-date").value = existingApp.dateApplied;
    document.getElementById("input-status").value = existingApp.status;
  } else {
    document.getElementById("modal-title-text").textContent = "Log Application";
    document.getElementById("edit-id").value = "";
  }
}
// Modal band karo
function closeModal() {
  document.getElementById("modal-overlay").classList.add("hidden");
  document.getElementById("modal-overlay").classList.remove("flex");
  document.getElementById("app-form").reset();
}

// Sab buttons/form ke event listeners yahan lagate hain
function attachEventListeners() {
  // Add button click — naya application add karne ke liye
  document.getElementById("add-btn").addEventListener("click", function () {
    openModal(null); // null matlab "add mode", koi purana data nahi
  });

  // Cancel button click
  document.getElementById("modal-cancel").addEventListener("click", function () {
    closeModal();
  });

  // Form submit — add ya edit dono ke liye
  document.getElementById("app-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      company: document.getElementById("input-company").value,
      role: document.getElementById("input-role").value,
      dateApplied: document.getElementById("input-date").value,
      status: document.getElementById("input-status").value,
      link: "",
      notes: "",
    };

    const editId = document.getElementById("edit-id").value;
    let result;

    if (editId) {
      // Purani application update ho rahi hai
      result = updateApplication(editId, formData);
    } else {
      // Nayi application add ho rahi hai
      result = addApplication(formData);
    }

    if (result.success) {
      closeModal();
      renderApp();
    } else {
      const errorBox = document.getElementById("form-error");
      errorBox.textContent = result.errors.join(" ");
      errorBox.classList.remove("hidden");
    }
  });

  // Edit/Delete buttons — event delegation use kar rahe hain
  // (poore document pe listener lagate hain, phir check karte hain kaunsa button dabaya)
  document.getElementById("app").addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return; // agar button pe click nahi hua to kuch mat karo

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
      }
    }
  });
}