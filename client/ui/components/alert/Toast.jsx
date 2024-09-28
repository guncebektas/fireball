import Swal from 'sweetalert2'
import {useTranslator} from "../../providers/i18n";
import {Log} from "meteor/logging";

export const ToastWarning = async (text = 'An error occurred, please try again', object = {}) => {
  const t = useTranslator();

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
    text: t(text),
    showCloseButton: true,
    showConfirmButton: false
  };

  options = {...options, ...object};

  await Swal.fire(options);
}

export const ToastError = async (text = 'An error occurred, please try again', object = {}) => {
  const t = useTranslator();

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
    text: t(text),
    showCloseButton: true,
    showConfirmButton: false
  };

  options = {...options, ...object};

  await Swal.fire(options);
}

export const ToastSuccess = (text = 'Completed successfully', object = {}) => {
  const t = useTranslator();

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
    text: t(text),
    showCloseButton: true,
    showConfirmButton: false
  };

  options = {...options, ...object};

  Swal.fire(options).then(response => Log.debug(response));
}
