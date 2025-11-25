// import React, { useState } from 'react';

// import SiderBar from './components/SiderBar';
// import Header from './components/Header';
// import Card from './components/Card';
// import Footer from './components/Footer';
// import Form from './components/Form';
// import { SlHome, SlArrowLeftCircle } from "react-icons/sl";
// import { IoAddCircleOutline } from "react-icons/io5";// 🔑 Nuevo Componente
// import RegistrarDepartamento from './components/RegistrarDepartamento';
// import './App.css';
// import type { SiderBarMenu, SiderBarMenuCard, SiderBarMenuLogo } from './types/SiderBar'




// const ProtectedLayout = ({ isAuthenticated, items, card, logo, headerData }) => {
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return (
//     <div className="flex flex-col min-h-screen overflow-y">
//       <Header headerData={headerData} />
//       <div className="flex flex-1">
//         <SiderBar items={items} card={card} logo={logo} />

//         {/* Contenido dinámico de las rutas */}
//         <div className="flex flex-1 p-6 pb-40">
//           <Outlet />
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };



// function App() { // Renombrado de Apps a App (convención)
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // --- TUS DATOS (Movidos fuera del if para ser accesibles siempre) ---
//   const items: SiderBarMenu[]= [
//     { id: 1, title: 'Home', icon: SlHome, url: '/home' },
//     // 🔑 Enlace al nuevo componente:
//     { id:6, title:"Registrar Depto", icon:IoAddCircleOutline, url:"/admin/departamentos"}, 
//     // ...
//     { 
//       id:7, // Cambiado de 6 a 7 para evitar duplicidad de ID
//       title:"Cerrar sesion", 
//       icon: SlArrowLeftCircle, 
//       url: "/login",
//       onClick: () => setIsAuthenticated(false) 
//     }
//   ]
//   // ... (Resto de card, logo, headerData, cardData)
  
//   // Datos del Sidebar, Card, Header, etc.
//   // ... (Mantenemos la definición de card, logo, headerData, cardData aquí) ...
// //   const card: SiderBarMenuCard= { /* ... */ }
// //   const logo: SiderBarMenuLogo = { /* ... */ }
// //   const headerData: HeaderInput = { /* ... */ }
// //   const cardData: CardsInfo[] = [ /* ... */ ];


//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true);
//   };
  
//   // Creamos un componente para la ruta principal (el grid de Cards)
//   const CardsPage = () => (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//       {cardData.map((c, index) => (
//         <Card key={index} {...c} />
//       ))}
//     </div>
//   );

//   return (
//     // 1. BrowserRouter en el nivel superior
//       <Routes>
//         {/* 2. Ruta de Login (Pública) */}
//         <Route 
//           path="/login" 
//           element={
//             <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
//               <Form onLoginSuccess={handleLoginSuccess} />
//             </div>
//           } 
//         />
        
//         {/* 3. Rutas Protegidas (Requieren autenticación) */}
//         <Route 
//           path="/*" 
//           element={
//             <ProtectedLayout 
//               isAuthenticated={isAuthenticated} 
//               items={items} 
//               card={card} 
//               logo={logo} 
//               headerData={headerData}
//             />
//           }
//         >
//           {/* Ruta del Dashboard (Contenido por defecto) */}
//           <Route index element={<CardsPage />} /> 

//           {/* 🔑 Ruta para la gestión de departamentos */}
//           <Route 
//             path="admin/departamentos" 
//             element={<RegistrarDepartamento />} 
//           />
          
//           {/* ... otras rutas protegidas aquí ... */}
          
//           {/* Opcional: Redirigir cualquier otra ruta dentro de /* a Home */}
//           <Route path="*" element={<Navigate to="/" replace />} />
          
//         </Route>
        
//       </Routes>
//   );
// }

// export default App;