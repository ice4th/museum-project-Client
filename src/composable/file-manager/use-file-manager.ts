import { computed, onMounted, reactive, toRefs } from 'vue'
import useNotyf from '../useNotyf'
import useFileManagerApi from '../api/useFileManagerApi'
import { IFile } from '/@src/types/interfaces/file-manager.interface'
import { errMessage } from '/@src/helpers/filter.helper'
import { checkResponseStatus } from '../api'
interface UseFileManagerState {
  validate: Object
  newFile: Array<IFile | string>
  files: IFile[]
  currentDirectory: string
  nextToken?: string
}
export default function useFileManager() {
  const state = reactive<UseFileManagerState>({
    validate: {},
    newFile: [],
    files: [],
    currentDirectory: '',
    nextToken: undefined,
  })
  const { createNewFolder, getFileListsWithPagination, uploadFile } =
    useFileManagerApi()
  const notyf = useNotyf()

  const fetchFileList = async (data: { search: string; next?: boolean }) => {
    const { search, next } = data
    const res = await getFileListsWithPagination({
      max: 20,
      prefix: search,
      continuationToken: next ? state.nextToken : undefined,
    })
    if (checkResponseStatus(res)) {
      if (next) {
        state.files.push(...res.data.subDirectories, ...res.data.files)
      } else {
        state.files = [...res.data.subDirectories, ...res.data.files]
      }
      state.currentDirectory = res.data.currentDirectory
      state.nextToken = res.data.nextContinuationToken
    } else {
      if (typeof res.message === 'object') state.validate = res.message
      else notyf.error(errMessage(res.message))
    }
  }

  const onClearNewFile = () => {
    state.newFile = []
  }

  const uploadFileItem = async (file: File) => {
    const res = await uploadFile({
      file,
      filePath: state.currentDirectory,
    })
    if (checkResponseStatus(res)) {
      notyf.success('Upload file is completed!')
      state.newFile = [res.data, ...state.newFile]
    } else {
      if (typeof res.message === 'object') state.validate = res.message
      else notyf.error(errMessage(res.message))
    }
    return res.data
  }

  const addFolder = async (folderName: string) => {
    const res = await createNewFolder({
      folderName,
    })
    if (checkResponseStatus(res)) {
      notyf.success('Add folder is completed!')
      state.newFile = [res.data, ...state.newFile]
    } else {
      if (typeof res.message === 'object') state.validate = res.message
      else notyf.error(errMessage(res.message))
    }
  }

  const fileList = computed(() => [...state.newFile, ...state.files])

  const directories = computed(() => {
    const directoryArray = state.currentDirectory?.match(/[^\/]+\/?|\//g) || []
    return directoryArray.reduce(
      (preDirect, curDirect, i) => {
        const label = `${curDirect[0].toLocaleUpperCase()}${curDirect.slice(1)}`
        preDirect.push({
          label:
            curDirect.length > 1 ? label.substring(0, label.length - 1) : label,
          key: preDirect[i].key + curDirect,
        })
        return preDirect
      },
      [
        {
          label: 'Home',
          key: '',
        },
      ]
    )
  })
  onMounted(async () => {
    await fetchFileList({ search: 'A_TEST/' })
  })
  return {
    ...toRefs(state),
    fetchFileList,
    uploadFile,
    addFolder,
    fileList,
    directories,
    uploadFileItem,
    onClearNewFile,
  }
}
