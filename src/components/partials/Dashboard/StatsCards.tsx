import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { formatCurrency } from "@/lib/utils/format";
import type { DashboardStatsDto } from "@/types/api/dashboard";

const STATUS_LABEL: Record<string, string> = {
  PENDING: "รอชำระเงิน",
  PAID: "ชำระแล้ว",
  PROCESSING: "กำลังจัดเตรียม",
  SHIPPED: "จัดส่งแล้ว",
  COMPLETED: "เสร็จสิ้น",
  CANCELLED: "ยกเลิก",
  EXPIRED: "หมดอายุ",
};

export default function StatsCards({ stats }: { stats: DashboardStatsDto }) {
  const cards = [
    { label: "ผู้ใช้ทั้งหมด", value: stats.totalUsers.toLocaleString() },
    { label: "คำสั่งซื้อทั้งหมด", value: stats.totalOrders.toLocaleString() },
    { label: "คำสั่งซื้อที่ชำระแล้ว", value: stats.paidOrders.toLocaleString() },
    { label: "ยอดขายรวม", value: formatCurrency(Number(stats.totalRevenue)) },
  ];

  return (
    <Stack gap={6}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={4}>
        {cards.map((card) => (
          <Box key={card.label} bg="white" rounded="xl" borderWidth="1px" borderColor="gray.200" p={5}>
            <Text fontSize="sm" color="gray.500" mb={1}>
              {card.label}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="brand.700">
              {card.value}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      <Box bg="white" rounded="xl" borderWidth="1px" borderColor="gray.200" p={5}>
        <Text fontWeight="bold" mb={3}>
          คำสั่งซื้อแยกตามสถานะ
        </Text>
        <SimpleGrid columns={{ base: 2, sm: 4 }} gap={3}>
          {stats.ordersByStatus.map((row) => (
            <Box key={row.status} textAlign="center" p={3} bg="gray.50" rounded="md">
              <Text fontSize="xs" color="gray.500">
                {STATUS_LABEL[row.status] ?? row.status}
              </Text>
              <Text fontWeight="bold" fontSize="lg">
                {row.count}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Stack>
  );
}
