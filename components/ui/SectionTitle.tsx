type Props = {
  title: string;
  subtitle?: string;
};

export default function SectionTitle({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-10 text-center sm:mb-14">
      <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-red-600" />

      <h2
        className="
          text-2xl
          font-black
          text-gray-900
          sm:text-4xl
        "
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="
            mx-auto
            mt-3
            max-w-2xl
            text-sm
            text-gray-500
            sm:mt-4
            sm:text-base
          "
        >
          {subtitle}
        </p>
      )}

    </div>
  );
}
