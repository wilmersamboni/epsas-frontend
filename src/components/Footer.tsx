import React from "react";
import { MapPin } from "lucide-react";
import {
  FacebookIcon,
  TikTokIcon,
  TwitterIcon,
  YoutubeIcon
} from "@/components/icons";

interface FooterProps {
  className?: string;
}

export const Footer = ({ className = "" }: FooterProps) => {
  return (
    <footer
      className={`w-full backdrop-blur bg-gray-900 text-white border-t border-white/20 py-8 mt-10 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6">

        {/* Columna 1 */}
        <div>
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} EPSAS — Todos los derechos reservados
          </p>
        </div>

        {/* Columna 2 */}
        <div className="flex justify-center gap-6">
          <a href="#" className="hover:opacity-70 transition">
            <FacebookIcon size={22} />
          </a>
          <a href="#" className="hover:opacity-70 transition">
            <TwitterIcon size={22} />
          </a>
          <a href="#" className="hover:opacity-70 transition">
            <TikTokIcon size={22} />
          </a>
          <a href="#" className="hover:opacity-70 transition">
            <YoutubeIcon size={22} />
          </a>
        </div>

        {/* Columna 3 */}
        <div className="flex flex-col items-end text-right">
          <p className="text-sm flex items-center gap-2 opacity-80">
            <MapPin size={18} /> Calle 123 #45-67, Bogotá, Colombia
          </p>

          <div className="flex gap-4 mt-2">
            <a href="/privacidad" className="text-sm hover:underline opacity-80">
              Política de privacidad
            </a>
            <a href="/terminos" className="text-sm hover:underline opacity-80">
              Términos de uso
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
