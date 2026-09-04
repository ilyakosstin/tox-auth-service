import { createFileRoute, Link } from '@tanstack/react-router'

import { AuthButton } from '#/components/AuthButton.tsx'
import { AuthInput } from '#/components/AuthInput.tsx'
import { AuthWindow } from '#/components/AuthWindow.tsx'
import { useCsrfToken } from '#/hooks/useCsrfToken.ts'

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>) => ({
    error: search.error === undefined ? undefined : String(search.error),
  }),
  component: Login,
})

function Login() {
  const { error } = Route.useSearch()
  const { token: csrfToken, parameterName: csrfParameterName } = useCsrfToken()

  return (
    <AuthWindow>
      <form
        method="post"
        action="http://auth.local.test:9000/spring/login"
        className="space-y-4"
      >
        <input type="hidden" name={csrfParameterName} value={csrfToken} />
        <AuthInput name="username" placeholder="Username" />
        <AuthInput name="password" type="password" placeholder="Password" />
        {error !== undefined && (
          <p className="text-center text-sm font-medium text-red-600">
            invalid credentials
          </p>
        )}
        <AuthButton type="submit">Log in</AuthButton>
      </form>
      <div className="pt-2 text-center">
        <Link
          to="/register"
          className="text-sm font-medium text-coffee-light hover:underline"
        >
          Create an account
        </Link>
      </div>
    </AuthWindow>
  )
}
