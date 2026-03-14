import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { User, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function Form() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const redirectTo = (location.state as any)?.from?.pathname || "/";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!loginValue || !password) {
      setServerError("Debes escribir usuario y contraseña.");
      return;
    }

    try {
      setSubmitting(true);
      await login({
        login: loginValue.trim(),
        password,
      });
      navigate(redirectTo, { replace: true });
    } catch (err: any) {
      setServerError(err?.message || "Credenciales incorrectas.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // <div className="min-h-screen bg-gradient-to-br from-[#00304D] via-[#007832] to-[#00304D] flex items-center justify-center p-4 relative overflow-hidden">
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundColor: '#ced4d9',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpolygon points='20,4 36,13 36,31 20,40 4,31 4,13' fill='none' stroke='white' stroke-width='1' opacity='0.12'/%3E%3Ccircle cx='58' cy='20' r='2.5' fill='white' opacity='0.1'/%3E%3Ccircle cx='58' cy='60' r='2.5' fill='white' opacity='0.1'/%3E%3Crect x='52' y='2' width='14' height='14' rx='2' fill='none' stroke='white' stroke-width='0.9' opacity='0.1' transform='rotate(20 59 9)'/%3E%3Cline x1='50' y1='40' x2='70' y2='60' stroke='white' stroke-width='0.8' opacity='0.08'/%3E%3C/svg%3E")`,
      }}
    >
    
      {/* BLOBS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#39A900] rounded-full blur-3xl opacity-[0.02] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#007832] rounded-full blur-3xl opacity-5 animate-pulse delay-700"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 relative z-10">

        {/* IZQUIERDA */}
        <div className="bg-gradient-to-br from-[#39A900] to-[#007832] p-12 flex flex-col justify-between rounded-l-3xl shadow-2xl text-white">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Bienvenido de nuevo
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Accede al sistema EPSAS y gestiona toda tu información desde un solo lugar.
            </p>

            <div className="flex justify-center items-center my-8">
              <img src="public/img/logo.png" className="h-50 w-auto object-contain drop-shadow-2xl"
              style={{
                animation: "float 3s ease-in-out infinite",
                filter: "drop-shadow(0 0 20px rgba(57, 169, 0, 0.4))"
              }}
              />
            </div>
          </div>
          <div className="text-sm text-white/80">
            © {new Date().getFullYear()} EPSAS · Todos los derechos reservados
          </div>
        </div>

        {/* DERECHA */}
        <div className="bg-[#F6F6F6] p-12 flex flex-col justify-center rounded-r-3xl shadow-2xl">
          <form onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold text-[#00304D] mb-3">
              Iniciar Sesión
            </h2>
            <p className="text-gray-600 mb-8">
              Ingresa tus credenciales para continuar
            </p>

            {serverError && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6 text-sm">
                {serverError}
              </div>
            )}

            {/* USUARIO */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#000000] mb-2">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={loginValue}
                  onChange={(e) => setLoginValue(e.target.value)}
                  placeholder="usuario1"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#39A900] focus:border-[#39A900] outline-none transition"
                />
              </div>
            </div>
          
            {/* PASSWORD */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#000000] mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#39A900] focus:border-[#39A900] outline-none transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00304D] transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
                
            {/* OLVIDASTE */}
            <div className="text-right mb-8">
              <button
                type="button"
                onClick={() => navigate("/ForgotPassword")}
                className="text-sm text-[#007832] font-medium hover:text-[#39A900] transition"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* BOTÓN */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-[#39A900] to-[#007832] text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:from-[#007832] hover:to-[#00304D] transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {submitting ? "Ingresando..." : "Ingresar"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
