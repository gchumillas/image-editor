export type ImageEditorType = {
  image?: ImageBitmap
  loadImageFromFile: (file: Blob) => Promise<void>
  getCroppedImage: () => Promise<Blob | null>
}

export type ImageEditorProps = {
  width: number
  height: number
  cropWidth: number
  cropHeight: number
  scale?: number
  bgColor?: string
  className?: string
  children?: React.ReactNode
}
