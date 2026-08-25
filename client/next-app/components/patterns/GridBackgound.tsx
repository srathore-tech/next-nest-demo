export default function GridBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(30,27,75,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,27,75,0.055) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
      }}
    />
  );
}
