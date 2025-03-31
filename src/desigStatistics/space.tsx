import { ReactNode } from "react";

export default function Space({
  children,
  className,
  horizontal = false,
}: {
  children?: ReactNode;
  className?: string;
  horizontal?: boolean;
}) {
  return (
    <div
      className={`flex ${
        horizontal ? "flex-col" : "flex-row"
      } gap-1 items-center ${className}`}
    >
      {children}
    </div>
  );
}
