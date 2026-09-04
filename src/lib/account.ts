const AUTH_BASE = 'http://auth.local.test:9000'
const FS_BASE = 'http://fs.local.test:8000'

export interface AccountPrivateDto {
  id: string
  username: string
  profileName: string | null
  email: string | null
  createdAt: string
  avatarFileDirectoryId: string | null
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function fetchCurrentAccount(): Promise<AccountPrivateDto> {
  const response = await fetch(`${AUTH_BASE}/api/account`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new ApiError(
      `Failed to load account (${response.status})`,
      response.status,
    )
  }

  return (await response.json()) as AccountPrivateDto
}

export async function fetchCsrfToken(): Promise<{
  token: string
  parameterName: string
}> {
  const response = await fetch(`${AUTH_BASE}/api/csrf`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new ApiError(
      `Failed to load CSRF token (${response.status})`,
      response.status,
    )
  }

  return (await response.json()) as {
    token: string
    parameterName: string
  }
}

export async function uploadAvatar(file: File): Promise<void> {
  const { token } = await fetchCsrfToken()

  const formData = new FormData()
  formData.append('avatar', file, file.name)

  const response = await fetch(`${AUTH_BASE}/api/avatar`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'X-XSRF-TOKEN': token,
    },
    body: formData,
  })

  if (response.status !== 200) {
    throw new Error(`Failed to upload avatar (${response.status})`)
  }
}

export function avatarSrc(avatarFileDirectoryId: string): string {
  return `${FS_BASE}/file/${avatarFileDirectoryId}/last?type=image`
}

export async function patchAccountField(fieldName: string, value: any) {
  const { token } = await fetchCsrfToken()

  return await fetch(`${AUTH_BASE}/api/account/${fieldName}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'X-XSRF-TOKEN': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ value: value }),
  })
}

export interface ApiErrorDto {
  status: number
  code: string
  message: string
}

export interface ApiErrorParseResult {
  validationErrors: Partial<Record<string, string[]>> | null
  error: ApiErrorDto | null
}

export async function parseErrorResponse(
  response: Response,
): Promise<ApiErrorParseResult> {
  if (response.ok) {
    return { validationErrors: null, error: null }
  }

  try {
    const body: unknown = await response.json()

    if (body == null || typeof body !== 'object') {
      return { validationErrors: null, error: null }
    }

    const record = body as Record<string, unknown>

    const validationErrors =
      record.validationErrors != null &&
      typeof record.validationErrors === 'object'
        ? (record.validationErrors as Record<string, string[]>)
        : null

    const error: ApiErrorDto = {
      status:
        typeof record.status === 'number' ? record.status : response.status,
      code: typeof record.code === 'string' ? record.code : 'UNKNOWN_ERROR',
      message:
        typeof record.message === 'string'
          ? record.message
          : `Request failed (${response.status})`,
    }

    return { validationErrors, error }
  } catch {
    return { validationErrors: null, error: null }
  }
}
