"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Box, Center, Stack, Heading, Text, Input, Field, Alert } from "@chakra-ui/react";
import { BaseButton } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api/client";

export default function LoginContent() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login({ email, password });
      router.push("/");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "เข้าสู่ระบบไม่สำเร็จ");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Center py={16} px={4}>
      <Box as="form" onSubmit={handleSubmit} bg="white" rounded="xl" borderWidth="1px" borderColor="gray.200" p={8} w="full" maxW="md">
        <Stack gap={1} mb={6} textAlign="center">
          <Heading as="h1" size="lg">
            เข้าสู่ระบบ
          </Heading>
          <Text color="gray.500" fontSize="sm">
            เข้าสู่ระบบเพื่อติดตามคำสั่งซื้อของคุณ
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
            <Field.Label>อีเมล</Field.Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </Field.Root>
          <Field.Root required>
            <Field.Label>รหัสผ่าน</Field.Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </Field.Root>
          <BaseButton type="submit" size="lg" loading={isSubmitting} mt={2}>
            เข้าสู่ระบบ
          </BaseButton>
        </Stack>

        <Text textAlign="center" fontSize="sm" color="gray.600" mt={6}>
          ยังไม่มีบัญชี?{" "}
          <Link href="/register">
            <Text as="span" color="brand.600" fontWeight="medium">
              สมัครสมาชิก
            </Text>
          </Link>
        </Text>
      </Box>
    </Center>
  );
}
