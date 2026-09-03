"use client";

import { useEffect } from "react";

export default function AntiInspect() {
  useEffect(() => {
    // 1. Disable Right Click Context Menu (prevents right-click -> Inspect Element)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 2. Disable DevTools and View Source Shortcut Keys
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      const isShift = e.shiftKey;
      const isAlt = e.altKey;
      const key = e.key.toLowerCase();

      // F12 (Standard DevTools key)
      if (e.key === "F12") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl + Shift + I  OR  Cmd + Option + I (Inspect)
      if (isCtrlOrCmd && (isShift || isAlt) && key === "i") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl + Shift + J  OR  Cmd + Option + J (Console)
      if (isCtrlOrCmd && (isShift || isAlt) && key === "j") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl + Shift + C  OR  Cmd + Option + C (Inspect Element Picker)
      if (isCtrlOrCmd && (isShift || isAlt) && key === "c") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl + U  OR  Cmd + Option + U (View Source)
      if (isCtrlOrCmd && key === "u") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl + S  OR  Cmd + S (Save Page)
      if (isCtrlOrCmd && key === "s") {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    window.addEventListener("contextmenu", handleContextMenu, { capture: true });
    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu, { capture: true });
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, []);

  return null;
}
