"use client";

import { Box, Stack, Text, Input, Textarea, Field } from "@chakra-ui/react";

export interface ShippingInfo {
  fullName: string;
  phone: string;
  address: string;
}

interface ShippingFormProps {
  value: ShippingInfo;
  onChange: (value: ShippingInfo) => void;
}

export default function ShippingForm({ value, onChange }: ShippingFormProps) {
  return (
    <Box bg="white" rounded="xl" borderWidth="1px" borderColor="gray.200" p={6}>
      <Text fontWeight="bold" fontSize="lg" mb={4}>
        ข้อมูลจัดส่ง
      </Text>
      <Stack gap={4}>
        <Field.Root>
          <Field.Label>ชื่อ-นามสกุล</Field.Label>
          <Input
            value={value.fullName}
            onChange={(e) => onChange({ ...value, fullName: e.target.value })}
            placeholder="กรอกชื่อ-นามสกุลผู้รับ"
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>เบอร์โทรศัพท์</Field.Label>
          <Input
            value={value.phone}
            onChange={(e) => onChange({ ...value, phone: e.target.value })}
            placeholder="08X-XXX-XXXX"
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>ที่อยู่จัดส่ง</Field.Label>
          <Textarea
            value={value.address}
            onChange={(e) => onChange({ ...value, address: e.target.value })}
            placeholder="บ้านเลขที่ ถนน ตำบล อำเภอ จังหวัด รหัสไปรษณีย์"
            rows={3}
          />
        </Field.Root>
      </Stack>
    </Box>
  );
}
