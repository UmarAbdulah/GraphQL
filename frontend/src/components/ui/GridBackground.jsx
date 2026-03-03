const GridBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* grid layer */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:28px_28px]" />

      {/* vignette / radial mask layer */}
      <div className="absolute inset-0 -z-10 bg-black/70 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]" />

      {/* app content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GridBackground;
