import { Input } from "@heroui/input";
import { Search } from "lucide-react";
import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar, NavbarBrand,
  NavbarContent, NavbarItem,
} from "@heroui/navbar";

export const Navbar = () => (
  <HeroUINavbar
    maxWidth="full"
    position="sticky"
    className="bg-[#001f33] h-14 border-b border-white/5"
  >
    <NavbarContent justify="start">
      <NavbarBrand>
        <Link href="/" className="flex items-center gap-2">
          <img src="/img/logo.png" className="h-7 w-auto object-contain" />
          <span className="font-semibold text-white text-sm tracking-wide">EPSAS</span>
        </Link>
      </NavbarBrand>
    </NavbarContent>

    <NavbarContent justify="end">
      <NavbarItem>
        <Input
          aria-label="Buscar"
          classNames={{
            inputWrapper: [
              "bg-white/5 border border-white/10",
              "hover:border-white/20 focus-within:border-[#39A900]/60",
              "transition-colors h-8 w-64",
            ].join(" "),
            input: "text-xs text-white placeholder:text-white/30",
          }}
          placeholder="Buscar..."
          startContent={<Search size={13} className="text-white/30 flex-shrink-0" />}
          type="search"
        />
      </NavbarItem>
    </NavbarContent>
  </HeroUINavbar>
);