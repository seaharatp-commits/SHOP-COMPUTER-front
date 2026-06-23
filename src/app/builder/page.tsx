import { Suspense } from "react";
import { BuilderContent } from "@/components/partials/Builder";

export default function BuilderPage() {
  return (
    <Suspense fallback={null}>
      <BuilderContent />
    </Suspense>
  );
}
