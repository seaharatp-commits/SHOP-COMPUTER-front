export type ComponentCategory =
  | "cpu"
  | "mainboard"
  | "gpu"
  | "ram"
  | "storage"
  | "psu"
  | "case"
  | "cooler";

export interface ComponentOption {
  id: string;
  category: ComponentCategory;
  name: string;
  brand: string;
  price: number;
  image: string;
  specs: string[];
  recommended?: boolean;
}

export type PCBuild = Partial<Record<ComponentCategory, ComponentOption>>;

export interface PrebuiltSet {
  id: string;
  name: string;
  tagline: string;
  image: string;
  price: number;
  badge?: string;
  build: PCBuild;
}
