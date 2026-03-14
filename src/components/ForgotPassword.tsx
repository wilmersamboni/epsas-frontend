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
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-700"></div>
      </div>

      <div className="w-full max-w-5xl mx-auto grid md:grid-cols-2 gap-0 relative z-10 rounded-3xl overflow-hidden shadow-2xl">
        {/* Left Side */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-12 flex flex-col justify-between text-white">
          <div>
            <h2 className="text-4xl font-bold mb-6">Restablecer Contraseña</h2>
            <p className="text-blue-100 text-lg">
              Sigue estos sencillos pasos para recuperar el acceso a tu cuenta de forma segura.
            </p>
          </div>

          <div className="space-y-4">
            <div className={`flex items-center gap-4 p-3 rounded-xl transition ${step >= 1 ? 'bg-white/20' : 'opacity-50'}`}>
              <Mail className="w-6 h-6" />
              <span>1. Ingresa tu correo</span>
            </div>
            <div className={`flex items-center gap-4 p-3 rounded-xl transition ${step >= 2 ? 'bg-white/20' : 'opacity-50'}`}>
              <ShieldCheck className="w-6 h-6" />
              <span>2. Verifica el código</span>
            </div>
            <div className={`flex items-center gap-4 p-3 rounded-xl transition ${step >= 3 ? 'bg-white/20' : 'opacity-50'}`}>
              <KeyRound className="w-6 h-6" />
              <span>3. Crea tu nueva contraseña</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/login')}
            className="text-white hover:text-blue-200 transition-colors flex items-center gap-2 text-sm w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio de sesión
          </button>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white p-12 flex flex-col justify-center">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg text-sm">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Paso 1</h3>
              <p className="text-gray-600 mb-8">Ingresa tu correo electrónico registrado.</p>
              <div className="relative mb-6">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                />
              </div>
              <button
                onClick={handleSolicitar}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Enviar Código"}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Paso 2</h3>
              <p className="text-gray-600 mb-8">Ingresa el código que enviamos a <span className="font-semibold">{email}</span>.</p>
              <div className="relative mb-6">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Código de 6 dígitos"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-center tracking-widest text-xl font-bold text-gray-900"
                />
              </div>
              <button
                onClick={handleVerificar}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Verificando..." : "Verificar Código"}
              </button>
              <button
                onClick={() => setStep(1)}
                className="w-full mt-4 text-gray-500 text-sm hover:underline"
              >
                Cambiar correo
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Paso 3</h3>
              <p className="text-gray-600 mb-8">Ingresa tu nueva contraseña segura.</p>
              <div className="space-y-4 mb-6">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nueva contraseña"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmar contraseña"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                  />
                </div>
              </div>
              <button
                onClick={handleCambiar}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? "Guardando..." : "Restablecer Contraseña"}
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="text-center animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <Check className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">¡Éxito!</h3>
              <p className="text-gray-600 mb-8">Tu contraseña ha sido actualizada correctamente.</p>
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
              >
                Ir al Inicio de Sesión
              </button>
=======
            <div className="min-h-screen bg-gradient-to-br from-[#00304D] via-[#007832] to-[#00304D] flex items-center justify-center p-4 relative overflow-hidden">
            
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-10 w-72 h-72 bg-[#39A900] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#007832] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-700"></div>
            </div>

            <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-0 relative z-10">
              
              {/* izquierda */}
              <div className="bg-gradient-to-br from-[#39A900] to-[#007832] p-12 flex flex-col justify-between rounded-l-3xl shadow-2xl text-white">
                
                <div>
                  <h2 className="text-4xl font-bold mb-6">¿Olvidaste tu Contraseña?</h2>
                  <p className="text-white/90 text-lg mb-8">
                    No te preocupes, sigue las instrucciones para restablecer tu contraseña.
                  </p>
                </div>

                <div>
                  <button 
                    onClick={() => window.history.back()}
                    className="text-white hover:text-[#00304D] transition-colors flex items-center gap-2 text-sm bg-transparent border-none cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Volver al inicio de sesión
                  </button>
                </div>
              </div>

              {/* derecha formulario*/}
              <div className="bg-[#F6F6F6] p-12 flex flex-col justify-center rounded-r-3xl shadow-2xl">
                {!isSubmitted ? (
                  <>
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-[#00304D] mb-3">
                        Recuperar Contraseña
                      </h2>
                      <p className="text-gray-600">
                        Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-[#000000] mb-2">
                          Correo Electrónico
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            onKeyPress={handleKeyPress}
                            placeholder="correo@email.com"
                            required
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#39A900] focus:border-[#39A900] outline-none transition-all"
                          />
                        </div>
                      </div>

                      <button
                        onClick={handleSubmit}
                        className="w-full bg-gradient-to-r from-[#39A900] to-[#007832] text-white py-3 rounded-lg font-medium hover:from-[#007832] hover:to-[#00304D] transform hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl"
                      >
                        Enviar Enlace de Recuperación
                      </button>
                    </div>
                  </>
                ) : (
                  //despues de enviar el correo muestra la validacion
                  <div className="text-center">
                    <div className="w-20 h-20 bg-[#39A900]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-[#007832]" />
                    </div>
                    
                    <h2 className="text-3xl font-bold text-[#00304D] mb-3">
                      ¡Correo Enviado!
                    </h2>
                    
                    <p className="text-gray-600 mb-8">
                      Hemos enviado un enlace de recuperación a<br />
                      <span className="font-medium text-[#00304D]">{email}</span>
                    </p>

                    <div className="bg-[#39A900]/10 border border-[#39A900]/30 rounded-lg p-4 mb-6">
                      <p className="text-sm text-gray-700">
                        Revisa tu bandeja de entrada y sigue las instrucciones. Si no ves el correo, verifica tu carpeta de spam.
                      </p>
                    </div>

                    <button
                      onClick={handleBack}
                      className="w-full bg-white border border-gray-300 text-[#00304D] py-3 rounded-lg font-medium hover:bg-gray-100 transition-all"
                    >
                      Volver
                    </button>

                    <p className="text-sm text-gray-600 mt-6">
                      ¿No recibiste el correo?{' '}
                      <button 
                        onClick={handleSubmit}
                        className="text-[#007832] font-medium hover:text-[#39A900] transition-colors bg-transparent border-none cursor-pointer"
                      >
                        Reenviar
                      </button>
                    </p>
                  </div>
                )}
              </div>
>>>>>>> Inicio
            </div>
          </div>
  );
};

export default PasswordRecovery;
