import type { ComponentProps } from "react";

export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`container ${className}`} {...props} />;
}

export function Section({ className = "", children, ...props }: ComponentProps<"section">) {
  return <section className={`section ${className}`} {...props}><Container>{children}</Container></section>;
}
