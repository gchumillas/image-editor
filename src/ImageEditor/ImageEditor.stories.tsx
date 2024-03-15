import React from 'react'
import { Button, Slider } from '@mui/material'
import { Crop, Download, Upload, FitScreen } from '@mui/icons-material'
import ImageEditor from './ImageEditor'
import { ImageEditorProps, ImageEditorType } from './types'

export default {
  title: 'ImageEditor',
  argTypes: {
    bgColor: {
      control: { type: 'select' },
      options: ['transparent', 'azure', 'cornsilk', 'lavenderBlush', 'tomato'],
      defaultValue: 'lavenderBlush'
    },
    width: {
      control: { type: 'number' },
      defaultValue: 500
    },
    height: {
      control: { type: 'number' },
      defaultValue: 375
    },
    cropWidth: {
      control: { type: 'number' },
      defaultValue: 240
    },
    cropHeight: {
      control: { type: 'number' },
      defaultValue: 180
    }
  }
}

const saveFile = (blob: Blob, filename: string) => {
  const a = document.createElement('a')
  document.body.appendChild(a)
  const url = window.URL.createObjectURL(blob)
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => {
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }, 0)
}

export const Example = ({ bgColor, width, height, cropWidth, cropHeight }: ImageEditorProps) => {
  const imageEditorRef = React.useRef<ImageEditorType>(null)
  const [image, setImage] = React.useState<ImageBitmap>()
  const [cropImage, setCropImage] = React.useState<Blob>()
  const [scale, setScale] = React.useState(100)

  const doScaleImage = (scale: number) => {
    setScale(scale)
  }

  const doChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageEditor = imageEditorRef.current!
    const files = e.target.files
    if (files?.length) {
      await imageEditor.loadImageFromFile(files[0])
      setScale(100)
      setCropImage(undefined)
    }
  }

  const doCropImage = async () => {
    const imageEditor = imageEditorRef.current!
    const croppedImage = await imageEditor.getCroppedImage()
    if (croppedImage) {
      setCropImage(croppedImage)
    }
  }

  const doFitImage = () => {
    if (!image) return
    const scaleX = cropWidth / image.width
    const scaleY = cropHeight / image.height
    const scale = Math.min(scaleX, scaleY)
    setScale(scale * 100)
  }

  const doDownloadImage = () => {
    if (!cropImage) return
    saveFile(cropImage, 'image.png')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex gap-3">
        {/* IMAGE EDITOR */}
        <div className="flex flex-col items-start gap-3">
          {/* CONTROL BUTTONS */}
          <div className="flex gap-3">
            <Button
              startIcon={<Upload />}
              variant="contained"
              size="small"
              component="label"
              role={undefined}
              tabIndex={-1}
              className="relative"
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => doChangeImage(e)}
                className="absolute inset-0 hidden"
              />
              <span className="relative">Upload</span>
            </Button>
            <Button disabled={!image} startIcon={<Crop />} variant="contained" size="small" onClick={doCropImage}>
              Crop
            </Button>
            <Button disabled={!image} startIcon={<FitScreen />} variant="contained" size="small" onClick={doFitImage}>
              Fit
            </Button>
          </div>
          <ImageEditor
            ref={imageEditorRef}
            width={width}
            height={height}
            cropWidth={cropWidth}
            cropHeight={cropHeight}
            scale={scale / 100}
            bgColor={bgColor}
            onLoadImage={setImage}
            className="border-2 border-neutral-300"
          >
            <Button component="label" role={undefined} tabIndex={-1} className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => doChangeImage(e)}
                className="absolute inset-0 hidden"
              />
              <Upload sx={{ fontSize: 60 }} className="relative" />
            </Button>
          </ImageEditor>
          <Slider min={50} max={150} value={scale} onChange={(_, size) => doScaleImage(size as number)} />
        </div>

        {/* CROPPED IMAGE */}
        <div className="flex flex-col items-start gap-3">
          {/* CONTROL BUTTONS */}
          <Button
            disabled={!cropImage}
            startIcon={<Download />}
            variant="contained"
            size="small"
            onClick={doDownloadImage}
          >
            Download
          </Button>
          <div className="border-2 border-neutral-300" style={{ width: cropWidth, height: cropHeight }}>
            {cropImage && <img alt="cropped image" src={URL.createObjectURL(cropImage)} />}
          </div>
        </div>
      </div>
    </div>
  )
}
Example.storyName = 'ImageEditor'
