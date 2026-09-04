import type { Area } from 'react-easy-crop'

export function createImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.src = src
  })
}

export function getCroppedImage(
  image: HTMLImageElement,
  croppedAreaPixels: Area,
  outputSize = 256,
): Promise<Blob> {
  const canvas = document.createElement('canvas')
  canvas.width = outputSize
  canvas.height = outputSize

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Could not create canvas context')
  }

  context.clearRect(0, 0, outputSize, outputSize)
  context.beginPath()
  context.arc(outputSize / 2, outputSize / 2, outputSize / 2, 0, Math.PI * 2)
  context.closePath()
  context.clip()

  context.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    outputSize,
    outputSize,
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error('Failed to export cropped image'))
      }
    }, 'image/png')
  })
}
