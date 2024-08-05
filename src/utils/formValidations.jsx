export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateForm = (formData, userData) => {
  const newErrors = {};

  if (!formData.username) {
    newErrors.username = "Username is required";
  }

  if (!formData.email) {
    newErrors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    newErrors.email = "Invalid email format";
  }

  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  const usernameExists = userData.some(
    (user) => user.username === formData.username
  );
  if (usernameExists) {
    newErrors.username = "Username already exists";
  }

  return newErrors;
};
