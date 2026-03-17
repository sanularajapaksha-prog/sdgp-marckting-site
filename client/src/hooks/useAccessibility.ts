import { useEffect, useRef, useCallback } from "react";

// ─── Focus Trap ───────────────────────────────────────────────────────────────
// Keeps keyboard focus inside a modal/drawer when active.

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

export function useFocusTrap(active: boolean) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    // Focus first element when trap activates
    first?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift+Tab — going backwards
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        // Tab — going forwards
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        container.dispatchEvent(new CustomEvent("focustrap:escape", { bubbles: true }));
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [active]);

  return containerRef;
}

// ─── Keyboard Navigation ──────────────────────────────────────────────────────
// Arrow-key navigation for listbox-style components (tabs, filter pills).

export function useArrowKeyNav(
  count: number,
  activeIndex: number,
  onChange: (index: number) => void,
  orientation: "horizontal" | "vertical" = "horizontal"
) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const prev = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
      const next = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";

      if (e.key === prev) {
        e.preventDefault();
        onChange((activeIndex - 1 + count) % count);
      } else if (e.key === next) {
        e.preventDefault();
        onChange((activeIndex + 1) % count);
      } else if (e.key === "Home") {
        e.preventDefault();
        onChange(0);
      } else if (e.key === "End") {
        e.preventDefault();
        onChange(count - 1);
      }
    },
    [count, activeIndex, onChange, orientation]
  );

  return handleKeyDown;
}

// ─── Reduced Motion ───────────────────────────────────────────────────────────
// Returns true when the user prefers reduced motion.

export function usePrefersReducedMotion(): boolean {
  const mq =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;

  return mq?.matches ?? false;
}

// ─── Live Region ──────────────────────────────────────────────────────────────
// Announces dynamic content changes to screen readers.

export function useLiveAnnounce() {
  const regionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const div = document.createElement("div");
    div.setAttribute("role", "status");
    div.setAttribute("aria-live", "polite");
    div.setAttribute("aria-atomic", "true");
    div.style.cssText =
      "position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden;";
    document.body.appendChild(div);
    regionRef.current = div;

    return () => {
      document.body.removeChild(div);
    };
  }, []);

  const announce = useCallback((message: string) => {
    if (!regionRef.current) return;
    regionRef.current.textContent = "";
    // Small delay ensures screen readers pick up the change
    requestAnimationFrame(() => {
      if (regionRef.current) regionRef.current.textContent = message;
    });
  }, []);

  return announce;
}

// ─── Roving Tab Index ─────────────────────────────────────────────────────────
// Manages tabIndex for a group of items (only one in the tab order at a time).

export function getRovingTabIndex(index: number, activeIndex: number): number {
  return index === activeIndex ? 0 : -1;
}

// ─── Click Outside ────────────────────────────────────────────────────────────
// Fires callback when a click is detected outside the ref element.

export function useClickOutside<T extends HTMLElement>(
  callback: () => void,
  enabled = true
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [callback, enabled]);

  return ref;
}

// ─── Scroll Lock ─────────────────────────────────────────────────────────────
// Prevents body scroll when a modal is open.

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Account for scrollbar width to prevent layout shift
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [locked]);
}
