export type ImageEditorType = {
  getCroppedImage: () => Promise<Blob | null>
}

export type ImageEditorProps = {
  image: Blob
  width: number
  height: number
  cropWidth: number
  cropHeight: number
  fitImageIntoCropArea?: boolean
  minScale?: number
  maxScale?: number
  bgColor?: string
}
