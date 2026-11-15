import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <Loader2 className="h-10 w-10 animate-spin text-[#2d4a2b]" aria-hidden="true" />
    </div>
  );
}
