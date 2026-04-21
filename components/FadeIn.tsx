import type { CSSProperties, ReactNode } from "react";

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 1,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const style = {
    "--fade-duration": `${duration}s`,
    "--fade-delay": `${delay}s`,
  } as CSSProperties;

  return (
    <div className={`fade-in ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
