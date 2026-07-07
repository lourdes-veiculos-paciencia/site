type BadgeProps = {
  children: React.ReactNode;
  color?: "red" | "green";
};

export default function Badge({
  children,
  color = "red",
}: BadgeProps) {
  const colors = {
    red: "bg-red-600",
    green: "bg-green-600",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        ${colors[color]}
        px-2.5
        py-1
        text-[11px]
        font-semibold
        text-white
        shadow-lg
        backdrop-blur-sm
      `}
    >
      {children}
    </span>
  );
}