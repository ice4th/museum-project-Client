export const thumbnailFileIcon = (type: string) => {
  return type?.match('audio')
    ? '/images/icons/files/music.png'
    : type?.match('video')
    ? '/images/icons/files/video.svg'
    : type?.match('pdf')
    ? '/images/icons/files/pdf.svg'
    : type?.match('sheet')
    ? '/images/icons/misc/documentation.svg'
    : type?.match('folder')
    ? '/images/icons/files/folder.png'
    : type?.match('ppt')
    ? '/images/icons/files/ppt.svg'
    : type?.match('doc')
    ? '/images/icons/files/doc-2.svg'
    : '/images/icons/files/doc.svg'
}
