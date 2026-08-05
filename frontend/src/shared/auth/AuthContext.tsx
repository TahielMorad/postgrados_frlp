import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { UsuarioAuth } from "../api/types";
import { loginApi } from "../api/authApi";

interface AuthContextType {
  usuario: UsuarioAuth | null;
  token: string | null;
  cargando: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_USER_KEY = "posgrados_auth_user";
const AUTH_TOKEN_KEY = "auth_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioAuth | null>(() => {
    const savedUser = localStorage.getItem(AUTH_USER_KEY);
    if (savedUser) {
      try {
        return JSON.parse(savedUser) as UsuarioAuth;
      } catch {
        localStorage.removeItem(AUTH_USER_KEY);
      }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  });

  const [cargando] = useState(false);

  const login = async (email: string, pass: string) => {
    const response = await loginApi(email, pass);
    setUsuario(response.usuario);
    setToken(response.accessToken);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.usuario));
    localStorage.setItem(AUTH_TOKEN_KEY, response.accessToken);
  };

  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  };

  return (
    <AuthContext.Provider value={{ usuario, token, cargando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
