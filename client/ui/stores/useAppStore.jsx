import {create} from 'zustand';

export const useAppStore = create((set) => ({
  showSidebarMenu: false,
  toggleSidebarMenu: () => {
    alert(!this.showSidebarMenu)
    set({showSidebarMenu: !this.showSidebarMenu})
  }
}));
