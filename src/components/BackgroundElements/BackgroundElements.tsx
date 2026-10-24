const BackgroundElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <div
        className="absolute top-10 left-1/4 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-40"
        style={{ background: 'radial-gradient(circle, color-mix(in oklab, var(--color-cool) 14%, transparent) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-20 right-1/4 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-35"
        style={{ background: 'radial-gradient(circle, color-mix(in oklab, var(--color-accent) 12%, transparent) 0%, transparent 70%)' }}
      />
    </div>
  );
};

export default BackgroundElements;
