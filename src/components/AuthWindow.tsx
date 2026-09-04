import { Branding } from './Branding.tsx'

export function AuthWindow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-coffee-light px-4">
      <div className="w-full max-w-sm rounded-xl bg-gray-100 p-8 shadow-xl">
        <Branding />
        <div className="mt-8 space-y-4">{children}</div>
      </div>
    </div>
  )
}
