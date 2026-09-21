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
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-4
        sm:p-6
        shadow-sm
      "
    >
      {children}
    </section>
  );
}
