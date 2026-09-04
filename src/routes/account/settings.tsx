import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { Avatar } from '#/components/Avatar.tsx'
import { AuthButton } from '#/components/AuthButton.tsx'
import { AuthInput } from '#/components/AuthInput.tsx'
import { AvatarCropModal } from '#/components/AvatarCropModal.tsx'
import { useCurrentAccount } from '#/hooks/useCurrentAccount.ts'
import ProfileBasicInfoForm from '#/routes/account/ProfileBasicInfoForm.tsx'

export const Route = createFileRoute('/account/settings')({
  component: AccountSettings,
})

function AccountSettings() {
  const { account, loading, error, refresh } = useCurrentAccount()
  const [cropModalOpen, setCropModalOpen] = useState(false)

  if (loading) {
    return <p>Loading account...</p>
  } else if (error || account == undefined) {
    return <p>Error!</p>
  }

  return (
    <div>
      <div className={'grid grid-cols-2 gap-8'}>
        <div>
          <h2>Profile information</h2>
          <ProfileBasicInfoForm />
        </div>
        <div>
          <Avatar
            className="w-full"
            avatarFileDirectoryId={account.avatarFileDirectoryId}
          />
          <button
            className="w-full mt-2"
            onClick={() => setCropModalOpen(true)}
          >
            Change avatar
          </button>
        </div>
      </div>
      <div>
        <h2>Actions</h2>
        <ul>
          <li>
            <button>Change password</button>
          </li>
          <li>
            <button>Log out</button>
          </li>
          <li>
            <button>Delete account</button>
          </li>
        </ul>
      </div>

      <AvatarCropModal
        open={cropModalOpen}
        onClose={() => setCropModalOpen(false)}
        onUploaded={refresh}
      />
    </div>
  )
}

function AccountSettings1() {
  const { account, refresh } = useCurrentAccount()
  const [cropModalOpen, setCropModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-800">Account settings</h1>

      <ProfileBasicInfoForm/>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <Avatar
          avatarFileDirectoryId={account?.avatarFileDirectoryId ?? null}
          alt="Avatar"
          className="h-20 w-20"
        />
        <AuthButton onClick={() => setCropModalOpen(true)}>
          Change avatar
        </AuthButton>
      </div>

      <div className="space-y-4">
        <AuthInput
          placeholder="Username"
          value={account?.username ?? ''}
          readOnly
        />
        <AuthInput placeholder="Email" value={account?.email ?? ''} />
        <AuthInput
          placeholder="Profile name"
          value={account?.profileName ?? ''}
        />
      </div>
      <div className="flex flex-col gap-3 border-t border-gray-200 pt-6">
        <AuthButton>Change password</AuthButton>
        <AuthButton>Delete account</AuthButton>
        <AuthButton>Log out</AuthButton>
      </div>


    </div>
  )
}
