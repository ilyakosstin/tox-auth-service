import { Branding } from './Branding.tsx'

export function AppHeader() {
  return (
    <header className="bg-coffee-light">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Branding size="sm" />
      </div>
    </header>
  )
}
