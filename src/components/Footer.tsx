import { MapPin } from "lucide-react";
import { FacebookIcon, TikTokIcon, TwitterIcon, YoutubeIcon } from "@/components/icons";

export const Footer = ({ className = "" }: { className?: string }) => (
  <footer className={`
    w-full bg-[#001f33] border-t border-white/5
    px-6 h-10 flex items-center justify-between
    flex-shrink-0 ${className}
  `}>
    <span className="text-[11px] text-white/30">
      © {new Date().getFullYear()} EPSAS
    </span>

    <div className="flex items-center gap-3">
      {[
        { icon: <FacebookIcon size={14} />, href: "#" },
        { icon: <TwitterIcon  size={14} />, href: "#" },
        { icon: <TikTokIcon   size={14} />, href: "#" },
        { icon: <YoutubeIcon  size={14} />, href: "#" },
      ].map((s, i) => (
        <a key={i} href={s.href}
          className="text-white/25 hover:text-[#39A900] transition-colors">
          {s.icon}
        </a>
      ))}
    </div>

    <div className="flex items-center gap-4">
      <span className="text-[11px] text-white/30 flex items-center gap-1">
        <MapPin size={11} className="text-[#39A900]/70" />
        Bogotá, Colombia
      </span>
      <a href="/privacidad" className="text-[11px] text-white/25 hover:text-white/60 transition-colors">
        Privacidad
      </a>
      <a href="/terminos" className="text-[11px] text-white/25 hover:text-white/60 transition-colors">
        Términos
      </a>
    </div>
  </footer>
);