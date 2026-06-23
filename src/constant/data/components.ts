import type { ComponentCategory, ComponentOption } from "@/types/app/product";

export const CATEGORY_LABEL: Record<ComponentCategory, string> = {
  cpu: "ซีพียู (CPU)",
  mainboard: "เมนบอร์ด (Mainboard)",
  gpu: "การ์ดจอ (GPU)",
  ram: "แรม (RAM)",
  storage: "ที่จัดเก็บข้อมูล (Storage)",
  psu: "พาวเวอร์ซัพพลาย (PSU)",
  case: "เคส (Case)",
  cooler: "ระบบระบายความร้อน (Cooler)",
};

export const CATEGORY_ORDER: ComponentCategory[] = [
  "cpu",
  "mainboard",
  "gpu",
  "ram",
  "storage",
  "psu",
  "case",
  "cooler",
];

export const COMPONENT_OPTIONS: ComponentOption[] = [
  // CPU
  { id: "cpu-i5-14600k", category: "cpu", name: "Intel Core i5-14600K", brand: "Intel", price: 11900, image: "/components/cpu.svg", specs: ["14 คอร์ / 20 เธรด", "เทอร์โบ 5.3GHz"] },
  { id: "cpu-i7-14700k", category: "cpu", name: "Intel Core i7-14700K", brand: "Intel", price: 16900, image: "/components/cpu.svg", specs: ["20 คอร์ / 28 เธรด", "เทอร์โบ 5.6GHz"], recommended: true },
  { id: "cpu-r5-7600", category: "cpu", name: "AMD Ryzen 5 7600", brand: "AMD", price: 9900, image: "/components/cpu.svg", specs: ["6 คอร์ / 12 เธรด", "เทอร์โบ 5.1GHz"] },
  { id: "cpu-r7-7800x3d", category: "cpu", name: "AMD Ryzen 7 7800X3D", brand: "AMD", price: 14900, image: "/components/cpu.svg", specs: ["8 คอร์ / 16 เธรด", "เกมมิ่งคอร์อันดับ 1"] },

  // Mainboard
  { id: "mb-b760", category: "mainboard", name: "ASUS TUF B760M-Plus", brand: "ASUS", price: 5900, image: "/components/mainboard.svg", specs: ["Socket LGA1700", "DDR5", "WiFi 6"] },
  { id: "mb-b650", category: "mainboard", name: "MSI B650 Gaming Plus", brand: "MSI", price: 6500, image: "/components/mainboard.svg", specs: ["Socket AM5", "DDR5", "PCIe 4.0"], recommended: true },
  { id: "mb-z790", category: "mainboard", name: "Gigabyte Z790 Aorus Elite", brand: "Gigabyte", price: 9900, image: "/components/mainboard.svg", specs: ["Socket LGA1700", "DDR5", "WiFi 6E"] },

  // GPU
  { id: "gpu-rtx4060", category: "gpu", name: "RTX 4060 8GB", brand: "NVIDIA", price: 12900, image: "/components/gpu.svg", specs: ["8GB GDDR6", "เล่นเกม 1080p ลื่น"] },
  { id: "gpu-rtx4070", category: "gpu", name: "RTX 4070 Super 12GB", brand: "NVIDIA", price: 22900, image: "/components/gpu.svg", specs: ["12GB GDDR6X", "เล่นเกม 1440p"], recommended: true },
  { id: "gpu-rtx4080", category: "gpu", name: "RTX 4080 Super 16GB", brand: "NVIDIA", price: 39900, image: "/components/gpu.svg", specs: ["16GB GDDR6X", "เล่นเกม 4K"] },
  { id: "gpu-rx7600", category: "gpu", name: "Radeon RX 7600 8GB", brand: "AMD", price: 10900, image: "/components/gpu.svg", specs: ["8GB GDDR6", "คุ้มค่าเล่นเกม 1080p"] },

  // RAM
  { id: "ram-16-ddr5", category: "ram", name: "DDR5 16GB (8x2) 6000MHz", brand: "Kingston", price: 2100, image: "/components/ram.svg", specs: ["16GB Dual Channel", "6000MHz"] },
  { id: "ram-32-ddr5", category: "ram", name: "DDR5 32GB (16x2) 6000MHz", brand: "Corsair", price: 3900, image: "/components/ram.svg", specs: ["32GB Dual Channel", "6000MHz"], recommended: true },
  { id: "ram-64-ddr5", category: "ram", name: "DDR5 64GB (32x2) 6000MHz", brand: "G.Skill", price: 7900, image: "/components/ram.svg", specs: ["64GB Dual Channel", "6000MHz"] },

  // Storage
  { id: "ssd-500", category: "storage", name: "NVMe SSD 500GB", brand: "WD", price: 1490, image: "/components/storage.svg", specs: ["PCIe Gen4", "อ่าน 5000MB/s"] },
  { id: "ssd-1tb", category: "storage", name: "NVMe SSD 1TB", brand: "Samsung", price: 2690, image: "/components/storage.svg", specs: ["PCIe Gen4", "อ่าน 7000MB/s"], recommended: true },
  { id: "ssd-2tb", category: "storage", name: "NVMe SSD 2TB", brand: "Samsung", price: 4990, image: "/components/storage.svg", specs: ["PCIe Gen4", "อ่าน 7000MB/s"] },

  // PSU
  { id: "psu-650", category: "psu", name: "PSU 650W 80+ Bronze", brand: "Corsair", price: 2290, image: "/components/psu.svg", specs: ["650W", "80+ Bronze"] },
  { id: "psu-750", category: "psu", name: "PSU 750W 80+ Gold", brand: "Corsair", price: 3290, image: "/components/psu.svg", specs: ["750W", "80+ Gold"], recommended: true },
  { id: "psu-850", category: "psu", name: "PSU 850W 80+ Gold", brand: "Cooler Master", price: 4190, image: "/components/psu.svg", specs: ["850W", "80+ Gold"] },

  // Case
  { id: "case-mid", category: "case", name: "Mid Tower RGB Case", brand: "NZXT", price: 1990, image: "/components/case.svg", specs: ["ATX Mid Tower", "กระจกฝั่งข้าง"] },
  { id: "case-airflow", category: "case", name: "Airflow Tower Case", brand: "Lian Li", price: 2990, image: "/components/case.svg", specs: ["ระบายอากาศดีเยี่ยม", "รองรับ ATX"], recommended: true },
  { id: "case-mini", category: "case", name: "Mini-ITX Compact Case", brand: "Cooler Master", price: 2490, image: "/components/case.svg", specs: ["ขนาดเล็กกะทัดรัด", "เหมาะกับโต๊ะทำงาน"] },

  // Cooler
  { id: "cooler-air", category: "cooler", name: "Air Cooler Tower 120mm", brand: "DeepCool", price: 990, image: "/components/cooler.svg", specs: ["พัดลม 120mm", "เงียบ เย็น"] },
  { id: "cooler-aio240", category: "cooler", name: "AIO Liquid Cooler 240mm", brand: "Corsair", price: 2490, image: "/components/cooler.svg", specs: ["AIO 240mm", "ระบายความร้อนดีเยี่ยม"], recommended: true },
  { id: "cooler-aio360", category: "cooler", name: "AIO Liquid Cooler 360mm", brand: "NZXT", price: 3990, image: "/components/cooler.svg", specs: ["AIO 360mm", "เหมาะกับ CPU ตัวแรง"] },
];

export const getOptionsByCategory = (category: ComponentCategory): ComponentOption[] =>
  COMPONENT_OPTIONS.filter((option) => option.category === category);

export const getOptionById = (id: string): ComponentOption | undefined =>
  COMPONENT_OPTIONS.find((option) => option.id === id);
