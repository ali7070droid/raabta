/**
 * Validation service for common validation patterns
 */
const validationService = {
  // Email validation
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Required field validation
  isRequired: (value) => {
    return value !== null && value !== undefined && value.trim() !== '';
  },

  // Min length validation
  minLength: (value, min) => {
    return value && value.length >= min;
  },

  // Max length validation
  maxLength: (value, max) => {
    return value && value.length <= max;
  },

  // Phone number validation (basic)
  isValidPhone: (phone) => {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  },

  // Password strength validation
  isStrongPassword: (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  },

  // Password match validation
  passwordsMatch: (password, confirmPassword) => {
    return password === confirmPassword;
  },

  // Validate form fields with custom rules
  validateForm: (fields, rules) => {
    const errors = {};
    let isValid = true;

    Object.keys(rules).forEach((field) => {
      const value = fields[field];
      const fieldRules = rules[field];

      // Check each rule for the field
      for (const rule of fieldRules) {
        if (rule.type === 'required' && !validationService.isRequired(value)) {
          errors[field] = rule.message || 'This field is required';
          isValid = false;
          break;
        } else if (rule.type === 'email' && !validationService.isValidEmail(value)) {
          errors[field] = rule.message || 'Invalid email address';
          isValid = false;
          break;
        } else if (rule.type === 'minLength' && !validationService.minLength(value, rule.value)) {
          errors[field] = rule.message || `Minimum length is ${rule.value} characters`;
          isValid = false;
          break;
        } else if (rule.type === 'maxLength' && !validationService.maxLength(value, rule.value)) {
          errors[field] = rule.message || `Maximum length is ${rule.value} characters`;
          isValid = false;
          break;
        } else if (rule.type === 'phone' && !validationService.isValidPhone(value)) {
          errors[field] = rule.message || 'Invalid phone number';
          isValid = false;
          break;
        } else if (rule.type === 'password' && !validationService.isStrongPassword(value)) {
          errors[field] =
            rule.message ||
            'Password must be at least 8 characters with uppercase, lowercase and number';
          isValid = false;
          break;
        } else if (
          rule.type === 'match' &&
          !validationService.passwordsMatch(value, fields[rule.field])
        ) {
          errors[field] = rule.message || 'Passwords do not match';
          isValid = false;
          break;
        } else if (rule.type === 'custom' && !rule.validate(value, fields)) {
          errors[field] = rule.message || 'Invalid value';
          isValid = false;
          break;
        }
      }
    });

    return { isValid, errors };
  },
};

export default validationService;
