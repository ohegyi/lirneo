import type { Session, User } from "@supabase/supabase-js";
import { createContext } from "react";


export type UserProfile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: string | null;
  teacher_id:string | null;
};

type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  setLoading: (val: boolean) => void;
  getAvatarUrl: (requests: any[]) => Promise<Record<string, string>>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);