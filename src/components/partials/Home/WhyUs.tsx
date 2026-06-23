import { Box, SimpleGrid, Stack, Text, Heading } from "@chakra-ui/react";
import { Settings2, QrCode, Truck, ShieldCheck } from "lucide-react";

const REASONS = [
  { icon: Settings2, title: "ปรับแต่งสเปกได้เอง", desc: "เลือก CPU, การ์ดจอ, แรม และอุปกรณ์ทุกชิ้นตามใจคุณ" },
  { icon: QrCode, title: "ชำระเงินง่าย", desc: "สแกน QR Code จ่ายเงินได้ทันที ไม่ต้องโอนผ่านหลายขั้นตอน" },
  { icon: Truck, title: "จัดส่งรวดเร็ว", desc: "ประกอบและจัดส่งภายใน 3-5 วันทำการ" },
  { icon: ShieldCheck, title: "รับประกันสินค้า", desc: "รับประกันอุปกรณ์ทุกชิ้นสูงสุด 3 ปี" },
];

export default function WhyUs() {
  return (
    <Box bg="white" py={{ base: 12, md: 16 }}>
      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }}>
        <Heading as="h2" size="xl" textAlign="center" mb={10}>
          ทำไมต้องเลือกเรา
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={8}>
          {REASONS.map(({ icon: Icon, title, desc }) => (
            <Stack key={title} align="center" textAlign="center" gap={3}>
              <Box bg="brand.50" color="brand.600" p={4} rounded="full">
                <Icon size={28} />
              </Box>
              <Text fontWeight="bold">{title}</Text>
              <Text fontSize="sm" color="gray.600">
                {desc}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
