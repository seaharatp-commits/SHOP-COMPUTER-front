import { Suspense } from "react";
import { OrderSuccessContent } from "@/components/partials/OrderSuccess";

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={null}>
      <OrderSuccessContent />
    </Suspense>
  );
}
