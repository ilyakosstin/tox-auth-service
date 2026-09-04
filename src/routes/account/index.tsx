import { createFileRoute } from '@tanstack/react-router'

import { Avatar } from '#/components/Avatar.tsx'
import { useCurrentAccount } from '#/hooks/useCurrentAccount.ts'
import ProfileBasicInfoForm from '#/routes/account/ProfileBasicInfoForm.tsx'

export const Route = createFileRoute('/account/')({ component: AccountView })

function AccountView() {
  const { account, loading, error } = useCurrentAccount()

  if (loading) {
    return <p>Loading account...</p>
  } else if(error || account == undefined) {
    return <p>Error!</p>
  }

  return (
    <div className={'grid grid-cols-2 gap-2'}>
      <div>
        <h2>Profile information</h2>
        <ProfileBasicInfoForm />
      </div>
      <Avatar avatarFileDirectoryId={account.avatarFileDirectoryId} />
    </div>
  )

}
