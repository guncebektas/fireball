import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

class UiUtility {
  async confirm(callback, t) {
    await withReactContent(Swal).fire({
      title: t('Warning'),
      text: `${t('Are you sure')}?`,
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonText: t('Cancel'),
      confirmButtonText: t('Confirm'),
      preConfirm: async () => {
        await callback();
      },
    })
  }
}

export const uiUtility = new UiUtility();
