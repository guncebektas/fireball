import Swal from 'sweetalert2'

export const ToastWarning = (text = 'An error occurred, please try again', object = {}) => {
  let options = {
    toast: true,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    position: 'top-end',
    icon: 'warning',
    text: i18n.__(text),
    showCloseButton: true,
    showConfirmButton: false
  };

  options = {...options, ...object};

  Swal.fire(options);
}

export const ToastError = (text = 'An error occurred, please try again', object = {}) => {
  let options = {
    toast: true,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    position: 'top-end',
    icon: 'error',
    text: i18n.__(text),
    showCloseButton: true,
    showConfirmButton: false
  };

  options = {...options, ...object};

  Swal.fire(options);
}

export const ToastSuccess = (text = 'Completed successfully', object = {}) => {
  let options = {
    toast: true,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    position: 'top-end',
    icon: 'success',
    text: i18n.__(text),
    showCloseButton: true,
    showConfirmButton: false
  };

  options = { ...options, ...object };

  Swal.fire(options);
};
