"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as catalogService from "@/services/catalog.service";
import type { CategoryDto } from "@/types/api/catalog";
import type { ComponentCategory, ComponentOption, PrebuiltSet } from "@/types/app/product";

interface CatalogContextValue {
  categories: CategoryDto[];
  components: ComponentOption[];
  prebuiltSets: PrebuiltSet[];
  isLoading: boolean;
  error: string | null;
  categoryOrder: ComponentCategory[];
  categoryLabel: Record<string, string>;
  getOptionsByCategory: (category: ComponentCategory) => ComponentOption[];
  getPrebuiltSetById: (id: string) => PrebuiltSet | undefined;
}

const CatalogContext = createContext<CatalogContextValue | undefined>(undefined);

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [components, setComponents] = useState<ComponentOption[]>([]);
  const [prebuiltSets, setPrebuiltSets] = useState<PrebuiltSet[]>([]);
  console.log("log", prebuiltSets);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([catalogService.getCategories(), catalogService.getComponents(), catalogService.getPrebuiltSets()])
      .then(([categoriesData, componentsData, prebuiltSetsData]) => {
        setCategories([...categoriesData].sort((a, b) => a.sortOrder - b.sortOrder));
        setComponents(componentsData);
        setPrebuiltSets(prebuiltSetsData);
        console.log("log2", prebuiltSetsData);
      })
      .catch(() => setError("ไม่สามารถโหลดข้อมูลสินค้าได้ กรุณาตรวจสอบว่า backend กำลังทำงานอยู่"))
      .finally(() => setIsLoading(false));
  }, []);

  const categoryOrder = useMemo(() => categories.map((c) => c.code as ComponentCategory), [categories]);
  const categoryLabel = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.code, c.nameTh])),
    [categories],
  );

  const getOptionsByCategory = (category: ComponentCategory) =>
    components.filter((option) => option.category === category);

  const getPrebuiltSetById = (id: string) => prebuiltSets.find((set) => set.id === id);

  return (
    <CatalogContext.Provider
      value={{
        categories,
        components,
        prebuiltSets,
        isLoading,
        error,
        categoryOrder,
        categoryLabel,
        getOptionsByCategory,
        getPrebuiltSetById,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog(): CatalogContextValue {
  const context = useContext(CatalogContext);
  if (!context) throw new Error("useCatalog must be used within CatalogProvider");
  return context;
}
