import React, { useEffect, useRef } from "react";

const styles = {
  dot: {
    position: "fixed", width: 10, height: 10,
    background: "var(--cyan)", borderRadius: "50%",
    pointerEvents: "none", zIndex: 9999,
    transform: "translate(-50%,-50%)",
    transition: "transform 0.15s, width 0.2s, height 0.2s",
    mixBlendMode: "difference",
  },
  ring: {
    position: "fixed", width: 34, height: 34,
    border: "1px solid var(--cyan)", borderRadius: "50%",
    pointerEvents: "none", zIndex: 9998,
    transform: "translate(-50%,-50%)",
    opacity: 0.55,
  },
};

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const onMove = (e) => { pos.current.mx = e.clientX; pos.current.my = e.clientY; };
    window.addEventListener("mousemove", onMove);

    let frame;
    const animate = () => {
      const { mx, my } = pos.current;
      pos.current.rx += (mx - pos.current.rx) * 0.13;
      pos.current.ry += (my - pos.current.ry) * 0.13;
      if (dotRef.current) { dotRef.current.style.left = mx + "px"; dotRef.current.style.top = my + "px"; }
      if (ringRef.current) { ringRef.current.style.left = pos.current.rx + "px"; ringRef.current.style.top = pos.current.ry + "px"; }
      frame = requestAnimationFrame(animate);
    };
    animate();

    const grow = () => { if (dotRef.current) dotRef.current.style.transform = "translate(-50%,-50%) scale(2.5)"; };
    const shrink = () => { if (dotRef.current) dotRef.current.style.transform = "translate(-50%,-50%) scale(1)"; };
    document.querySelectorAll("a,button,.project-card,.skill-card").forEach(el => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(frame); };
  }, []);

  return (
    <>
      <div ref={dotRef} style={styles.dot} />
      <div ref={ringRef} style={styles.ring} />
    </>
  );
}
