import { InputHTMLAttributes } from 'react';
import { FormField } from './FormField';
import { BaseFieldProps } from './types';

interface TextInputProps<T>
  extends BaseFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'name'> {
  type?: 'date' | 'time';
  name: keyof T;
  onChange: (attribute: keyof T, value: string) => void;
}

/**
 * Um input comum que suporta texto, email e números
 */
export default function TextInput<T>({
  label,
  error,
  required,
  type = 'date',
  value,
  icon,
  name,
  onChange,
  ...props
}: TextInputProps<T>) {
  return (
    <FormField label={label} error={error} required={required}>
      {icon && (
        <span className='absolute top-2.5 left-2 text-xl text-text-secondary shrink-0'>
          {icon}
        </span>
      )}
      <input
        type={type}
        value={value}
        name={String(name)}
        onChange={(e) => onChange(e.target.name as keyof T, e.target.value)}
        className={`w-full h-10 py-2 p-2 text-sm text-text-primary rounded border focus:outline-none focus:border-2 ${
          error ? 'border-red' : 'border-text-primary'
        } ${icon ? 'pr-2 pl-8' : 'px-2'}`}
        {...props}
      />
    </FormField>
  );
}
