import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchCheckIcon } from "lucide-react";
import { Logo, TwitterIcon } from "@/components/icons";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-white/10 border border-white/20",
        input: "text-sm text-white placeholder:text-white/50",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block text-white/60" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchCheckIcon className="text-white/60 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar
      maxWidth="full"
      position="sticky"
      className="bg-[#00304D] text-white border-b border-[#004d7a] shadow-md"
    >
      {/* LOGO */}
      <NavbarContent className="basis-auto sm:basis-full" justify="start">
        <NavbarBrand className="gap-0 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1 text-white"
            color="foreground"
            href="/"
          >
            <Logo />
            <p className="font-bold text-white">EPSAS</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* DERECHA DESKTOP */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
      </NavbarContent>

      {/* DERECHA MOBILE */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github}>
          <TwitterIcon className="text-white" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle className="text-white" />
      </NavbarContent>

      {/* MENÚ MOBILE */}
      <NavbarMenu className="bg-[#00304D] pt-4">
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                className="text-white"
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};