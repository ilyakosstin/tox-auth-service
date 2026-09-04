import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { FormField } from '#/components/FormField.tsx'
import { useCurrentAccount } from '#/hooks/useCurrentAccount.ts'
import { parseErrorResponse, patchAccountField } from '#/lib/account.ts'

interface ProfileInfoFormValues {
  username: string
  email: string
  profileName: string
}

export default function ProfileBasicInfoForm() {
  const { account, loading, error, refresh} = useCurrentAccount()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ProfileInfoFormValues>()

  useEffect(() => {
    if (account != null) {
      reset({
        username: account.username,
        email: account.email ?? '',
        profileName: account.profileName ?? '',
      })
    }
  }, [account, reset])

  function inputTransform(value: string): string | null {
    const trimmed = value.trim()
    return trimmed.length === 0 ? null : trimmed
  }

  async function submitPartial(data: ProfileInfoFormValues) {
    if (account == null || isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setNotice(null)

    try {
      const keys = ['username', 'email', 'profileName'] as const

      const responses = await Promise.all(
        keys.map((key) =>
          data[key] == account[key] ? null : patchAccountField(key, data[key]),
        ),
      )

      let savedCount = 0

      for (let i = 0; i < keys.length; i++) {
        const response = responses[i]
        if (response == null) {
          continue
        }

        if (!response.ok) {
          const { validationErrors, error: apiError } =
            await parseErrorResponse(response)

          if (validationErrors != null) {
            const messages = validationErrors.value
            if (messages != null && messages.length > 0) {
              setError(keys[i], { message: messages[0] })
              continue
            }
          }

          if (apiError != null) {
            setError('root', {
              message: `Failed to save ${keys[i]}: ${apiError.message}`,
            })
          }
          continue
        }

        savedCount += 1
      }

      if (savedCount > 0) {
        setNotice('Your changes have been saved.')
        refresh()
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <p className="text-gray-500">Loading account form...</p>
  }

  if (error != null || account == null) {
    return <p className="text-red-600">Could not load account form.</p>
  }

  return (
    <form
      onSubmit={handleSubmit(submitPartial)}
      className="w-full space-y-5"
    >
      <div className="space-y-4">
        <FormField
          label="Username"
          error={errors.username?.message}
          placeholder="ilyakosstin"
          autoComplete="username"
          {...register('username', {
            setValueAs: inputTransform,
          })}
        />

        <FormField
          label="Email"
          type="email"
          error={errors.email?.message}
          placeholder="ilya@cfx.ru"
          autoComplete="email"
          {...register('email', {
            setValueAs: inputTransform,
          })}
        />

        <FormField
          label="Profile name"
          error={errors.profileName?.message}
          placeholder="Sir Ilya Kostin"
          {...register('profileName', {
            setValueAs: inputTransform,
          })}
        />
      </div>

      {errors.root != null && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {errors.root.message}
        </p>
      )}

      {notice != null && errors.root == null && (
        <p role="status" className="text-sm font-medium text-emerald-600">
          {notice}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-coffee-light py-3 text-lg font-bold text-white shadow-md transition-colors hover:bg-coffee-light/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Saving…' : 'Save changes'}
      </button>
    </form>
  )
}
