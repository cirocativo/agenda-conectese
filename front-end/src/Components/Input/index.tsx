export interface IinputProps {
  label: string;
  type: string;
}

export function Input({ label, type }: IinputProps) {
  return (
    <label className="text-white font-bold">
      {label}
      <input
        type={type}
        className="mb-5 w-80 h-12 rounded-lg px-2 bg-slate-800 text-white block"
      />
    </label>
  );
}
