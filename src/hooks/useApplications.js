// useApplications.js — application data ka poora CRUD management

let applications = [];

function initApplications() {
  applications = getApplications();
}

function getAllApplications() {
  return applications;
}

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
    companyType: formData.companyType || "",
    hrEmail: formData.hrEmail ? formData.hrEmail.trim() : "",
    notes: formData.notes ? formData.notes.trim() : "",
    link: formData.link ? formData.link.trim() : "",
  };

  applications.push(newApp);
  saveApplications(applications);

  return { success: true };
}

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
    companyType: formData.companyType || "",
    hrEmail: formData.hrEmail ? formData.hrEmail.trim() : "",
    notes: formData.notes ? formData.notes.trim() : "",
    link: formData.link ? formData.link.trim() : "",
  };

  saveApplications(applications);
  return { success: true };
}

function deleteApplication(id) {
  applications = applications.filter(function (app) {
    return app.id !== id;
  });
  saveApplications(applications);
}

function generateId() {
  return "app_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7);
}