import {
  useContext,
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useOktaAuth } from "@okta/okta-react";
import type { UserClaims, AuthState } from "@okta/okta-auth-js";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children?: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const { oktaAuth, authState } = useOktaAuth();
  const [user, setUser] = useState<UserClaims | null>(null);

  useEffect(() => {
    if (authState?.isAuthenticated) {
      // Get user info from Okta
      oktaAuth.getUser().then((userInfo) => {
        setUser(userInfo);
      });
    } else {
      setUser(null);
    }
  }, [authState?.isAuthenticated, oktaAuth]);

  const loginAction = async () => {
    try {
      await oktaAuth.signInWithRedirect();
    } catch (err) {
      console.error(err);
    }
  };

  async function logOut() {
    try {
      await oktaAuth.signOut();
      setUser(null);
    } catch (err) {
      console.warn("Logout failed:", err);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token: authState?.accessToken?.accessToken,
        user,
        loginAction,
        logOut,
        isAuthenticated: authState?.isAuthenticated,
        authState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthContextType {
  token?: string;
  user: UserClaims | null;
  loginAction: () => Promise<void>;
  logOut: () => Promise<void>;
  isAuthenticated?: boolean;
  authState: AuthState | null;
}
