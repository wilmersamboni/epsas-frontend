import { createContext, useContext, useState } from "react";
import { validarCredencial } from "@/api/credencialesApi";

type Usuario = {
  nombre?: string;
  cargo?: string;
  correo?:string;
};

type AuthContextType = {
  user: Usuario | null;
  login: (data: { login: string; password: string }) => Promise<void>;
  logout: () => void;
  actualizarUser: (datos: Partial<Usuario>) => void;
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
    localStorage.setItem("token", resp.token);
    setUser(resp.usuario);
  };

  const actualizarUser = (datos: Partial<Usuario>) => {
    setUser(prev => {
      const nuevo = { ...prev, ...datos };
      localStorage.setItem("user", JSON.stringify(nuevo));
      return nuevo;
    });
  };

  const logout = async () => {
    // opcional: llamar endpoint /logout
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, actualizarUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth fuera de AuthProvider");
  return ctx;
};
