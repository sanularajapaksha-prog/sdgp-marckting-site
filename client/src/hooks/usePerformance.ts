import { useEffect, useRef, useCallback, useState } from "react";

// ─── Intersection Observer (scroll-triggered) ─────────────────────────────────
// Fires once when the element enters the viewport. Lighter than useInView for
// elements that only need a CSS class toggle (no Framer Motion needed).

export function useReveal(
  threshold = 0.1,
  rootMargin = "0px 0px -60px 0px"
) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el); // Fire once
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible };
}

// ─── Debounce ─────────────────────────────────────────────────────────────────
// Debounces a value — useful for search inputs, resize handlers, etc.

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

// ─── Throttle ─────────────────────────────────────────────────────────────────
// Returns a throttled version of a callback — useful for scroll/mousemove.

export function useThrottle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit = 100
): T {
  const lastRun = useRef(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastRun.current >= limit) {
        lastRun.current = now;
        fn(...args);
      }
    },
    [fn, limit]
  ) as T;
}

// ─── Idle Callback ────────────────────────────────────────────────────────────
// Runs a callback when the browser is idle. Falls back to setTimeout.

export function useIdleEffect(callback: () => void, deps: unknown[] = []) {
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(callback, { timeout: 2000 });
      return () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(callback, 200);
      return () => clearTimeout(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// ─── Image Preload ────────────────────────────────────────────────────────────
// Preloads a list of image URLs during browser idle time.

export function useImagePreload(urls: string[]) {
  useIdleEffect(() => {
    urls.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [urls.join(",")]);
}

// ─── Window Size ─────────────────────────────────────────────────────────────
// Reactive window dimensions with throttling.

export function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    let raf: number;

    const handleResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return {
    ...size,
    isMobile: size.width < 768,
    isTablet: size.width >= 768 && size.width < 1024,
    isDesktop: size.width >= 1024,
  };
}

// ─── Previous Value ───────────────────────────────────────────────────────────
// Returns the previous value of any reactive variable.

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// ─── Count Up ─────────────────────────────────────────────────────────────────
// Animates a number from 0 to `target` when `trigger` becomes true.

export function useCountUp(target: number, duration = 2000, trigger = true) {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;

    startTime.current = null;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, trigger]);

  return count;
}

// ─── Local Storage State ──────────────────────────────────────────────────────
// Like useState, but persisted in localStorage.

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const next = value instanceof Function ? value(stored) : value;
        setStored(next);
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // Silent fail
      }
    },
    [key, stored]
  );

  return [stored, setValue] as const;
}

// ─── Copy to Clipboard ────────────────────────────────────────────────────────

export function useCopyToClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), resetDelay);
      } catch {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.cssText = "position:fixed;left:-9999px;top:0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), resetDelay);
      }
    },
    [resetDelay]
  );

  return { copied, copy };
}

// ─── Performance Mark ─────────────────────────────────────────────────────────
// Records a performance mark when a component mounts (useful for profiling).

export function usePerformanceMark(name: string) {
  useEffect(() => {
    if (typeof performance !== "undefined" && performance.mark) {
      performance.mark(`seygo:${name}:mount`);
      return () => {
        performance.mark(`seygo:${name}:unmount`);
        try {
          performance.measure(
            `seygo:${name}:lifetime`,
            `seygo:${name}:mount`,
            `seygo:${name}:unmount`
          );
        } catch {
          // Marks may have been cleared
        }
      };
    }
  }, [name]);
}
