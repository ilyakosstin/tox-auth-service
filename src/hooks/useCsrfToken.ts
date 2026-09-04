import { useEffect, useState } from 'react'

import { fetchCsrfToken } from '#/lib/account.ts'

export function useCsrfToken() {
  const [token, setToken] = useState('')
  const [parameterName, setParameterName] = useState('_csrf')

  useEffect(() => {
    let cancelled = false

    fetchCsrfToken()
      .then(({ token: fetchedToken, parameterName: fetchedParameterName }) => {
        if (!cancelled) {
          setToken(fetchedToken)
          setParameterName(fetchedParameterName)
        }
      })
      .catch(() => {
        // token stays empty; form submission without CSRF will be rejected
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { token, parameterName }
}
