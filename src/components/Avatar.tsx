import { avatarSrc } from '#/lib/account.ts'

export function Avatar({
  avatarFileDirectoryId,
  alt,
  className,
}: {
  avatarFileDirectoryId: string | null
  alt?: string
  className?: string
}) {
  if (!avatarFileDirectoryId) {
    return (
      <div
        className={`rounded-full bg-gray-200 aspect-square ${className ?? ''}`}
        aria-label={alt}
      />
    )
  }

  return (
    <img
      src={avatarSrc(avatarFileDirectoryId)}
      alt={alt ?? ''}
      className={`rounded-full object-cover ${className ?? ''}`}
    />
  )
}
