'use client';

import { useEffect, useState, useRef, RefObject } from 'react';

interface UseIdleOverlayOptions {
  idleTime?: number; // ms, default: 2000
  ref: RefObject<HTMLDivElement | null> | null; // container to track activity
}

export function useIdleOverlay({
  idleTime = 2000,
  ref,
}: UseIdleOverlayOptions) {
  const [isIdle, setIsIdle] = useState(false);
  const [isInside, setIsInside] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!ref?.current) return;

    const container = ref.current;

    const resetTimer = () => {
      if (!isInside) return;
      setIsIdle(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setIsIdle(true), idleTime);
    };

    const handleEnter = () => {
      setIsInside(true);
      resetTimer();
    };

    const handleLeave = () => {
      setIsInside(false);
      setIsIdle(true); // hide immediately when leaving
      if (timerRef.current) clearTimeout(timerRef.current);
    };

    // Attach listeners inside container
    container.addEventListener('mouseenter', handleEnter);
    container.addEventListener('mouseleave', handleLeave);
    container.addEventListener('mousemove', resetTimer);
    container.addEventListener('mousedown', resetTimer);
    container.addEventListener('keydown', resetTimer);
    container.addEventListener('touchstart', resetTimer);

    return () => {
      container.removeEventListener('mouseenter', handleEnter);
      container.removeEventListener('mouseleave', handleLeave);
      container.removeEventListener('mousemove', resetTimer);
      container.removeEventListener('mousedown', resetTimer);
      container.removeEventListener('keydown', resetTimer);
      container.removeEventListener('touchstart', resetTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [ref, idleTime, isInside]);

  return isIdle;
}
