"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  threshold = 0.15,
  className = "",
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already scrolled past (deep link, restored scroll position): the observer
    // would report "not intersecting" and leave it hidden forever.
    if (el.getBoundingClientRect().bottom <= 0) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      data-revealed={revealed ? "true" : undefined}
      className={className}
      style={{ "--reveal-delay": `${delay}ms`, ...style }}
      {...rest}
    >
      {variant === "wipe" ? <span className="reveal-wipe">{children}</span> : children}
    </Tag>
  );
}
