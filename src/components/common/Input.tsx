import { ChangeEvent } from "react";

interface InputProps {
  placeholder: string;
  value?:string;
  type?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ placeholder, type, onChange }: InputProps) {
  return (
    <div>
      <input
        type={type || "text"}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default Input;
