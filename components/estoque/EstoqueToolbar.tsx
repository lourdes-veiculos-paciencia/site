import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function EstoqueToolbar({
  children,
}: Props) {
  return (
    <section
      className="
        mb-10
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-lg
      "
    >
      {children}
    </section>
  );
}