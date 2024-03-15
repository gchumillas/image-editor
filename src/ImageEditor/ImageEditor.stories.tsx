import React from 'react'
import Slider from '@mui/material/Slider'
import styles from './ImageEditor.stories.module.css'
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

  const doSave = async () => {
    const imageEditor = imageEditorRef.current!
    const croppedImage = await imageEditor.getCroppedImage()
    if (croppedImage) {
      setCropImage(croppedImage)
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <ImageEditor
          ref={imageEditorRef}
          width={width}
          height={height}
          cropWidth={cropWidth}
          cropHeight={cropHeight}
          scale={scale / 100}
          bgColor={bgColor}
        >
          <input type="file" accept="image/*" onChange={(e) => doChange(e)} />
        </ImageEditor>
        <Slider min={50} max={150} value={scale} onChange={(_, size) => doScaleChange(size as number)} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input type="file" accept="image/*" onChange={(e) => doChange(e)} />
        <button onClick={doSave}>Crop!</button>
      </div>
      {cropImage && <img alt="cropped image" src={URL.createObjectURL(cropImage)} />}
    </div>
  )
}
Example.storyName = 'ImageEditor'
