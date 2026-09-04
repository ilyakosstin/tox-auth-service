import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import CoffeeVoid from '#/components/outlet/CoffeeVoid.tsx'
import CentralWindow from '#/components/outlet/CentralWindow.tsx'

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  return (
    <>
      <CoffeeVoid>
        <CentralWindow>
          <Outlet />
        </CentralWindow>
      </CoffeeVoid>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
