import React from 'react'
import ImageEditor from './ImageEditor'
import { ImageEditorProps, ImageEditorType } from './types'

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
    fitImageIntoCropArea: {
      control: { type: 'boolean' },
      defaultValue: false
    },
    minScale: {
      control: { type: 'number' },
      defaultValue: 1
    },
    maxScale: {
      control: { type: 'number' },
      defaultValue: 4
    }
  },
  parameters: {
    viewport: {
      defaultViewport: 'largeTablet'
    }
  }
}

export const Example = ({
  bgColor,
  width,
  height,
  cropWidth,
  cropHeight,
  fitImageIntoCropArea,
  minScale,
  maxScale
}: ImageEditorProps) => {
  const imageEditorRef = React.useRef<ImageEditorType>(null)
  const [image, setImage] = React.useState<Blob>()
  const [cropImage, setCropImage] = React.useState<Blob>()

  const doChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files?.length) {
      setImage(files[0])
    }
  }

  const doSave = async () => {
    const imageEditor = imageEditorRef.current!
    const croppedImage = await imageEditor.getCroppedImage()
    if (croppedImage) {
      setCropImage(croppedImage)
    }
  }

  return (
    <div className="flex justify-center items-center gap-16 h-screen">
      {image ? (
        <ImageEditor
          ref={imageEditorRef}
          image={image}
          width={width}
          height={height}
          cropWidth={cropWidth}
          cropHeight={cropHeight}
          fitImageIntoCropArea={fitImageIntoCropArea}
          minScale={minScale}
          maxScale={maxScale}
          bgColor={bgColor}
        />
      ) : (
        <input type="file" accept="image/*" onChange={(e) => doChange(e)} />
      )}
      {cropImage && <img alt="cropped image" src={URL.createObjectURL(cropImage)} className="border-2" />}
      <button disabled={!image} onClick={doSave}>
        Crop!
      </button>
    </div>
  )
}
Example.storyName = 'ImageEditor'
