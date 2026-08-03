import type { ReactNode } from "react";
import { Link } from "react-router";

type PageWidth = "narrow" | "content" | "wide";

interface PageLayoutProps {
  children: ReactNode;
  width?: PageWidth;
  className?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  backTo?: string;
  backLabel?: string;
  eyebrow?: string;
  actions?: ReactNode;
}

const widthClassNames: Record<PageWidth, string> = {
  narrow: "max-w-3xl",
  content: "max-w-5xl",
  wide: "max-w-[90rem]",
};

export function PageLayout({
  children,
  width = "content",
  className = "",
}: PageLayoutProps) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`mx-auto w-full flex-1 px-4 py-8 outline-none sm:px-6 sm:py-10 lg:px-8 lg:py-12 ${widthClassNames[width]} ${className}`}
    >
      {children}
    </main>
  );
}

export function PageHeader({
  title,
  description,
  backTo,
  backLabel,
  eyebrow,
  actions,
}: PageHeaderProps) {
  return (
    <header className="mb-8 border-b border-neutral-200 pb-7 sm:mb-10 sm:pb-8">
      {backTo && backLabel && (
        <Link to={backTo} className="ui-back-link">
          <span aria-hidden="true">←</span>
          {backLabel}
        </Link>
      )}

      <div className={backTo ? "mt-6" : undefined}>
        {eyebrow && <p className="ui-eyebrow">{eyebrow}</p>}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <h1 className="font-display text-3xl font-bold tracking-tight text-neutral-950 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {title}
            </h1>
            {description && (
              <p className="mt-3 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      </div>
    </header>
  );
}
