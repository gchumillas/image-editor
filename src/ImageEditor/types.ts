export type ImageEditorType = {
  loadImageFromFile: (file: Blob) => Promise<void>
  getCroppedImage: () => Promise<Blob | null>
}

export type ImageEditorProps = {
  width: number
  height: number
  cropWidth: number
  cropHeight: number
  minScale?: number
  maxScale?: number
  bgColor?: string
  className?: string
}
