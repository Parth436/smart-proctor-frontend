import { useEffect } from "react";

export default function TabMonitor() {
  useEffect(() => {
    const handler = () => {
      if (document.hidden) {
        console.warn("Tab switch detected");
      }
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);
  return null;
}
