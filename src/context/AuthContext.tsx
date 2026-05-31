import {
  createContext,
  useEffect,
  useState,
  useContext,
  type ReactNode,
} from "react";
import type { User } from "../types";
import { authClient } from "../lib/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
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

  return (
    <AuthContext.Provider
      value={{
        user: neonUser,
        isLoading,
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
