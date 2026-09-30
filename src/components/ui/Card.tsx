import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "max-w-full w-full mx-auto  rounded-xl border border-[rgba(255,255,255,0.10)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  className,
  id
}: {
  children: ReactNode;
  className?: string;
  id?:string;
}) => {
  return (
    <h3
      id={id}
      className={cn(
        "text-lg font-semibold text-gray-800 py-2",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-sm font-normal text-neutral-600 max-w-full",
        className
      )}
    >
      {children}
    </p>
  );
};
