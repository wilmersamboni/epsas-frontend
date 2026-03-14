import React, { useState } from 'react';
import { Mail, ArrowLeft, Check, Lock, ShieldCheck, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { solicitarRecuperacion, verificarCodigo, cambiarPassword } from '@/api/authApi';

const PasswordRecovery: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Email, 2: Code, 3: New Password, 4: Success
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
    if (!newPassword || !confirmPassword) return setError("Todos los campos son obligatorios");
    if (newPassword !== confirmPassword) return setError("Las contraseñas no coinciden");

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-700"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-0 relative z-10">
        {/* izquierda */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-12 flex flex-col justify-between rounded-l-3xl shadow-2xl">
          
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">¿Olvidaste tu Contraseña?</h2>
            <p className="text-blue-100 text-lg mb-8">
              No te preocupes, sigue las instrucciones para restablecer tu contraseña.
            </p>
          </div>

          <div>
            <button 
              onClick={() => window.history.back()}
              className="text-white hover:text-blue-200 transition-colors flex items-center gap-2 text-sm bg-transparent border-none cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio de sesión
            </button>
          </div>
        </div>

        {/* derecha formulario*/}
        <div className="bg-white p-12 flex flex-col justify-center rounded-r-3xl shadow-2xl">
          {!isSubmitted ? (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                  Recuperar Contraseña
                </h2>
                <p className="text-gray-600">
                  Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      onKeyPress={handleKeyPress}
                      placeholder="correo@email.com"
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl"
                >
                  Enviar Enlace de Recuperación
                </button>
              </div>
            </>
          ) : (
            //despues de enviar el correo muestra la validacion
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                ¡Correo Enviado!
              </h2>
              
              <p className="text-gray-600 mb-8">
                Hemos enviado un enlace de recuperación a<br />
                <span className="font-medium text-gray-800">{email}</span>
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  Revisa tu bandeja de entrada y sigue las instrucciones, si no ves el correo, verifica tu carpeta de spam.
                </p>
              </div>

              <button
                onClick={handleBack}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all"
              >
                Volver
              </button>

              <p className="text-sm text-gray-600 mt-6">
                ¿No recibiste el correo?{' '}
                <button 
                  onClick={handleSubmit}
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors bg-transparent border-none cursor-pointer"
                >
                  Reenviar
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;
