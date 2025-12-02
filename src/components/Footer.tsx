import React from "react";

const Footer = () => {
  return (
    <footer className=" bottom-0 left-0 w-full bg-gray-800 text-white border-t py-10 ">
      <div className="max-w-5xl mx-auto px-6  flex flex-col sm:flex-row items-center justify-between">

        {/* Texto izquierdo */}
        <p className="text-white text-sm">
          © {new Date().getFullYear()} EPSAS — Todos los derechos reservados
        </p>

        {/* Links */}
        <div className="flex gap-4 mt-3 sm:mt-0">
          <a href="/privacidad" className="text-white  text-sm hover:underline">
            Política de privacidad
          </a>
          <a href="/terminos" className="text-white  text-sm hover:underline">
            Términos de uso
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
