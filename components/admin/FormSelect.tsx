type Props = {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  defaultValue?: string;
};

export default function FormSelect({
  label,
  name,
  options,
  required = false,
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

      <select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          py-3
          outline-none
          transition
          focus:border-red-600
          focus:ring-2
          focus:ring-red-200
        "
      >
        <option value="">
          Selecione...
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}