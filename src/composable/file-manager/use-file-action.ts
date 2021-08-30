import useClipboard from 'vue-clipboard3'
import useNotyf from '../useNotyf'
import useFileManagerApi from '../api/useFileManagerApi'
export default function useFileAction() {
  const { getDownloadItem } = useFileManagerApi()
  const { toClipboard } = useClipboard()
  const notyf = useNotyf()

  const downloadItem = async (data: { url: string; name: string }) => {
    const { url, name } = data
    try {
      const response = await getDownloadItem(url)
      const blob = new Blob([response.data], { type: response.data.type })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = name
      link.click()
      URL.revokeObjectURL(link.href)
    } catch {
      notyf.error('Cannot download this file')
    }
  }

  const copyUrlClipboard = async (text: string) => {
    try {
      await toClipboard(text)
      notyf.success('Copied to clipboard')
    } catch (e) {
      notyf.error(e)
    }
  }
  return { downloadItem, copyUrlClipboard }
}
