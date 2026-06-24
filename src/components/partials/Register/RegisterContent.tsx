"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Box, Center, Stack, Heading, Text, Input, Field, Alert } from "@chakra-ui/react";
import { BaseButton } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api/client";

export default function RegisterContent() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await register(form);
      router.push("/");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "สมัครสมาชิกไม่สำเร็จ");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Center py={16} px={4}>
      <Box as="form" onSubmit={handleSubmit} bg="white" rounded="xl" borderWidth="1px" borderColor="gray.200" p={8} w="full" maxW="md">
        <Stack gap={1} mb={6} textAlign="center">
          <Heading as="h1" size="lg">
            สมัครสมาชิก
          </Heading>
          <Text color="gray.500" fontSize="sm">
            สร้างบัญชีเพื่อสั่งซื้อและติดตามคำสั่งซื้อได้ง่ายขึ้น
          </Text>
        </Stack>

        {error && (
          <Alert.Root status="error" mb={4} rounded="md">
            <Alert.Indicator />
            <Alert.Title>{error}</Alert.Title>
          </Alert.Root>
        )}

        <Stack gap={4}>
          <Field.Root required>
            <Field.Label>ชื่อ-นามสกุล</Field.Label>
            <Input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          </Field.Root>
          <Field.Root required>
            <Field.Label>อีเมล</Field.Label>
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </Field.Root>
          <Field.Root>
            <Field.Label>เบอร์โทรศัพท์</Field.Label>
            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="08X-XXX-XXXX" />
          </Field.Root>
          <Field.Root required>
            <Field.Label>รหัสผ่าน (อย่างน้อย 8 ตัวอักษร)</Field.Label>
            <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </Field.Root>
          <BaseButton type="submit" size="lg" loading={isSubmitting} mt={2}>
            สมัครสมาชิก
          </BaseButton>
        </Stack>

        <Text textAlign="center" fontSize="sm" color="gray.600" mt={6}>
          มีบัญชีอยู่แล้ว?{" "}
          <Link href="/login">
            <Text as="span" color="brand.600" fontWeight="medium">
              เข้าสู่ระบบ
            </Text>
          </Link>
        </Text>
      </Box>
    </Center>
  );
}
