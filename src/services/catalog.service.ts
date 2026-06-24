import { apiFetch } from "@/lib/api/client";
import type { CategoryDto, ComponentDto, PrebuiltSetDto } from "@/types/api/catalog";
import type { ComponentCategory, ComponentOption, PCBuild, PrebuiltSet } from "@/types/app/product";

const toComponentOption = (dto: ComponentDto): ComponentOption => ({
  id: dto.id,
  category: (dto.category?.code ?? "") as ComponentCategory,
  name: dto.name,
  brand: dto.brand,
  price: Number(dto.price),
  image: dto.imageUrl ?? "/components/cpu.svg",
  specs: dto.specs,
  recommended: dto.isRecommended,
});

const toPrebuiltSet = (dto: PrebuiltSetDto): PrebuiltSet => {
  const build: PCBuild = {};
  for (const item of dto.items) {
    build[item.category.code as ComponentCategory] = toComponentOption(item.component);
  }
  return {
    id: dto.id,
    name: dto.name,
    tagline: dto.tagline ?? "",
    image: dto.imageUrl ?? "/components/pc-starter.svg",
    badge: dto.badge ?? undefined,
    price: dto.price,
    build,
  };
};

export const getCategories = () => apiFetch<CategoryDto[]>("/catalog/categories", { auth: false });

export const getComponents = async (categoryCode?: string): Promise<ComponentOption[]> => {
  const query = categoryCode ? `?category=${categoryCode}` : "";
  const data = await apiFetch<ComponentDto[]>(`/catalog/components${query}`, { auth: false });
  return data.map(toComponentOption);
};

export const getPrebuiltSets = async (): Promise<PrebuiltSet[]> => {
  const data = await apiFetch<PrebuiltSetDto[]>("/catalog/prebuilt-sets", { auth: false });
  console.log("data", data);
  return data.map(toPrebuiltSet);
};

export const getPrebuiltSet = async (id: string): Promise<PrebuiltSet> => {
  const data = await apiFetch<PrebuiltSetDto>(`/catalog/prebuilt-sets/${id}`, { auth: false });
  return toPrebuiltSet(data);
};
