import type { IconType } from "react-icons";

export interface SiderBarMenu {
  id: number;
  title: string;
  icon: IconType;
  url: string;
}

export interface SiderBarMenuCard {
  id: string;
  displayName: string;
  fotoUrl: string;
  title: string;
}

export interface SiderBarMenuLogo{
    id:string;
    fotoUrl: string;
}