"use client";

import { Box, Stack, Text, Input, Textarea, Field } from "@chakra-ui/react";

export interface ShippingInfo {
  fullName: string;
  phone: string;
  address: string;
  guestEmail: string;
}

interface ShippingFormProps {
  value: ShippingInfo;
  onChange: (value: ShippingInfo) => void;
  requireGuestEmail: boolean;
}

export default function ShippingForm({ value, onChange, requireGuestEmail }: ShippingFormProps) {
  return (
    <Box bg="white" rounded="xl" borderWidth="1px" borderColor="gray.200" p={6}>
      <Text fontWeight="bold" fontSize="lg" mb={4}>
        ข้อมูลจัดส่ง
      </Text>
      <Stack gap={4}>
        <Field.Root required>
          <Field.Label>ชื่อ-นามสกุล</Field.Label>
          <Input
            value={value.fullName}
            onChange={(e) => onChange({ ...value, fullName: e.target.value })}
            placeholder="กรอกชื่อ-นามสกุลผู้รับ"
          />
        </Field.Root>
        <Field.Root required>
          <Field.Label>เบอร์โทรศัพท์</Field.Label>
          <Input
            value={value.phone}
            onChange={(e) => onChange({ ...value, phone: e.target.value })}
            placeholder="08X-XXX-XXXX"
          />
        </Field.Root>
        <Field.Root required>
          <Field.Label>ที่อยู่จัดส่ง</Field.Label>
          <Textarea
            value={value.address}
            onChange={(e) => onChange({ ...value, address: e.target.value })}
            placeholder="บ้านเลขที่ ถนน ตำบล อำเภอ จังหวัด รหัสไปรษณีย์"
            rows={3}
          />
        </Field.Root>
        {requireGuestEmail && (
          <Field.Root required>
            <Field.Label>อีเมลสำหรับติดต่อ (สั่งซื้อแบบไม่ล็อกอิน)</Field.Label>
            <Input
              type="email"
              value={value.guestEmail}
              onChange={(e) => onChange({ ...value, guestEmail: e.target.value })}
              placeholder="you@example.com"
            />
          </Field.Root>
        )}
      </Stack>
    </Box>
  );
}
