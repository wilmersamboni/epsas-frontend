import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Save } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { Footer } from '@/components/Footer';

import axios from "axios";
import { useEffect } from "react";
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('perfil');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [formData, setFormData] = useState({
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
          Authorization: `Bearer ${token}` // ← agrega esto
        }
      }
    );
    const data = response.data;
    console.log("DATA recibida:", data); // ← verifica qué llega

    setFormData(prev => ({
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
          nombre: formData.nombre,
          correo: formData.email,
          telefono: formData.telefono,
          direccion: formData.ubicacion,
          genero: perfilActual.genero,
          fk_municipo: perfilActual.fk_municipo,
          cargo: perfilActual.cargo,
          estado: perfilActual.estado
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      actualizarUser({ nombre: formData.nombre });
      localStorage.setItem("correo", formData.email);
      alert("Perfil actualizado");
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const tabs = [
    { id: 'perfil', label: 'Perfil', icon: User }
  ];

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
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Navbar */}
        <div className="flex items-center px-4 h-16 border-b bg-white">
          <Navbar />
        </div>

        {/* Contenido de configuración */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <div className="h-full p-4">
          <div className="max-w-6xl mx-auto h-full flex flex-col">
            
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-white mb-1">Configuración</h1>
              <p className="text-blue-200">Administra tu cuenta y preferencias</p>
            </div>

            <div className="grid md:grid-cols-4 gap-4 flex-1 overflow-hidden">
              
              {/* sidebar de configuracion*/}
              <div className="md:col-span-1 overflow-y-auto">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-3 border border-white/20 h-full sticky top-0">
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
              <div className="md:col-span-3 overflow-y-auto">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 h-full">
                  
                  {/* perfil del sidebar de configuracion */}
                  {activeTab === 'perfil' && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-white mb-4">Información Personal</h2>
                      
                      <div className="flex items-center gap-6 mb-6">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                          {formData.nombre
                            ? formData.nombre.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
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
                            value={formData.nombre}
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
                            value={formData.email}
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
                            value={formData.telefono}
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
                            value={formData.ubicacion}
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

                </div>
              </div>
            </div>
          </div>
          </div>
        </main>

        {/* Footer */}
        <Footer className="rounded-r-xl" />
      </div>
    </div>
  );
}