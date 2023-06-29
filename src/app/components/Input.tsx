'use client';

import clsx from 'clsx';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  checkbox?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
  checkbox,
}) => {
  return (
    <div className="mb-3">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-600"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required: id + 'is required' })}
          className={clsx(
            `
            p-2
            form-input
            block
            w-full
            rounded-md 
            py-1.5 
            text-gray-900 
            ring-gray-300 
            placeholder:text-gray-400  
            focus:ring-sky-600 
            sm:text-sm 
            sm:leading-6
          `,
            errors[id] && 'focus:ring-rose-700',
            disabled && 'opacity-50 cursor-default',
            checkbox
              ? 'ring-0'
              : ' ring-1 focus:ring-2 focus:ring-inset shadow-sm '
          )}
        />
      </div>
    </div>
  );
};

export default Input;
