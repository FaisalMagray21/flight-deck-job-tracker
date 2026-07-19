// validators.js — form ka data save karne se pehle check karna

// validators.js — form ka data save karne se pehle check karna

function validateApplication(formData) {
  const errors = [];

  if (!formData.company || formData.company.trim() === "") {
    errors.push("Company name is required.");
  }

  if (!formData.role || formData.role.trim() === "") {
    errors.push("Role is required.");
  }

  if (!formData.dateApplied) {
    errors.push("Date applied is required.");
  } else {
    const appliedDate = new Date(formData.dateApplied);
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    if (appliedDate > today) {
      errors.push("Date applied cannot be in the future.");
    }
  }

  const validStatuses = ["Applied", "Interview", "Offer", "Rejected"];
  if (!validStatuses.includes(formData.status)) {
    errors.push("Invalid status selected.");
  }

  // HR email optional hai, lekin agar diya hai to format sahi hona chahiye
  if (formData.hrEmail && formData.hrEmail.trim() !== "") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.hrEmail.trim())) {
      errors.push("HR email format looks invalid.");
    }
  }

  return {
    valid: errors.length === 0,
    errors: errors,
  };
}