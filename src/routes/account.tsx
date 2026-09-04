import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Branding } from '#/components/Branding.tsx'


export const Route = createFileRoute('/account')({ component: AccountLayout })

function AccountLayout() {
  return (
    <>
      <div>
        <Branding text={"My Tox.ID"} size={'md'}/>
      </div>
      <Outlet />
    </>
  )
}
