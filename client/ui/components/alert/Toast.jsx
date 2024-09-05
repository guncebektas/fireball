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
    text: text,
    showCloseButton: true,
    showConfirmButton: false
  };

  options = {...options, ...object};

  Swal.fire(options).then(r => console.log(r));
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
    text: text,
    showCloseButton: true,
    showConfirmButton: false
  };

  options = {...options, ...object};

  Swal.fire(options).then(r => console.log(r));
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
    text: text,
    showCloseButton: true,
    showConfirmButton: false
  };

  options = {...options, ...object};

  Swal.fire(options).then(r => console.log(r));
}
