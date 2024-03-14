import React from 'react'
import { ImageEditorProps, ImageEditorType } from './types'
import { blob2imageBitmap, dataImage2blob, drawImage } from './utils'

const ImageEditor: React.ForwardRefRenderFunction<ImageEditorType, ImageEditorProps> = (props, ref) => {
  const {
    image,
    width,
    height,
    cropWidth,
    cropHeight,
    fitImageIntoCropArea,
    // minScale = 1,
    // maxScale = 4,
    bgColor = 'transparent'
  } = props
  const originalScale = React.useRef(1)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [bitmap, setBitmap] = React.useState<ImageBitmap>()
  const [dragging, setDragging] = React.useState({
    started: false,
    originX: 0,
    originY: 0,
    offsetX: 0,
    offsetY: 0,
    imageX: 0,
    imageY: 0,
    scale: 1
  })

  React.useImperativeHandle(ref, () => ({
    getCroppedImage: async (): Promise<Blob | null> => {
      const canvas = canvasRef.current
      const context = canvas?.getContext('2d')
      const cropX = (width - cropWidth) / 2
      const cropY = (height - cropHeight) / 2
      const data = context?.getImageData(cropX, cropY, cropWidth, cropHeight)
      return data ? dataImage2blob(data) : null
    }
  }))

  // draws image
  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !bitmap) {
      return
    }

    drawImage({
      canvas,
      bitmap,
      x: dragging.imageX + dragging.offsetX,
      y: dragging.imageY + dragging.offsetY,
      width,
      height,
      cropWidth,
      cropHeight,
      scale: dragging.scale,
      bgColor
    })
  }, [dragging, bitmap, width, height, cropWidth, cropHeight, bgColor])

  // setup dragging
  React.useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas || e.target !== canvas) {
        return
      }

      setDragging((dragging) => ({
        ...dragging,
        started: true,
        originX: e.clientX,
        originY: e.clientY,
        offsetX: 0,
        offsetY: 0
      }))
    }

    const onMouseMove = (e: MouseEvent) => {
      setDragging((dragging) =>
        dragging.started
          ? {
              ...dragging,
              offsetX: (e.clientX - dragging.originX) / dragging.scale,
              offsetY: (e.clientY - dragging.originY) / dragging.scale
            }
          : dragging
      )

      // prevent text selection
      e.preventDefault()
    }

    const onMouseUp = (e: MouseEvent) => {
      setDragging((dragging) =>
        dragging.started
          ? {
              ...dragging,
              started: false,
              offsetX: 0,
              offsetY: 0,
              imageX: dragging.imageX + (e.clientX - dragging.originX) / dragging.scale,
              imageY: dragging.imageY + (e.clientY - dragging.originY) / dragging.scale
            }
          : dragging
      )
    }

    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [image, width, height, cropWidth, cropHeight])

  // loads bitmap from blob image
  React.useEffect(() => {
    const loadImage = async () => {
      const bitmap = await blob2imageBitmap(image)

      if (fitImageIntoCropArea) {
        const imageWidth = bitmap.width
        const imageHeight = bitmap.height
        const imageTan = imageHeight / imageWidth
        const cropTan = cropHeight / cropWidth
        const scale = imageTan < cropTan ? cropWidth / imageWidth : cropHeight / imageHeight
        originalScale.current = scale
        setDragging((dragging) => ({ ...dragging, scale }))
      }

      setBitmap(bitmap)
    }

    loadImage()
  }, [image, cropWidth, cropHeight, fitImageIntoCropArea])

  return <canvas ref={canvasRef} width={width} height={height} />
}

export default React.forwardRef(ImageEditor)
