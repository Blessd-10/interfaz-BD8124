import { create } from "zustand";

const useGlobalStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  selectedCategory: null,
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  selectedFolder: "Rec",
  setSelectedFolder: (selectedFolder) => set({ selectedFolder }),
}));

export default useGlobalStore;
