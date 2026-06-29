import {
  createContext,
  useEffect,
  useState,
  useContext,
  type ReactNode,
} from "react";
import type { User, UserProfile } from "../types";
import { authClient } from "../lib/auth";
import { api } from "../lib/api";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  saveProfile: (profile: Omit<UserProfile, "userId" | "updatedAt">) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [neonUser, setNeonUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      try {
        const result = await authClient.getSession();
        if (isMounted && result?.data?.user) {
          setNeonUser(result.data.user as unknown as User);
        } else if (isMounted) {
          setNeonUser(null);
        }
      } catch (err) {
        console.error("Auth error", err);
        setNeonUser(null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);
  
  async function saveProfile(
    profileData: Omit<UserProfile, "userId" | "updatedAt">,
  ){
    if(!neonUser){
      throw new Error("User must be authenticated to save profile")
    }
    
    await api.saveProfile(neonUser.id, profileData);
  }

  return (
    <AuthContext.Provider
      value={{
        user: neonUser,
        isLoading,
        saveProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
