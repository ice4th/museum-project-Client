import useClipboard from 'vue-clipboard3'
import useNotyf from '../useNotyf'
import useFileManagerApi from '../api/useFileManagerApi'
export default function useFileAction() {
  const { getDownloadItem, createNewFolder } = useFileManagerApi()
  const { toClipboard } = useClipboard()
  const notyf = useNotyf()

  const downloadItem = async (data: { url: string; name: string }) => {
    const { url, name } = data
    const response = await getDownloadItem(url)
    const blob = new Blob([response.data], { type: response.data.type })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = name
    link.click()
    URL.revokeObjectURL(link.href)
    console.log('blob:', blob)
  }

  const copyUrlClipboard = async (text: string) => {
    try {
      await toClipboard(text)
      console.log('Copied to clipboard', text)
      notyf.success('Copied to clipboard')
    } catch (e) {
      console.error(e)
      notyf.error(e)
    }
  }
  return { downloadItem, copyUrlClipboard }
}
