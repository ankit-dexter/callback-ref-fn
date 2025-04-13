"use client"

import React, { useRef, useEffect, useState } from "react";

export default function UseRefFailingExample() {
  const boxRef = useRef(null);
  const [showBox, setShowBox] = useState(false);

  useEffect(() => {
    const node = boxRef.current;

    if (node) {
      // 1. Focus attempt
      node.focus();
      console.log("✅ Focused (maybe):", node);

      // 2. Attach event
      const onMouseEnter = () => console.log("👋 Hovered over box!");
      node.addEventListener("mouseenter", onMouseEnter);

      // 3. Simulate plugin attach
      console.log("📦 Third-party plugin attached");

      // 4. Measure
      console.log("📏 Box height:", node.offsetHeight);

      return () => {
        // Cleanup — runs on component unmount, not DOM removal
        console.log("❌ Box useEffect cleanup");

        // ⚠️ `boxRef.current` may be null here already or reference a stale node
        if (boxRef.current) {
          boxRef.current.removeEventListener("mouseenter", onMouseEnter);
        }

        // ⚠️ Plugin destroy would miss DOM removal
        console.log("🧹 Plugin (maybe) destroyed");
      };
    }
  }, [showBox]);

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => setShowBox((prev) => !prev)}>
        {showBox ? "Hide" : "Show"} Box (normal ref)
      </button>

      <div style={{ marginTop: "2rem" }}>
        {showBox && (
          <div
            ref={boxRef}
            tabIndex={0}
            style={{
              padding: "1rem",
              backgroundColor: "lightcoral",
              borderRadius: "8px",
            }}
          >
            I'm a dynamic box (ref version)
          </div>
        )}
      </div>
    </div>
  );
}
