"use client";

import { useEffect, useRef } from "react";

// One box per digit. Typing moves forward, Backspace moves back, the arrow
// keys move between boxes, and pasting or the phone's SMS/email autofill
// fills every box at once. `value` is the whole code as a string.
export default function OtpInput({ value, onChange, onComplete, length = 6, disabled = false, autoFocus = false }) {
  const inputs = useRef([]);
  const digits = Array.from({ length }, (_, i) => value[i] || "");

  // After a wrong code the parent clears the value; put the cursor back
  // in the first box so the next attempt can be typed straight away.
  useEffect(() => {
    if (autoFocus && !disabled && value === "") inputs.current[0]?.focus();
  }, [autoFocus, disabled, value]);

  const focusBox = (index) => {
    const box = inputs.current[Math.max(0, Math.min(length - 1, index))];
    box?.focus();
    box?.select();
  };

  // Writes `incoming` digits starting at box `start`, then moves focus on
  const fill = (start, incoming) => {
    const clean = incoming.replace(/\D/g, "");
    if (!clean) return;

    const next = digits.slice();
    // A full-length paste or autofill always means "the whole code"
    const from = clean.length >= length ? 0 : start;
    for (let i = 0; i < clean.length && from + i < length; i++) {
      next[from + i] = clean[i];
    }

    const code = next.join("");
    onChange(code);
    focusBox(Math.min(from + clean.length, length - 1));
    if (code.length === length && !next.includes("")) onComplete?.(code);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = digits.slice();
      if (next[index]) {
        next[index] = "";
      } else if (index > 0) {
        next[index - 1] = "";
        focusBox(index - 1);
      }
      onChange(next.join(""));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusBox(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      focusBox(index + 1);
    }
  };

  return (
    <div role="group" aria-label={`${length}-digit code`} className="flex justify-between gap-2 sm:gap-3">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputs.current[index] = el)}
          type="text"
          inputMode="numeric"
          // Only the first box offers autofill, which then spreads across all
          autoComplete={index === 0 ? "one-time-code" : "off"}
          aria-label={`Digit ${index + 1} of ${length}`}
          autoFocus={autoFocus && index === 0}
          disabled={disabled}
          value={digit}
          onFocus={(e) => e.target.select()}
          onChange={(e) => {
            const typed = e.target.value.replace(digit, "") || e.target.value;
            fill(index, typed);
          }}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={(e) => {
            e.preventDefault();
            fill(index, e.clipboardData.getData("text"));
          }}
          className={`w-full min-w-0 aspect-square max-w-14 text-center text-2xl font-semibold font-mono text-ink rounded-lg border bg-zinc-900 caret-[#F88E14] transition-colors focus:outline-none focus:border-[#F88E14] focus:ring-2 focus:ring-[#F88E14]/30 disabled:opacity-60 ${
            digit ? "border-zinc-500" : "border-zinc-700"
          }`}
        />
      ))}
    </div>
  );
}
