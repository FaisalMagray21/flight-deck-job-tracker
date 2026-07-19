// validators.js — form ka data save karne se pehle check karna

function validateApplication(formData) {
  const errors = [];

  // Company khali nahi honi chahiye
  if (!formData.company || formData.company.trim() === "") {
    errors.push("Company name is required.");
  }

  // Role khali nahi honi chahiye
  if (!formData.role || formData.role.trim() === "") {
    errors.push("Role is required.");
  }

  // Date honi chahiye
  if (!formData.dateApplied) {
    errors.push("Date applied is required.");
  } else {
    // Date future mein nahi honi chahiye
    const appliedDate = new Date(formData.dateApplied);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // aaj ka pura din allow karo

    if (appliedDate > today) {
      errors.push("Date applied cannot be in the future.");
    }
  }

  // Status must be ek in valid options mein se
  const validStatuses = ["Applied", "Interview", "Offer", "Rejected"];
  if (!validStatuses.includes(formData.status)) {
    errors.push("Invalid status selected.");
  }

  return {
    valid: errors.length === 0,
    errors: errors,
  };
}