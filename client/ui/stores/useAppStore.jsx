import {create} from 'zustand';

export const useAppStore = create((set) => ({
  isSidebarOpen: window.innerWidth > 768,
  openSidebar: () => set({ isSidebarOpen: true}),
  closeSidebar: () => set({ isSidebarOpen: false }),
}));
