type BadgeProps = {
  children: React.ReactNode;
  color?: "red" | "green";
};

export default function Badge({
  children,
  color = "red",
}: BadgeProps) {
  const bg =
    color === "red"
      ? "bg-red-600"
      : "bg-green-600";

  return (
    <span
      className={`${bg} text-white text-xs font-bold px-3 py-1 rounded-full`}
    >
      {children}
    </span>
  );
}