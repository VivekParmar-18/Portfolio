// Two static, extremely subtle glows. Deliberately not animated and not
// filter-blurred: the radial gradients are already soft, and permanently
// animating large blurred layers costs continuous compositing for motion
// that is imperceptible at 4% alpha.
const BackgroundElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <div
        className="absolute top-20 left-10 w-64 h-64 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(96, 165, 250, 0.05) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-40 right-10 w-96 h-96 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)' }}
      />
    </div>
  );
};

export default BackgroundElements;
