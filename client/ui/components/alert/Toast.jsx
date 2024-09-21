import Swal from 'sweetalert2'

export const ToastWarning = async (text = 'An error occurred, please try again', object = {}) => {
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
    text: text,
    showCloseButton: true,
    showConfirmButton: false
  };

  options = {...options, ...object};

  await Swal.fire(options);
}

export const ToastError = async (text = 'An error occurred, please try again', object = {}) => {
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
    text: text,
    showCloseButton: true,
    showConfirmButton: false
  };

  options = {...options, ...object};

  await Swal.fire(options);
}

export const ToastSuccess = async (text = 'Completed successfully', object = {}) => {
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
    text: text,
    showCloseButton: true,
    showConfirmButton: false
  };

  options = {...options, ...object};

  await Swal.fire(options);
}
