import type { InputHTMLAttributes } from 'react'

export function AuthInput({
  type = 'text',
  placeholder,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:border-coffee-light focus:outline-none"
      {...rest}
    />
  )
}
