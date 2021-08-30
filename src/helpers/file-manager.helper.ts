export const thumbnailFileIcon = (type: string) => {
  return type?.match('audio')
    ? '/images/icons/files/music.svg'
    : type?.match('video')
    ? '/images/icons/files/video.svg'
    : type?.match('pdf')
    ? '/images/icons/files/pdf.svg'
    : type?.match('doc')
    ? '/images/icons/files/doc-2.svg'
    : type?.match('folder')
    ? '/images/icons/files/folder.svg'
    : '/images/icons/files/doc.svg'
}
