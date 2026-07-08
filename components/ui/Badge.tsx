type BadgeProps = {
  children: React.ReactNode;
  color?: "red" | "green" | "dark";
};

export default function Badge({
  children,
  color = "red",
}: BadgeProps) {
  const colors = {
    red: "bg-red-600",
    green: "bg-emerald-600",
    dark: "bg-zinc-950",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        ${colors[color]}
        px-3
        py-1
        text-[11px]
        font-semibold
        uppercase
        tracking-wide
        text-white
        shadow-sm
        backdrop-blur-sm
      `}
    >
      {children}
    </span>
  );
}
