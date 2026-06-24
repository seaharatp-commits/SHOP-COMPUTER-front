import { Badge, Box, Table, Text } from "@chakra-ui/react";
import { formatCurrency } from "@/lib/utils/format";
import type { DashboardOrderDto } from "@/types/api/dashboard";
import type { OrderStatus } from "@/types/api/order";

const STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING: "รอชำระเงิน",
  PAID: "ชำระแล้ว",
  PROCESSING: "กำลังจัดเตรียม",
  SHIPPED: "จัดส่งแล้ว",
  COMPLETED: "เสร็จสิ้น",
  CANCELLED: "ยกเลิก",
  EXPIRED: "หมดอายุ",
};

const STATUS_COLOR: Record<OrderStatus, string> = {
  PENDING: "yellow",
  PAID: "green",
  PROCESSING: "blue",
  SHIPPED: "cyan",
  COMPLETED: "green",
  CANCELLED: "red",
  EXPIRED: "gray",
};

export default function OrdersTable({ orders }: { orders: DashboardOrderDto[] }) {
  if (orders.length === 0) {
    return (
      <Box bg="white" rounded="xl" borderWidth="1px" borderColor="gray.200" p={8} textAlign="center">
        <Text color="gray.500">ยังไม่มีคำสั่งซื้อ</Text>
      </Box>
    );
  }

  return (
    <Box bg="white" rounded="xl" borderWidth="1px" borderColor="gray.200" overflowX="auto">
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>เลขที่คำสั่งซื้อ</Table.ColumnHeader>
            <Table.ColumnHeader>ลูกค้า</Table.ColumnHeader>
            <Table.ColumnHeader>สถานะ</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">ยอดรวม</Table.ColumnHeader>
            <Table.ColumnHeader>วันที่สั่งซื้อ</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {orders.map((order) => (
            <Table.Row key={order.id}>
              <Table.Cell fontWeight="medium">{order.orderNo}</Table.Cell>
              <Table.Cell>{order.user?.fullName ?? `Guest (${order.guestEmail ?? "-"})`}</Table.Cell>
              <Table.Cell>
                <Badge colorPalette={STATUS_COLOR[order.status]}>{STATUS_LABEL[order.status]}</Badge>
              </Table.Cell>
              <Table.Cell textAlign="end">{formatCurrency(Number(order.total))}</Table.Cell>
              <Table.Cell color="gray.500" fontSize="xs">
                {new Date(order.createdAt).toLocaleString("th-TH")}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
