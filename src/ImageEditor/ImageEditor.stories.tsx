import React from 'react'
import Slider from '@mui/material/Slider'
import ImageEditor from './ImageEditor'
import { ImageEditorProps, ImageEditorType } from './types'
import { Button } from '@mui/material'

export default {
  title: 'ImageEditor',
  argTypes: {
    bgColor: {
      control: { type: 'select' },
      options: ['transparent', 'azure', 'cornsilk', 'lavenderBlush', 'tomato'],
      defaultValue: 'tomato'
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
    },
    scale: {
      control: { type: 'number' },
      defaultValue: 1
    }
  }
}

export const Example = ({ bgColor, width, height, cropWidth, cropHeight }: ImageEditorProps) => {
  const imageEditorRef = React.useRef<ImageEditorType>(null)
  const [cropImage, setCropImage] = React.useState<Blob>()
  const [scale, setScale] = React.useState(100)

  const doScaleChange = (scale: number) => {
    setScale(scale)
  }

  // TODO: rename to doFileChange
  const doChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageEditor = imageEditorRef.current!
    const files = e.target.files
    if (files?.length) {
      imageEditor.loadImageFromFile(files[0])
    }
  }

  const doCrop = async () => {
    const imageEditor = imageEditorRef.current!
    const croppedImage = await imageEditor.getCroppedImage()
    if (croppedImage) {
      setCropImage(croppedImage)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <Button
            variant="contained"
            size="small"
            component="label"
            role={undefined}
            tabIndex={-1}
            className="relative"
          >
            <input type="file" accept="image/*" onChange={(e) => doChange(e)} className="absolute inset-0 hidden" />
            <span className="relative">Upload</span>
          </Button>
          <Button variant="contained" size="small" onClick={doCrop}>
            Crop!
          </Button>
        </div>
        <div className="flex gap-3">
          <div>
            <ImageEditor
              ref={imageEditorRef}
              width={width}
              height={height}
              cropWidth={cropWidth}
              cropHeight={cropHeight}
              scale={scale / 100}
              bgColor={bgColor}
              className="border-2 border-neutral-300"
            >
              <input type="file" accept="image/*" onChange={(e) => doChange(e)} />
            </ImageEditor>
            <Slider min={50} max={150} value={scale} onChange={(_, size) => doScaleChange(size as number)} />
          </div>
          <div className="border-2 border-neutral-300" style={{ width: cropWidth, height: cropHeight }}>
            {cropImage && <img alt="cropped image" src={URL.createObjectURL(cropImage)} />}
          </div>
        </div>
      </div>
    </div>
  )
}
Example.storyName = 'ImageEditor'
