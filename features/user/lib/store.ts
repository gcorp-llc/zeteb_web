import { create } from "zustand";

type ModalType = "header" | "about" | "education" | "skills" | "contact" | "avatar" | "cover" | null;

interface UserStore {
  activeModal: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  activeModal: null,
  openModal: (type) => set({ activeModal: type }),
  closeModal: () => set({ activeModal: null }),
}));
