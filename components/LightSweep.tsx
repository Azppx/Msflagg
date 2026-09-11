export function LightSweep() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: "-35%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 1100,
        height: 850,
        pointerEvents: "none",
        zIndex: 0,
        background: "radial-gradient(ellipse at center, rgba(157, 92, 255, 0.34) 0%, transparent 60%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 380px 320px at 50% 30%, rgba(190, 130, 255, 0.5), transparent 70%)",
          filter: "blur(4px)",
        }}
      />
    </div>
  );
}
