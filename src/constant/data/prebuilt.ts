import { getOptionById } from "@/constant/data/components";
import type { PrebuiltSet } from "@/types/app/product";

export const PREBUILT_SETS: PrebuiltSet[] = [
  {
    id: "set-starter",
    name: "Starter Gaming Set",
    tagline: "เริ่มต้นเล่นเกม 1080p ลื่นไหล คุ้มค่าทุกบาท",
    image: "/components/pc-starter.svg",
    badge: "คุ้มค่าที่สุด",
    price: 0,
    build: {
      cpu: getOptionById("cpu-r5-7600"),
      mainboard: getOptionById("mb-b650"),
      gpu: getOptionById("gpu-rx7600"),
      ram: getOptionById("ram-16-ddr5"),
      storage: getOptionById("ssd-500"),
      psu: getOptionById("psu-650"),
      case: getOptionById("case-mid"),
      cooler: getOptionById("cooler-air"),
    },
  },
  {
    id: "set-streamer",
    name: "Streamer & Creator Set",
    tagline: "เล่นเกมพร้อมสตรีม ตัดต่อวิดีโอลื่นไม่มีสะดุด",
    image: "/components/pc-streamer.svg",
    badge: "ขายดี",
    price: 0,
    build: {
      cpu: getOptionById("cpu-i7-14700k"),
      mainboard: getOptionById("mb-z790"),
      gpu: getOptionById("gpu-rtx4070"),
      ram: getOptionById("ram-32-ddr5"),
      storage: getOptionById("ssd-1tb"),
      psu: getOptionById("psu-750"),
      case: getOptionById("case-airflow"),
      cooler: getOptionById("cooler-aio240"),
    },
  },
  {
    id: "set-flagship",
    name: "Flagship 4K Set",
    tagline: "แรงสุดทุกการใช้งาน เล่นเกม 4K เฟรมเรตสูงสุด",
    image: "/components/pc-flagship.svg",
    badge: "เรือธง",
    price: 0,
    build: {
      cpu: getOptionById("cpu-r7-7800x3d"),
      mainboard: getOptionById("mb-b650"),
      gpu: getOptionById("gpu-rtx4080"),
      ram: getOptionById("ram-32-ddr5"),
      storage: getOptionById("ssd-2tb"),
      psu: getOptionById("psu-850"),
      case: getOptionById("case-airflow"),
      cooler: getOptionById("cooler-aio360"),
    },
  },
];

export const calcBuildPrice = (build: PrebuiltSet["build"]): number =>
  Object.values(build).reduce((sum, item) => sum + (item?.price ?? 0), 0);

PREBUILT_SETS.forEach((set) => {
  set.price = calcBuildPrice(set.build);
});
