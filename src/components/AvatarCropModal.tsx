import { useCallback, useRef, useState } from 'react'
import Cropper from 'react-easy-crop'
import type { Area } from 'react-easy-crop'
import 'react-easy-crop/react-easy-crop.css'

import { AuthButton } from '#/components/AuthButton.tsx'
import { uploadAvatar } from '#/lib/account.ts'
import { createImage, getCroppedImage } from '#/lib/cropImage.ts'

export function AvatarCropModal({
  open,
  onClose,
  onUploaded,
}: {
  open: boolean
  onClose: () => void
  onUploaded: () => void
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const reset = () => {
    setImageSrc(null)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setCroppedAreaPixels(null)
    setUploading(false)
    setError(null)
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    const reader = new FileReader()
    reader.addEventListener('load', () => {
      setImageSrc(String(reader.result))
      setError(null)
    })
    reader.readAsDataURL(file)
  }

  const onCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels)
  }, [])

  async function handleSave() {
    if (!imageSrc || !croppedAreaPixels) return

    setUploading(true)
    setError(null)

    try {
      const image = await createImage(imageSrc)
      const blob = await getCroppedImage(image, croppedAreaPixels, 256)
      const file = new File([blob], 'avatar.png', { type: 'image/png' })
      await uploadAvatar(file)
      reset()
      onUploaded()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to upload avatar')
      setUploading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-bold text-gray-800">Change avatar</h2>

        {error !== null && (
          <p className="mt-2 text-sm font-medium text-red-600">{error}</p>
        )}

        {imageSrc ? (
          <div className="mt-4">
            <div className="relative h-64 w-full overflow-hidden rounded-lg bg-gray-900">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <label className="mt-4 flex items-center gap-3">
              <span className="text-sm text-gray-600">Zoom</span>
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(event) => setZoom(Number(event.target.value))}
                className="w-full"
              />
            </label>

            <div className="mt-6 flex flex-col gap-3">
              <AuthButton onClick={handleSave} disabled={uploading}>
                {uploading ? 'Uploading…' : 'Save avatar'}
              </AuthButton>
              <AuthButton onClick={() => fileInputRef.current?.click()}>
                Choose another image
              </AuthButton>
              <AuthButton onClick={handleClose} disabled={uploading}>
                Cancel
              </AuthButton>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex flex-col items-center gap-4">
            <p className="text-sm text-gray-500">
              Select an image, then crop the part you want to use as your
              avatar.
            </p>
            <AuthButton onClick={() => fileInputRef.current?.click()}>
              Choose image
            </AuthButton>
            <AuthButton onClick={handleClose}>Cancel</AuthButton>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  )
}
