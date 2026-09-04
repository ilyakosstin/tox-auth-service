import type { InputHTMLAttributes } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function FormField({
  label,
  error,
  className = '',
  ...rest
}: FormFieldProps) {
  const base =
    'w-full rounded-xl border bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 transition-all focus:outline-none focus:ring-2'

  const stateClasses = error
    ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
    : 'border-gray-300 hover:border-gray-400 focus:border-coffee-light focus:ring-coffee-light/25'

  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <input
        className={`${base} ${stateClasses} ${className}`}
        aria-invalid={error != null}
        {...rest}
      />
      {error != null && (
        <span role="alert" className="block text-sm font-medium text-red-600">
          {error}
        </span>
      )}
    </label>
  )
}
