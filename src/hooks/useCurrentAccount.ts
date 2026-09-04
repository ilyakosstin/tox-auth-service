import { useNavigate } from '@tanstack/react-router'
import { useCallback, useEffect, useState } from 'react'

import { ApiError, fetchCurrentAccount } from '#/lib/account.ts'
import type { AccountPrivateDto } from '#/lib/account.ts'

export function useCurrentAccount() {
  const [account, setAccount] = useState<AccountPrivateDto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [version, setVersion] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false

    fetchCurrentAccount()
      .then((data) => {
        if (!cancelled) {
          setAccount(data)
          setError(null)
        }
      })
      .catch((e: unknown) => {
        if (cancelled) return
        if (e instanceof ApiError && e.status === 401) {
          void navigate({ to: '/login', search: { error: undefined } })
          return
        }
        setError(e instanceof Error ? e.message : 'Failed to load account')
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [navigate, version])

  const refresh = useCallback(() => {
    setVersion((current) => current + 1)
  }, [])

  return { account, loading, error, refresh }
}
