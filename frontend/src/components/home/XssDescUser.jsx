function ImageDescription({ description }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: description
      }}
    />
  )
}

export default ImageDescription