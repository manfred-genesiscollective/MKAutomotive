/**
 * Renders text with its final full stop in champagne gold: the dot that ends
 * every headline on the site. Text that ends any other way is left alone.
 */
export function Dotted({ children }: { children: string }) {
  if (!children.endsWith(".")) return <>{children}</>;
  return (
    <>
      {children.slice(0, -1)}
      <span className="dot">.</span>
    </>
  );
}
