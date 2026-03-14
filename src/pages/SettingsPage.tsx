import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, Users, Transgender, KeyRoundIcon } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { Footer } from '@/components/Footer';

import axios from "axios";
import { useEffect } from "react";
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('perfil');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [perfilData, setPerfilData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    ubicacion: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const obtenerPerfil = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const personaId = payload.personaId;

    const response = await axios.get(
      `http://localhost:3000/persona/buscar_jwsv/${personaId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const data = response.data;
    console.log("DATA recibida:", data);

    setPerfilData(prev => ({
      ...prev,
      nombre: data.nombre,
      email: data.correo,
      telefono: data.telefono,
      ubicacion: data.direccion
    }));
    localStorage.setItem("correo", data.correo);
  } catch (error) {
    console.error("Error cargando perfil", error);
  }
};

  useEffect(() => {
  obtenerPerfil();
  }, []);

  const { actualizarUser } = useAuth();

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const payload = JSON.parse(atob(token.split('.')[1]));
      const personaId = payload.personaId;

      const { data: perfilActual } = await axios.get(
        `http://localhost:3000/persona/buscar_jwsv/${personaId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await axios.put(
        `http://localhost:3000/persona/actualizar_jwsv/${personaId}`,
        {
          nombre: perfilData.nombre,
          correo: perfilData.email,
          telefono: perfilData.telefono,
          direccion: perfilData.ubicacion,
          genero: perfilActual.genero,
          fk_municipo: perfilActual.fk_municipo,
          cargo: perfilActual.cargo,
          estado: perfilActual.estado
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      actualizarUser({ nombre: perfilData.nombre });
      localStorage.setItem("correo", perfilData.email);
      alert("Perfil actualizado");
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPerfilData(prev => ({ ...prev, [name]: value }));
  };

  const tabs = [
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'usuario', label: 'Usuario', icon: Users}
  ];

  {/*crear los usuarios*/}
  const [usuarioData, setUsuarioData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    genero: "",
    fk_municipio: "",
    cargo: "",
    login: "",
    password: "",
    fk_rol: ""
  });
  
  const handleUsuarioChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUsuarioData(prev => ({ ...prev, [name]: value }));
  };
  
  const crearUsuario = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
    
      //Crear persona
      const personaRes = await axios.post(
        "http://localhost:3000/persona/registrar_jwsv",
        {
          nombre: usuarioData.nombre,
          telefono: usuarioData.telefono,
          direccion: usuarioData.direccion,
          correo: usuarioData.correo,
          genero: usuarioData.genero,
          fk_municipio: Number(usuarioData.fk_municipio),
          cargo: usuarioData.cargo,
          estado: "activo"
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const personaId = personaRes.data.id_persona;
    
      //vincula persona con aplicativo
      const usuarioRes = await axios.post(
        "http://localhost:3000/usuario/registrar_jwsv",
        {
          fk_persona: personaId,
          fk_aplicativo: 1
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const usuarioId = usuarioRes.data.crearUsuario_jwsv.id_usuario;
    
      //Crear credencial
      await axios.post(
        "http://localhost:3000/credencial/registrar_jwsv",
        {
          login: usuarioData.login,
          password: usuarioData.password,
          fk_usuario: usuarioId,
          fk_rol: Number(usuarioData.fk_rol)
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    
      alert("Usuario creado correctamente");
      setUsuarioData({
        nombre: "", correo: "", telefono: "", direccion: "",
        genero: "", fk_municipio: "", cargo: "", login: "", password: "", fk_rol: ""
      });
    } catch (error: any) {
      console.error("Error al crear usuario:", error);
      alert("Error: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
        className="h-screen"
      >
        <Sidebar open={sidebarOpen} />
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 min-h-screen  overflow-y-auto">
        {/* Navbar */}
        <div className="flex items-center px-0 h-16 border-b bg-white">
          <Navbar />
        </div>

        {/* Contenido de configuración */}
        <main className="flex-1 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <div className="h-full p-4">
          <div className="max-w-6xl mx-auto h-full flex flex-col">
            
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-white mb-1">Configuración</h1>
              <p className="text-blue-200">Administra tu cuenta y preferencias</p>
            </div>

            <div className="grid md:grid-cols-4 gap-4 flex-1 overflow-hidden">
              
              {/* sidebar de configuracion*/}
              <div className="md:col-span-1 overflow-y-auto">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 border border-white/20 h-auto md:h-full sticky md:top-0">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all mb-2 ${
                          activeTab === tab.id
                            ? 'bg-blue-600 text-white'
                            : 'text-white/70 hover:bg-white/10'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* contenido principal, lado izquierdo */}
              <div className="md:col-span-3">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/20 h-auto md:h-full">
                  
                  {/* perfil del sidebar de configuracion */}
                  {activeTab === 'perfil' && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-white mb-4">Información Personal</h2>
                      
                      <div className="flex items-center gap-6 mb-6">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                          {perfilData.nombre
                            ? perfilData.nombre.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                            : 'US'}
                        </div>
                        <div>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                            Cambiar foto
                          </button>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-white mb-2 font-medium">
                            <User className="inline mr-2" size={18} />
                            Nombre completo
                          </label>
                          <input
                            type="text"
                            name="nombre"
                            value={perfilData.nombre}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-white mb-2 font-medium">
                            <Mail className="inline mr-2" size={18} />
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={perfilData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-white mb-2 font-medium">
                            <Phone className="inline mr-2" size={18} />
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            name="telefono"
                            value={perfilData.telefono}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-white mb-2 font-medium">
                            <MapPin className="inline mr-2" size={18} />
                            Ubicación
                          </label>
                          <input
                            type="text"
                            name="ubicacion"
                            value={perfilData.ubicacion}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>

                        {/* Botón guardar */}
                        <div className="flex justify-end pt-4">
                          <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                          >
                            <Save size={18} />
                            Guardar cambios
                          </button>
                        </div>

                      </div>
                    </div>
                  )}
                  {/* usuario del sidebar de configuracion */}
                  {activeTab === 'usuario' && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-white mb-4">Crear Usuario</h2>
                  
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Nombre */}
                        <div>
                          <label className="block text-white mb-2 font-medium">
                            <User className="inline mr-2" size={18} />
                            Nombre completo
                          </label>
                          <input
                            type="text"
                            name="nombre"
                            value={usuarioData.nombre}
                            onChange={handleUsuarioChange}
                            placeholder="Ej: Juan Pérez"
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                  
                        {/* Correo */}
                        <div>
                          <label className="block text-white mb-2 font-medium">
                            <Mail className="inline mr-2" size={18} />
                            Email
                          </label>
                          <input
                            type="email"
                            name="correo"
                            value={usuarioData.correo}
                            onChange={handleUsuarioChange}
                            placeholder="correo@ejemplo.com"
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                  
                        {/* Teléfono */}
                        <div>
                          <label className="block text-white mb-2 font-medium">
                            <Phone className="inline mr-2" size={18} />
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            name="telefono"
                            value={usuarioData.telefono}
                            onChange={handleUsuarioChange}
                            placeholder="3001234567"
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                  
                        {/* Dirección */}
                        <div>
                          <label className="block text-white mb-2 font-medium">
                            <MapPin className="inline mr-2" size={18} />
                            Dirección
                          </label>
                          <input
                            type="text"
                            name="direccion"
                            value={usuarioData.direccion}
                            onChange={handleUsuarioChange}
                            placeholder="Calle 123 # 45-67"
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                  
                        {/* Género */}
                        <div>
                          <label className="block text-white mb-2 font-medium">
                            <Transgender className="inline mr-2" size={18} />
                            Género
                          </label>
                          <select
                            name="genero"
                            value={usuarioData.genero}
                            onChange={handleUsuarioChange}
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                          >
                            <option value="" className="bg-slate-800">Seleccionar...</option>
                            <option value="masculino" className="bg-slate-800">Masculino</option>
                            <option value="femenino" className="bg-slate-800">Femenino</option>
                          </select>
                        </div>
                  
                        {/* Cargo */}
                        <div>
                          <label className="block text-white mb-2 font-medium">
                            <KeyRoundIcon className="inline mr-2" size={18} />
                            Cargo
                          </label>
                          <select
                            name="cargo"
                            value={usuarioData.cargo}
                            onChange={handleUsuarioChange}
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                          >
                            <option value="" className="bg-slate-800">Seleccionar...</option>
                            <option value="administrador" className="bg-slate-800">Administrador</option>
                            <option value="instructor" className="bg-slate-800">Instructor</option>
                            <option value="aprendiz" className="bg-slate-800">Aprendiz</option>
                          </select>
                        </div>
                  
                        {/* Municipio */}
                        <div>
                          <label className="block text-white mb-2 font-medium">
                            <MapPin className="inline mr-2" size={18} />
                            ID Municipio
                          </label>
                          <input
                            type="number"
                            name="fk_municipio"
                            value={usuarioData.fk_municipio}
                            onChange={handleUsuarioChange}
                            placeholder="ID del municipio"
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                  
                        {/* Rol */}
                        <div>
                          <label className="block text-white mb-2 font-medium">
                            <Users className="inline mr-2" size={18} />
                            ID Rol
                          </label>
                          <input
                            type="number"
                            name="fk_rol"
                            value={usuarioData.fk_rol}
                            onChange={handleUsuarioChange}
                            placeholder="ID del rol"
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                  
                        {/* Login */}
                        <div>
                          <label className="block text-white mb-2 font-medium">
                            <User className="inline mr-2" size={18} />
                            Login (usuario)
                          </label>
                          <input
                            type="text"
                            name="login"
                            value={usuarioData.login}
                            onChange={handleUsuarioChange}
                            placeholder="nombre_usuario"
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                  
                        {/* Password */}
                        <div>
                          <label className="block text-white mb-2 font-medium">
                            <KeyRoundIcon className="inline mr-2" size={18} />
                            Contraseña
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={usuarioData.password}
                            onChange={handleUsuarioChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                  
                        {/* Botón crear */}
                        <div className="md:col-span-2 flex justify-end pt-4">
                          <button
                            onClick={crearUsuario}
                            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                          >
                            <Save size={18} />
                            Crear usuario
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          </div>
        </main>

        {/* Footer */}
        <Footer/>
      </div>
    </div>
  );
}