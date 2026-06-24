"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Center, Heading, Spinner, Tabs, Text } from "@chakra-ui/react";
import { useAuth } from "@/context/AuthContext";
import * as dashboardService from "@/services/dashboard.service";
import type { DashboardOrderDto, DashboardStatsDto, DashboardUserDto } from "@/types/api/dashboard";
import StatsCards from "./StatsCards";
import OrdersTable from "./OrdersTable";
import UsersTable from "./UsersTable";

export default function DashboardContent() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();

  const [stats, setStats] = useState<DashboardStatsDto | null>(null);
  const [orders, setOrders] = useState<DashboardOrderDto[]>([]);
  const [users, setUsers] = useState<DashboardUserDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthLoading) return;
    if (!user || user.role !== "ADMIN") {
      router.replace("/");
      return;
    }

    Promise.all([dashboardService.getStats(), dashboardService.getOrders(), dashboardService.getUsers()])
      .then(([statsData, ordersData, usersData]) => {
        setStats(statsData);
        setOrders(ordersData);
        setUsers(usersData);
      })
      .catch(() => setError("ไม่สามารถโหลดข้อมูลแดชบอร์ดได้"))
      .finally(() => setIsLoading(false));
  }, [isAuthLoading, user, router]);

  if (isAuthLoading || !user || user.role !== "ADMIN" || isLoading) {
    return (
      <Center py={20}>
        <Spinner color="brand.500" size="lg" />
      </Center>
    );
  }

  if (error || !stats) {
    return (
      <Center py={20}>
        <Text color="red.500">{error ?? "ไม่พบข้อมูล"}</Text>
      </Center>
    );
  }

  return (
    <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={10}>
      <Heading as="h1" size="xl" mb={8}>
        แดชบอร์ดผู้ดูแลระบบ
      </Heading>

      <StatsCards stats={stats} />

      <Tabs.Root defaultValue="orders" mt={8}>
        <Tabs.List>
          <Tabs.Trigger value="orders">คำสั่งซื้อ</Tabs.Trigger>
          <Tabs.Trigger value="users">ผู้ใช้งาน</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="orders" pt={4}>
          <OrdersTable orders={orders} />
        </Tabs.Content>
        <Tabs.Content value="users" pt={4}>
          <UsersTable users={users} />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
