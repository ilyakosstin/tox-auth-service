import { createFileRoute, Link } from '@tanstack/react-router'
import type { FormEvent } from 'react'

import { AuthButton } from '#/components/AuthButton.tsx'
import { AuthInput } from '#/components/AuthInput.tsx'
import { AuthWindow } from '#/components/AuthWindow.tsx'
import { useCsrfToken } from '#/hooks/useCsrfToken.ts'

export const Route = createFileRoute('/register')({ component: Register })

function Register() {
  const { token: csrfToken, parameterName: csrfParameterName } = useCsrfToken()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = String(formData.get('username') ?? '')
    const password = String(formData.get('password') ?? '')
    const email = String(formData.get('email') ?? '')
    const profileName = String(formData.get('profileName') ?? '')
    const headers = {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': csrfToken,
    }

    const body: Record<string, string | null> = {
      username,
      password,
      email: email === '' ? null : email,
      profileName: profileName === '' ? null : profileName,
    }

    const response = await fetch('http://auth.local.test:9000/api/register', {
      method: 'POST',
      credentials: 'include',
      headers: headers,
      body: JSON.stringify(body),
      redirect: 'error',
    })

    if (response.status === 200) {
      ;(event.target as HTMLFormElement).submit()
    } else {
      alert('Error creating account!')
    }
  }

  return (
    <AuthWindow>
      <form
        className="space-y-4"
        onSubmit={handleSubmit}
        method="post"
        action="http://auth.local.test:9000/spring/login"
      >
        <AuthInput name="username" placeholder="Username" />
        <AuthInput name="email" placeholder="Email (optional)" />
        <AuthInput name="profileName" placeholder="Profile name (optional)" />
        <AuthInput name="password" type="password" placeholder="Password" />
        <AuthInput
          name="repeatPassword"
          type="password"
          placeholder="Repeat password"
        />
        <AuthButton type="submit">Register</AuthButton>
        <input type="hidden" name={csrfParameterName} value={csrfToken} />
      </form>
      <div className="pt-2 text-center">
        <Link
          to="/login"
          className="text-sm font-medium text-coffee-light hover:underline"
        >
          I already have an account
        </Link>
      </div>
    </AuthWindow>
  )
}
