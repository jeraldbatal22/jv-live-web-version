import { useEffect, useState } from 'react';

/**
 * A hook that manages the visibility state of a player overlay.
 * The overlay is shown when the user moves their mouse over the player
 * and can be manually controlled through the returned setter function.
 *
 * @param ref - React ref object pointing to the player container element
 * @returns An object containing the overlay visibility state and a setter function
 */

const usePlayerOverlayState = (ref: React.RefObject<HTMLDivElement | null>) => {
  const [isOverlayEnabled, setIsOverlayEnabled] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const playerRef = ref.current;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const handleShowOverlay = () => {
      setShowOverlay(true);
    };

    if (playerRef && isOverlayEnabled) {
      playerRef.addEventListener('mousemove', handleShowOverlay, { signal });
      playerRef.addEventListener('click', handleShowOverlay, { signal });
    }

    return () => {
      controller.abort();
    };
  }, [playerRef, isOverlayEnabled]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showOverlay) {
      timer = setTimeout(() => {
        setShowOverlay(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showOverlay]);

  return { showOverlay, setShowOverlay, isOverlayEnabled, setIsOverlayEnabled };
};

export default usePlayerOverlayState;
