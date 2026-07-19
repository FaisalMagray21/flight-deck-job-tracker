// useApplications.js — application data ka poora CRUD management
// "hooks" folder mein hai lekin ye plain JS hai, koi React hook nahi

// Ye variable hamesha current applications ka latest data rakhega (memory mein)
let applications = [];

// App start hote hi localStorage se purana data load karo
function initApplications() {
  applications = getApplications();
}

// Sab applications wapas do (jaise hain)
function getAllApplications() {
  return applications;
}

// Nayi application add karo
function addApplication(formData) {
  const check = validateApplication(formData);
  if (!check.valid) {
    return { success: false, errors: check.errors };
  }

  const newApp = {
    id: generateId(),
    company: formData.company.trim(),
    role: formData.role.trim(),
    dateApplied: formData.dateApplied,
    status: formData.status,
    link: formData.link ? formData.link.trim() : "",
    notes: formData.notes ? formData.notes.trim() : "",
  };

  applications.push(newApp);
  saveApplications(applications);

  return { success: true };
}

// Existing application update karo (id se dhoondh ke)
function updateApplication(id, formData) {
  const check = validateApplication(formData);
  if (!check.valid) {
    return { success: false, errors: check.errors };
  }

  const index = applications.findIndex(function (app) {
    return app.id === id;
  });

  if (index === -1) {
    return { success: false, errors: ["Application not found."] };
  }

  applications[index] = {
    id: id,
    company: formData.company.trim(),
    role: formData.role.trim(),
    dateApplied: formData.dateApplied,
    status: formData.status,
    link: formData.link ? formData.link.trim() : "",
    notes: formData.notes ? formData.notes.trim() : "",
  };

  saveApplications(applications);
  return { success: true };
}

// Application delete karo id se
function deleteApplication(id) {
  applications = applications.filter(function (app) {
    return app.id !== id;
  });
  saveApplications(applications);
}

// Ek unique ID banane ke liye helper function
function generateId() {
  return "app_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7);
}