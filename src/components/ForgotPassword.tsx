import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Mail, ArrowLeft, Check } from 'lucide-react';

const PasswordRecovery: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (): void => {
    if (email) {
      setIsSubmitted(true);
    }
  };

  const handleBack = (): void => {
    setIsSubmitted(false);
    setEmail('');
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  return (
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
            </div>
          </div>
  );
};

export default PasswordRecovery;