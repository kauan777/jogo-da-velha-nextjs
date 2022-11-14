import create from "zustand";


export type UserProps = {
  id: string;
  nickname: string;
  totalVictory: number;
};

type AuthenticationProps = {
  user: UserProps | null;
  setUser: (state: UserProps | null) => void;
};

export const useAuthentication = create<AuthenticationProps>((set) => ({
  user: null,
  setUser: (state: UserProps | null) => set({ user: state }),
  
}));
