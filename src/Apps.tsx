import React, { useState, useCallback } from 'react'; // Agregamos useCallback
import SiderBar from './components/SiderBar';
import './App.css';
import type { SiderBarMenu, SiderBarMenuCard, SiderBarMenuLogo } from './types/SiderBar';
import { SlFolderAlt, SlDoc, SlBubbles, SlBell, SlHome, SlArrowLeftCircle } from "react-icons/sl";
import { IoAddCircleOutline } from "react-icons/io5";
import './App.css'
import imagePerfil from './assets/perfil.jpg'
import imageLogo from './assets/logo.jpg'
import Header from './components/Header';
import type { HeaderInput } from './types/Header';
import Card from './components/Card';
import type { CardsInfo } from './types/Cards';
import Footer from './components/Footer';
import Form from './components/Form';

// Importa el componente de registro y sus tipos (si los tienes en un archivo separado)
import RegistrarDepartamento from './components/RegistrarDepartamento';
import type { inputDepartamento, registrarDepartamento } from './types/departamento'; // Asume esta ruta de tipos


// Definición de las vistas posibles
type View = 'home' | 'departamentos' | 'seguimiento' | 'formatos' | 'notificaciones' | 'mychat';

function Apps() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // 1. Nuevo estado para rastrear la vista actual, iniciada en 'home'
  const [currentView, setCurrentView] = useState<View>('home'); 

  // --- Lógica de Registro (Placeholder) ---
  const handleRegistrarDepartamento: registrarDepartamento = useCallback((data) => {
    console.log("Datos a registrar:", data);
    // Aquí iría tu lógica real para guardar los datos
    alert(`Departamento "${data.nombre}" registrado (simulado).`);
    // Opcional: Volver a la vista de inicio después del registro
    // setCurrentView('home'); 
  }, []);

  const initialInput: inputDepartamento = { nombre: '' };

  // ------------------------------------------

  // Función que se llama cuando se hace clic en un elemento del SiderBar
  const handleMenuClick = useCallback((url: string) => {
    // Convierte la URL a un tipo de vista conocido
    // Esto es un ruteo simple basado en URL, si la URL es '/departamentos', la vista es 'departamentos'
    const viewName = url.replace('/', '') as View;
    
    // Si es la URL de cerrar sesión, no cambiamos la vista, la prop tiene un onClick directo.
    if (viewName !== '#') { 
      setCurrentView(viewName);
    }
  }, []);

  // --- TUS DATOS (Actualizados para usar handleMenuClick) ---
  const items: SiderBarMenu[]= [
    { id: 1, title: 'Home', icon: SlHome, url: '/home', onClick: () => handleMenuClick('/home') },
    { id:2, title:"Seguimiento", icon: SlFolderAlt, url: "/seguimiento", onClick: () => handleMenuClick('/seguimiento') },
    { id:3, title:"Formatos", icon: SlDoc, url: "/formatos", onClick: () => handleMenuClick('/formatos') },
    { id:4, title:"Notificaciones", icon:SlBell, url: "/notificaciones", onClick: () => handleMenuClick('/notificaciones') },
    { id:5, title:"MyChat", icon: SlBubbles, url: "/mychat", onClick: () => handleMenuClick('/mychat') },
    // El elemento clave que quieres redirigir
    {id:6, title:"Registrar", icon:IoAddCircleOutline, url:"/departamentos", onClick: () => handleMenuClick('/departamentos')},
    { 
      id:7, 
      title:"Cerrar sesion", 
      icon: SlArrowLeftCircle, 
      url: "#",
      // Mantenemos el onClick original para cerrar sesión
      onClick: () => setIsAuthenticated(false) 
    }
  ]

  // ... (Resto de tus datos: card, logo, headerData, cardData se mantienen igual)
  const card: SiderBarMenuCard = { id: '1', displayName: 'John Doe', fotoUrl: imagePerfil, title: 'Developer' };
  const logo: SiderBarMenuLogo = { id:"1", fotoUrl:imageLogo };
  const headerData: HeaderInput = { title: "EPSAS", search: "Buscar coincidencias" };
  const cardData: CardsInfo[] = [
    { title:"Seguimiento", foto: imagePerfil, url:"/" },
    { title:"Historial", foto: imagePerfil, url:"/" },
    { title:"Formatos", foto: imagePerfil, url:"/" }
  ];
  // ------------------------------------------


  // 2. Función para renderizar el contenido según la vista actual
  const renderContent = () => {
    switch (currentView) {
      case 'departamentos':
        return (
        // Añadimos 'max-w-md' o 'max-w-lg' al contenedor del formulario
        // para limitar su ancho y que 'justify-center' pueda actuar.
        <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-xl">
            <RegistrarDepartamento input={initialInput} registrar={handleRegistrarDepartamento} />
        </div>
    );
      case 'home':
        // Vista principal (con las cards)
        return (
        // Mantenemos 'w-full max-w-screen-xl' para que el grid se centre y no sea infinito.
        <div className="w-full max-w-screen-xl"> 
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cardData.map((card, index) => (
                    <Card key={index} {...card} />
                ))}
            </div>
        </div>
    );
      case 'seguimiento':
        return <h2 className="text-2xl font-bold text-gray-700">Contenido de Seguimiento</h2>;
      // Añade más casos para las otras vistas (formatos, notificaciones, etc.)
      default:
        return <h2 className="text-2xl font-bold text-gray-700">Página No Encontrada</h2>;
    }
  };


  // Función que se ejecuta cuando el login es exitoso
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Si no está autenticado, mostrar solo el formulario
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Form onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  // Si está autenticado, mostrar la aplicación completa
  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <Header headerData={headerData} />

      {/* CONTENEDOR PRINCIPAL */}
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <SiderBar items={items} card={card} logo={logo} />

        {/* CONTENIDO CENTRADO Y DINÁMICO */}
        <div className="flex flex-1 items-center justify-center p-6 pt-10 pb-40 ">
          {renderContent()} {/* 👈 Renderiza la vista actual */}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Apps;