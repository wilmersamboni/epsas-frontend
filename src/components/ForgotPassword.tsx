import React, { useState } from 'react';
import { Mail, ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { solicitarRecuperacion, verificarCodigo, cambiarPassword } from '@/api/authApi';

const PasswordRecovery: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSolicitar = async () => {
    if (!email) return setError("El correo es obligatorio");
    try {
      setLoading(true);
      setError(null);
      await solicitarRecuperacion(email);
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al enviar el código");
    } finally {
      setLoading(false);
    }
  };

  const handleVerificar = async () => {
    if (!code) return setError("El código es obligatorio");
    try {
      setLoading(true);
      setError(null);
      await verificarCodigo(email, code);
      setStep(3);
    } catch (err: any) {
      setError(err.response?.data?.error || "Código inválido o expirado");
    } finally {
      setLoading(false);
    }
  };

  const handleCambiar = async () => {
    if (!newPassword || !confirmPassword)
      return setError("Todos los campos son obligatorios");
    if (newPassword !== confirmPassword)
      return setError("Las contraseñas no coinciden");

    try {
      setLoading(true);
      setError(null);
      await cambiarPassword(email, code, newPassword);
      setStep(4);
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al cambiar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundColor: '#ced4d9',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpolygon points='20,4 36,13 36,31 20,40 4,31 4,13' fill='none' stroke='white' stroke-width='1' opacity='0.35'/%3E%3Ccircle cx='58' cy='20' r='2.5' fill='white' opacity='0.28'/%3E%3Ccircle cx='58' cy='60' r='2.5' fill='white' opacity='0.1'/%3E%3Crect x='52' y='2' width='14' height='14' rx='2' fill='none' stroke='white' stroke-width='0.9' opacity='0.1' transform='rotate(20 59 9)'/%3E%3Cline x1='50' y1='40' x2='70' y2='60' stroke='white' stroke-width='0.8' opacity='0.08'/%3E%3C/svg%3E")`,
      }}>

      <div className="w-full max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 rounded-3xl">

        {/* izquierda */}
        <div className="bg-gradient-to-br from-[#39A900] to-[#007832] p-12 flex flex-col justify-between rounded-l-3xl shadow-2xl text-white">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              ¿Olvidaste tu contraseña?
            </h2>

            <p className="text-lg opacity-90">
              Para recueprar tu accceso al sistema de manera segura, sigue los siguentes pasos.
            </p>
          </div>

          <div className="flex justify-center items-center my-8">
              <img src="public/img/logo.png" className="h-50 w-auto object-contain drop-shadow-2xl"
              style={{
                animation: "float 3s ease-in-out infinite",
                filter: "drop-shadow(0 0 20px rgba(57, 169, 0, 0.4))"
              }}
              />
            </div>

          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 text-sm"
          >
            <ArrowLeft size={16}/>
            Volver al login
          </button>

        </div>

        {/* derecha */}
        <div className="bg-[#F6F6F6] p-12 flex flex-col justify-center rounded-r-3xl shadow-2xl">

          {/* paso 1 */}
          {step === 1 && (
            <>
              <h2 className="text-3xl font-bold text-[#00304D] mb-6">
                Recuperar contraseña
              </h2>

              <p className="text-gray-600 mb-8">
                Ingresa tu correo para cambiar contraseña
              </p>

              <label className="block text-sm font-medium text-[#000000] mb-2">
                Correo
              </label>

              <div className="relative mb-6">
                <Mail className="absolute left-3 top-3 text-gray-400"/>
                <input
                  type="email"
                  placeholder="correo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg"
                />
              </div>

              {error && (
                  <div className="mb-4 text-red-500 text-sm">
                    {error}
                  </div>
                )}

              <button
                onClick={handleSolicitar}
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#39A900] to-[#007832] text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:from-[#007832] hover:to-[#00304D] transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Enviar código"}
              </button>
            </>
          )}

          {/* paso 2 */}
          {step === 2 && (
            <>
              <h2 className="text-3xl font-bold text-[#00304D] mb-6">
                Verificar código
              </h2>

              <input
                type="text"
                placeholder="Código recibido"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg mb-6"
              />

              <button
                onClick={handleVerificar}
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#39A900] to-[#007832] text-white py-3 rounded-lg"
              >
                {loading ? "Verificando..." : "Verificar código"}
              </button>
            </>
          )}

          {/* paso 3 */}
          {step === 3 && (
            <>
              <h2 className="text-3xl font-bold text-[#00304D] mb-6">
                Nueva contraseña
              </h2>

              <input
                type="password"
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg mb-4"
              />

              <input
                type="password"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg mb-6"
              />

              <button
                onClick={handleCambiar}
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#39A900] to-[#007832] text-white py-3 rounded-lg"
              >
                {loading ? "Cambiando..." : "Cambiar contraseña"}
              </button>
            </>
          )}

          {/* paso 4 */}
          {step === 4 && (
            <div className="text-center">

              <Check className="mx-auto text-green-600 mb-6" size={50}/>

              <h2 className="text-3xl font-bold text-[#00304D] mb-4">
                ¡Contraseña actualizada!
              </h2>

              <button
                onClick={() => navigate("/login")}
                className="bg-[#39A900] text-white px-6 py-3 rounded-lg"
              >
                Ir al login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;
