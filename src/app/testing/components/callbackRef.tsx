import React, { useState, useCallback, useEffect } from "react";

// Simulating a third-party library like flatpickr, chart.js, etc.
function simulateThirdPartyAttach(node) {
  console.log("📦 Third-party plugin attached to:", node);
}
function simulateThirdPartyDestroy() {
  console.log("🧹 Plugin destroyed");
}

export default function CallbackRefDemo() {
  const [showBox, setShowBox] = useState(false);

  const handleBoxRef = useCallback((node) => {
    if (node) {
      // 🟢 DOM node mounted
      console.log("✅ Box mounted:", node);

      // 1. Focus the element
      node.focus();

      // 2. Attach event listener
      const onMouseEnter = () => console.log("👋 Hovered over box!");
      node.addEventListener("mouseenter", onMouseEnter);

      // 3. Simulate third-party plugin mount
      simulateThirdPartyAttach(node);

      // 4. Measure box
      const height = node.offsetHeight;
      console.log("📏 Box height:", height);

      // Optional: attach observer here
    } else {
      // 🔴 DOM node unmounted
      console.log("❌ Box unmounted");

      // 1. Remove event listener (no access to node, so usually you store listeners externally)
      // 2. Destroy third-party plugin
      simulateThirdPartyDestroy();

      // 3. Clean up observer or animation
    }
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => setShowBox((prev) => !prev)}>
        {showBox ? "Hide" : "Show"} Box  (callback ref fn)
      </button>

      <div style={{ marginTop: "2rem" }}>
        {showBox && (
          <div
            ref={handleBoxRef}
            tabIndex={0}
            style={{
              padding: "1rem",
              backgroundColor: "lightblue",
              borderRadius: "8px",
            }}
          >
            I'm a dynamic box with attached logic
          </div>
        )}
      </div>
    </div>
  );
}
