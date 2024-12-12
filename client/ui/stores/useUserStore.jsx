import {create} from "zustand/index";

export const useUserStore = create((set) => ({
  me: {
    firstname: '',
    lastname: '',
    profilePicture: ''
  },
  setMe: (userProfile) => set({ me: userProfile })
}));
