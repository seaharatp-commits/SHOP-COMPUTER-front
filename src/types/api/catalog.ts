export interface CategoryDto {
  id: string;
  code: string;
  nameTh: string;
  sortOrder: number;
}

export interface ComponentDto {
  id: string;
  categoryId: string;
  name: string;
  brand: string;
  price: string; // Prisma Decimal serialized as string
  imageUrl: string | null;
  specs: string[];
  stockQty: number;
  isRecommended: boolean;
  isActive: boolean;
  category?: CategoryDto;
}

export interface PrebuiltSetItemDto {
  id: string;
  prebuiltSetId: string;
  categoryId: string;
  componentId: string;
  component: ComponentDto;
  category: CategoryDto;
}

export interface PrebuiltSetDto {
  id: string;
  name: string;
  tagline: string | null;
  imageUrl: string | null;
  badge: string | null;
  isActive: boolean;
  items: PrebuiltSetItemDto[];
  price: number;
}
