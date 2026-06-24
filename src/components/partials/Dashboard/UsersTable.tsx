import { Badge, Box, Table, Text } from "@chakra-ui/react";
import type { DashboardUserDto } from "@/types/api/dashboard";

export default function UsersTable({ users }: { users: DashboardUserDto[] }) {
  if (users.length === 0) {
    return (
      <Box bg="white" rounded="xl" borderWidth="1px" borderColor="gray.200" p={8} textAlign="center">
        <Text color="gray.500">ยังไม่มีผู้ใช้</Text>
      </Box>
    );
  }

  return (
    <Box bg="white" rounded="xl" borderWidth="1px" borderColor="gray.200" overflowX="auto">
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ชื่อ-นามสกุล</Table.ColumnHeader>
            <Table.ColumnHeader>อีเมล</Table.ColumnHeader>
            <Table.ColumnHeader>เบอร์โทร</Table.ColumnHeader>
            <Table.ColumnHeader>สิทธิ์</Table.ColumnHeader>
            <Table.ColumnHeader>เข้าสู่ระบบล่าสุด</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell fontWeight="medium">{user.fullName}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.phone ?? "-"}</Table.Cell>
              <Table.Cell>
                <Badge colorPalette={user.role === "ADMIN" ? "purple" : "gray"}>{user.role}</Badge>
              </Table.Cell>
              <Table.Cell color="gray.500" fontSize="xs">
                {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString("th-TH") : "ยังไม่เคยเข้าสู่ระบบ"}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
