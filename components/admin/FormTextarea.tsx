type Props = {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
  defaultValue?: string;
};

export default function FormTextarea({
  label,
  name,
  placeholder,
  rows = 5,
  defaultValue,
}: Props) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-gray-700"
      >
        {label}
      </label>

      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          px-4
          py-3
          outline-none
          transition
          focus:border-red-600
          focus:ring-2
          focus:ring-red-200
        "
      />
    </div>
  );
}