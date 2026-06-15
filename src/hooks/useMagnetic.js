import { useRef } from "react";

export function useMagnetic(disabled = false) {
  const ref = useRef(null);

  function handleMove(event) {
    if (disabled || !window.matchMedia("(pointer: fine)").matches) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    node.style.transform = `translate3d(${x * 0.16}px, ${y * 0.16}px, 0)`;
  }

  function handleLeave() {
    if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
  }

  return { ref, onMouseMove: handleMove, onMouseLeave: handleLeave };
}
