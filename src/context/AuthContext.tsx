import { createContext, useContext, useState } from "react";
import { validarCredencial } from "@/api/credencialesApi";

type Usuario = {
  nombre?: string;
  cargo?: string;
};

type AuthContextType = {
  user: Usuario | null;
  login: (data: { login: string; password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (data: { login: string; password: string }) => {
    const resp = await validarCredencial(data);

    // ✅ SOLO guardas datos públicos
    localStorage.setItem("user", JSON.stringify(resp.usuario));
    setUser(resp.usuario);
  };

  const logout = async () => {
    // opcional: llamar endpoint /logout
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth fuera de AuthProvider");
  return ctx;
};
