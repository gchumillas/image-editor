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
  const [transformation, setTransformation] = React.useState({
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
      x: transformation.imageX + transformation.offsetX,
      y: transformation.imageY + transformation.offsetY,
      width,
      height,
      cropWidth,
      cropHeight,
      scale: transformation.scale,
      bgColor
    })
  }, [transformation, bitmap, width, height, cropWidth, cropHeight, bgColor])

  // setup transformation
  React.useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas || e.target !== canvas) {
        return
      }

      setTransformation((transformation) => ({
        ...transformation,
        started: true,
        originX: e.clientX,
        originY: e.clientY,
        offsetX: 0,
        offsetY: 0
      }))
    }

    const onMouseMove = (e: MouseEvent) => {
      setTransformation((transformation) =>
        transformation.started
          ? {
              ...transformation,
              offsetX: (e.clientX - transformation.originX) / transformation.scale,
              offsetY: (e.clientY - transformation.originY) / transformation.scale
            }
          : transformation
      )

      // prevent text selection
      e.preventDefault()
    }

    const onMouseUp = (e: MouseEvent) => {
      setTransformation((transformation) =>
        transformation.started
          ? {
              ...transformation,
              started: false,
              offsetX: 0,
              offsetY: 0,
              imageX: transformation.imageX + (e.clientX - transformation.originX) / transformation.scale,
              imageY: transformation.imageY + (e.clientY - transformation.originY) / transformation.scale
            }
          : transformation
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
        setTransformation((transformation) => ({ ...transformation, scale }))
      }

      setBitmap(bitmap)
    }

    loadImage()
  }, [image, cropWidth, cropHeight, fitImageIntoCropArea])

  return <canvas ref={canvasRef} width={width} height={height} />
}

export default React.forwardRef(ImageEditor)
