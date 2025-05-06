import Swal from 'sweetalert2';

// Default options for SweetAlert
const defaultOptions = {
  confirmButtonColor: '#3B82F6', // Tailwind blue-500
  cancelButtonColor: '#EF4444', // Tailwind red-500
};

const notificationService = {
  // Success notification
  success: (title, message = '') => {
    return Swal.fire({
      ...defaultOptions,
      title,
      text: message,
      icon: 'success',
      toast: false,
      timer: 3000,
      timerProgressBar: true,
    });
  },

  // Error notification
  error: (title, message = '') => {
    return Swal.fire({
      ...defaultOptions,
      title,
      text: message,
      icon: 'error',
    });
  },

  // Warning notification
  warning: (title, message = '') => {
    return Swal.fire({
      ...defaultOptions,
      title,
      text: message,
      icon: 'warning',
    });
  },

  // Info notification
  info: (title, message = '') => {
    return Swal.fire({
      ...defaultOptions,
      title,
      text: message,
      icon: 'info',
    });
  },

  // Confirmation dialog
  confirm: (title, message = '', confirmText = 'Yes', cancelText = 'No') => {
    return Swal.fire({
      ...defaultOptions,
      title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
    });
  },

  // Toast notification (small notification at top)
  toast: (title, icon = 'success') => {
    return Swal.fire({
      ...defaultOptions,
      title,
      icon,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  },

  // Input dialog
  input: (title, inputType = 'text', inputPlaceholder = '', initialValue = '') => {
    return Swal.fire({
      ...defaultOptions,
      title,
      input: inputType,
      inputPlaceholder,
      inputValue: initialValue,
      showCancelButton: true,
    });
  },

  // Custom modal dialog
  modal: (options) => {
    return Swal.fire({
      ...defaultOptions,
      ...options,
    });
  },
};

export default notificationService;
