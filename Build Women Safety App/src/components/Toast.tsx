import { useEffect } from "react";
import type { Toast } from "../types";

interface Props {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export default function Toasts({ toasts, onDismiss }: Props) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const bg =
    toast.type === "success" ? "#4CAF50" :
    toast.type === "error" ? "#F44336" : "#1C1B1F";

  const icon =
    toast.type === "success" ? "✓" :
    toast.type === "error" ? "✕" : "ℹ";

  return (
    <div
      className="fade-in flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg pointer-events-auto"
      style={{ background: bg, color: "white" }}
      onClick={() => onDismiss(toast.id)}
    >
      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold flex-shrink-0">
        {icon}
      </div>
      <p className="text-sm font-medium flex-1">{toast.message}</p>
    </div>
  );
}
