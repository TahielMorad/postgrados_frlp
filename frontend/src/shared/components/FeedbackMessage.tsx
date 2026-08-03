import type { HTMLAttributes, ReactNode } from "react";

type FeedbackTone = "info" | "success" | "warning" | "error";

interface FeedbackMessageProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  tone?: FeedbackTone;
}

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  children: ReactNode;
}

const toneClassNames: Record<FeedbackTone, string> = {
  info: "border-utn-200 bg-utn-50 text-utn-950 before:bg-utn-500",
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-950 before:bg-emerald-600",
  warning: "border-amber-300 bg-amber-50 text-amber-950 before:bg-amber-500",
  error: "border-red-300 bg-red-50 text-red-950 before:bg-red-700",
};

export function FeedbackMessage({
  children,
  tone = "info",
  className = "",
  ...props
}: FeedbackMessageProps) {
  return (
    <div
      {...props}
      className={`relative overflow-hidden rounded-lg border px-4 py-3.5 pl-5 text-sm leading-6 shadow-xs before:absolute before:inset-y-0 before:left-0 before:w-1 ${toneClassNames[tone]} ${className}`}
    >
      {children}
    </div>
  );
}

export function EmptyState({
  title,
  children,
  className = "",
  ...props
}: EmptyStateProps) {
  return (
    <div
      {...props}
      className={`rounded-xl border border-dashed border-neutral-300 bg-white px-6 py-12 text-center shadow-xs ${className}`}
    >
      <span
        aria-hidden="true"
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-utn-50 text-utn-700"
      >
        <span className="h-4 w-4 rounded-full border-4 border-current" />
      </span>
      <p className="mt-4 font-semibold text-neutral-950">{title}</p>
      <div className="mt-2 text-sm text-neutral-600">{children}</div>
    </div>
  );
}
