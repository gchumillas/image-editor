export const blob2imageBitmap = (file: Blob): Promise<ImageBitmap> => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.addEventListener('load', () => {
      URL.revokeObjectURL(url)
      resolve(window.createImageBitmap(img))
    })
    img.addEventListener('error', () => {
      URL.revokeObjectURL(url)
      reject(new Error('invalid image'))
    })
    img.src = url
  })
}

export const dataImage2blob = (imageData: ImageData): Promise<Blob | null> => {
  const w = imageData.width
  const h = imageData.height
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  ctx?.putImageData(imageData, 0, 0)

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob))
  })
}

export const drawImage = (params: {
  canvas: HTMLCanvasElement
  image: ImageBitmap
  x: number
  y: number
  width: number
  height: number
  cropWidth: number
  cropHeight: number
  scale: number
  bgColor: string
}) => {
  const { canvas, image, x, y, width, height, cropWidth, cropHeight, scale, bgColor } = params
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }

  // draws the image
  ctx.fillStyle = bgColor
  ctx.clearRect(0, 0, width, height)
  ctx.fillRect(0, 0, width, height)
  ctx.drawImage(
    // origin
    image,
    0,
    0,
    image.width,
    image.height,
    // destination
    scale * x + (width - scale * image.width) / 2,
    scale * y + (height - scale * image.height) / 2,
    scale * image.width,
    scale * image.height
  )

  // draws the semitransparent overlay
  const w0 = width
  const h0 = height
  const w1 = cropWidth + 2
  const h1 = cropHeight + 2
  const w2 = (w0 - w1) / 2
  const h2 = (h0 - h1) / 2
  ctx.fillStyle = 'rgba(225,225,225,0.75)'
  // The first one is a counterclockwise rectangle (see the negative height).
  // And the second is a clockwise rectangle.
  // They both define the outer surface of a rectangle.
  // Magic!
  ctx.rect(w2, h1 + h2, w1, -h1)
  ctx.rect(0, 0, w0, h0)
  ctx.fill()
}
