import type { ButtonHTMLAttributes } from 'react'

export function AuthButton({
  children,
  type = 'button',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className="w-full rounded-lg bg-coffee-light py-4 text-lg font-bold text-white shadow-md transition-colors hover:bg-coffee-light/90 disabled:cursor-not-allowed disabled:opacity-60"
      {...rest}
    >
      {children}
    </button>
  )
}
