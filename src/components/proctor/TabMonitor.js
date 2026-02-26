import { useEffect, useRef } from "react";

export default function TabMonitor({ onViolation }) {
  const tabSwitchCount = useRef(0);

  useEffect(() => {
    const handleVisibility = () => {
  if (document.hidden) {
    tabSwitchCount.current += 1;
    onViolation("TAB_SWITCH", tabSwitchCount.current);
  }
};

    const handleBlur = () => {
      tabSwitchCount.current += 1;
      onViolation("WINDOW_BLUR", tabSwitchCount.current);
    };

    //window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibility);

    // DevTools detection
    let devtoolsOpen = false;

    const interval = setInterval(() => {
      const threshold = 160;
      if (
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold
      ) {
        if (!devtoolsOpen) {
          devtoolsOpen = true;
          onViolation("DEVTOOLS_OPEN", 1);
        }
      } else {
        devtoolsOpen = false;
      }
    }, 1000);

    return () => {
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibility);
      clearInterval(interval);
    };
  }, [onViolation]);

  return null;
}