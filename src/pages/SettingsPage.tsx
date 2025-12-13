import React, { useState } from 'react';
import { User, Lock, Mail, Phone, MapPin, Save, Building2, Plus, Trash2, Edit, Hotel } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { Footer } from '@/components/Footer';

interface Centro {
  id: number;
  nombre: string;
}

interface Sede {
  id: number;
  nombre: string;
  ubicacion: string;
  codigo: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('perfil');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: 'Daniela Sanchez',
    email: 'daniela@example.com',
    telefono: '+57 300 123 4567',
    ubicacion: 'Pitalito, Huila',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // centros de formación predeterminados, para mostrar como se ve
  const [centros, setCentros] = useState<Centro[]>([
    { id: 1, nombre: 'Centro de Formación Pitalito'},
    { id: 2, nombre: 'Centro Industrial' }
  ]);

  // centros de formación predeterminados, para mostrar como se ve
  const [sedes, setSedes] = useState<Sede[]>([
    { id: 1, nombre: 'Centro de Formación Pitalito', ubicacion: 'Pitalito, Huila', codigo: 'CFP001' },
    { id: 2, nombre: 'Centro Industrial', ubicacion: 'Neiva, Huila', codigo: 'CIN002' }
  ]);

  //nuevo centro
  const [nuevoCentro, setNuevoCentro] = useState({
    nombre: ''
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editandoCentro, setEditandoCentro] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCentroInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoCentro(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Guardando configuración:', formData);
    alert('Configuración guardada exitosamente');
  };

  const agregarCentro = () => {
    if (nuevoCentro.nombre) {
      if (editandoCentro !== null) {
        // editar centro
        setCentros(centros.map(c => 
          c.id === editandoCentro 
            ? { ...nuevoCentro, id: editandoCentro }
            : c
        ));
        setEditandoCentro(null);
      } else {
        // agregar centro
        const nuevaId = Math.max(...centros.map(c => c.id), 0) + 1;
        setCentros([...centros, { ...nuevoCentro, id: nuevaId }]);
      }
      
      setNuevoCentro({ nombre: '' });
      setMostrarFormulario(false);
      alert('Centro guardado exitosamente');
    } else {
      alert('Por favor completa todos los campos');
    }
  };

  const editarCentro = (centro: Centro) => {
    setNuevoCentro({ nombre: centro.nombre});
    setEditandoCentro(centro.id);
    setMostrarFormulario(true);
  };

  const eliminarCentro = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este centro?')) {
      setCentros(centros.filter(c => c.id !== id));
      alert('Centro eliminado exitosamente');
    }
  };

  const cancelarEdicion = () => {
    setNuevoCentro({ nombre: '' });
    setEditandoCentro(null);
    setMostrarFormulario(false);
  };

  //nueva sede
  const [nuevaSede, setNuevaSede] = useState({
    nombre: '',
    ubicacion: '',
    codigo: ''
  });

  const [mostrarFormularioSede, setMostrarFormularioSede] = useState(false);
  const [editandoSede, setEditandoSede] = useState<number | null>(null);

  const handleSedeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevaSede(prev => ({ ...prev, [name]: value }));
  };

  const agregarSede = () => {
    if (nuevaSede.nombre && nuevaSede.ubicacion && nuevaSede.codigo) {
      if (editandoCentro !== null) {
        // editar sede
        setSedes(sedes.map(s => 
          s.id === editandoSede 
            ? { ...nuevaSede, id: editandoSede }
            : s
        ));
        setEditandoSede(null);
      } else {
        // agregar sede
        const nuevaId = Math.max(...sedes.map(s => s.id), 0) + 1;
        setSedes([...sedes, { ...nuevaSede, id: nuevaId }]);
      }
      
      setNuevaSede({ nombre: '', ubicacion: '', codigo: '' });
      setMostrarFormularioSede(false);
      alert('Sede guardada exitosamente');
    } else {
      alert('Por favor completa todos los campos');
    }
  };

  const editarSede = (sede: Sede) => {
    setNuevaSede({ nombre: sede.nombre, ubicacion: sede.ubicacion, codigo: sede.codigo });
    setEditandoSede(sede.id);
    setMostrarFormularioSede(true);
  };

  const eliminarSede = (id: number) => {
    if (confirm('¿Estás seguro de eliminar esta Sede?')) {
      setSedes(sedes.filter(s => s.id !== id));
      alert('Sede eliminada exitosamente');
    }
  };

  const cancelarEdicionSede = () => {
    setNuevaSede({ nombre: '', ubicacion: '', codigo: '' });
    setEditandoSede(null);
    setMostrarFormularioSede(false);
  };

  const tabs = [
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'seguridad', label: 'Seguridad', icon: Lock },
    { id: 'administrar', label: 'Administrar', icon: Building2 },
    { id: 'sede', label: 'Sede', icon: Hotel }
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
                          DS
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
                      </div>
                    </div>
                  )}

                  {/* seguridad del sidebar de configuracion */}
                  {activeTab === 'seguridad' && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-white mb-4">Seguridad y Contraseña</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-white mb-2 font-medium">
                            <Lock className="inline mr-2" size={18} />
                            Contraseña actual
                          </label>
                          <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            placeholder="Ingresa tu contraseña actual"
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-white mb-2 font-medium">Nueva contraseña</label>
                          <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            placeholder="Mínimo 8 caracteres"
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-white mb-2 font-medium">Confirmar contraseña</label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirma tu nueva contraseña"
                            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* administrar Centros  del sidebar de configuracion*/}
                  {activeTab === 'administrar' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-white">Centros de Formación</h2>
                        <button
                          onClick={() => setMostrarFormulario(!mostrarFormulario)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                        >
                          <Plus size={20} />
                          Nuevo Centro
                        </button>
                      </div>

                      {/* crud de centro */}
                      {mostrarFormulario && (
                        <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-6 mb-6">
                          <h3 className="text-xl font-bold text-white mb-4">
                            {editandoCentro ? 'Editar Centro' : 'Agregar Nuevo Centro'}
                          </h3>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-white mb-2">Nombre del Centro</label>
                              <input
                                type="text"
                                name="nombre"
                                value={nuevoCentro.nombre}
                                onChange={handleCentroInputChange}
                                placeholder="Ej: Centro de Formación Pitalito"
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-500 outline-none"
                              />
                            </div>
                          </div>

                          <div className="flex gap-3 mt-4">
                            <button
                              onClick={agregarCentro}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            >
                              {editandoCentro ? 'Actualizar' : 'Guardar'}
                            </button>
                            <button
                              onClick={cancelarEdicion}
                              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      )}

                      {/* lista de centros */}
                      <div className="space-y-4">
                        {centros.length === 0 ? (
                          <div className="text-center py-12">
                            <Building2 className="w-16 h-16 text-white/30 mx-auto mb-4" />
                            <p className="text-white/60">No hay centros registrados</p>
                          </div>
                        ) : (
                          centros.map((centro) => (
                            <div
                              key={centro.id}
                              className="bg-white/5 border border-white/20 rounded-lg p-4 hover:bg-white/10 transition"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex gap-4">
                                  <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
                                    <Building2 className="text-white" size={24} />
                                  </div>
                                  <div>
                                    <h3 className="text-white font-bold text-lg">{centro.nombre}</h3>
                                  </div>
                                </div>

                                <div className="flex gap-2">
                                  <button
                                    onClick={() => editarCentro(centro)}
                                    className="p-2 bg-blue-600/50 hover:bg-blue-600 text-white rounded-lg transition"
                                    title="Editar"
                                  >
                                    <Edit size={18} />
                                  </button>
                                  <button
                                    onClick={() => eliminarCentro(centro.id)}
                                    className="p-2 bg-red-600/50 hover:bg-red-600 text-white rounded-lg transition"
                                    title="Eliminar"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* administrar sedes  del sidebar de configuracion*/}
                  {activeTab === 'sede' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-white">Sedes</h2>
                        <button
                          onClick={() => setMostrarFormularioSede(!mostrarFormularioSede)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                        >
                          <Plus size={20} />
                          Nueva Sede
                        </button>
                      </div>

                      {/* crud de sede */}
                      {mostrarFormularioSede && (
                        <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-6 mb-6">
                          <h3 className="text-xl font-bold text-white mb-4">
                            {editandoSede ? 'Editar Sede' : 'Agregar Nueva Sede'}
                          </h3>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-white mb-2">Nombre de la sede</label>
                              <input
                                type="text"
                                name="nombre"
                                value={nuevaSede.nombre}
                                onChange={handleSedeInputChange}
                                placeholder="Ej: sede de Formación Pitalito"
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-500 outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-white mb-2">Código</label>
                              <input
                                type="text"
                                name="codigo"
                                value={nuevaSede.codigo}
                                onChange={handleSedeInputChange}
                                placeholder="Ej: 001"
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-500 outline-none"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-white mb-2">Ubicación</label>
                              <input
                                type="text"
                                name="ubicacion"
                                value={nuevaSede.ubicacion}
                                onChange={handleSedeInputChange}
                                placeholder="Ej: Pitalito, Huila"
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-blue-500 outline-none"
                              />
                            </div>
                          </div>

                          <div className="flex gap-3 mt-4">
                            <button
                              onClick={agregarSede}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            >
                              {editandoSede ? 'Actualizar' : 'Guardar'}
                            </button>
                            <button
                              onClick={cancelarEdicionSede}
                              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      )}

                      {/* lista de sedes */}
                      <div className="space-y-4">
                        {sedes.length === 0 ? (
                          <div className="text-center py-12">
                            <Building2 className="w-16 h-16 text-white/30 mx-auto mb-4" />
                            <p className="text-white/60">No hay sedes registradas</p>
                          </div>
                        ) : (
                          sedes.map((sede) => (
                            <div
                              key={sede.id}
                              className="bg-white/5 border border-white/20 rounded-lg p-4 hover:bg-white/10 transition"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex gap-4">
                                  <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
                                    <Hotel className="text-white" size={24} />
                                  </div>
                                  <div>
                                    <h3 className="text-white font-bold text-lg">{sede.nombre}</h3>
                                    <p className="text-white/60 text-sm">
                                      <MapPin className="inline w-4 h-4 mr-1" />
                                      {sede.ubicacion}
                                    </p>
                                    <p className="text-blue-400 text-sm mt-1">Código: {sede.codigo}</p>
                                  </div>
                                </div>

                                <div className="flex gap-2">
                                  <button
                                    onClick={() => editarSede(sede)}
                                    className="p-2 bg-blue-600/50 hover:bg-blue-600 text-white rounded-lg transition"
                                    title="Editar"
                                  >
                                    <Edit size={18} />
                                  </button>
                                  <button
                                    onClick={() => eliminarSede(sede.id)}
                                    className="p-2 bg-red-600/50 hover:bg-red-600 text-white rounded-lg transition"
                                    title="Eliminar"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* botones de acción (solo para perfil y seguridad) */}
                  {(activeTab === 'perfil' || activeTab === 'seguridad') && (
                    <div className="mt-4 flex justify-end gap-4">
                      <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition flex items-center gap-2"
                      >
                        <Save size={20} />
                        Guardar cambios
                      </button>
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