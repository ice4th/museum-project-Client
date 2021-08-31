import { computed, onMounted, reactive, toRefs } from 'vue'
import useNotyf from '../useNotyf'
import useFileManagerApi from '../api/useFileManagerApi'
import {
  IDirectoryNavigator,
  IFile,
} from '/@src/types/interfaces/file-manager.interface'
import { errMessage } from '/@src/helpers/filter.helper'
import { checkResponseStatus } from '../api'
import { IAddFolder } from '../../types/interfaces/file-manager.interface'
interface UseFileManagerState {
  validate: Object
  newFile: IFile[]
  files: IFile[]
  currentDirectory: string
  nextToken?: string
}
interface ISearchFileList {
  prefix: string
  search?: string
  next?: boolean
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

  const fetchFileList = async (data: ISearchFileList) => {
    const { prefix, search, next } = data
    const res = await getFileListsWithPagination({
      max: 20,
      prefix,
      search,
      continuationToken: next ? state.nextToken : undefined,
    })
    if (checkResponseStatus(res)) {
      /**
       * If  next is `true` that's mean the new files need to concat state.files
       * (but we cannot use concat function for reactive because state.files doesn't change(in that case I don't know why))
       */
      if (next) {
        state.files.push(...res.data.subDirectories, ...res.data.files)
      } else {
        //When fetching a new navigation
        state.files = [...res.data.subDirectories, ...res.data.files]
      }
      state.currentDirectory = res.data.currentDirectory
      state.nextToken = res.data.nextContinuationToken
    } else {
      if (typeof res.message === 'object') state.validate = res.message
      else notyf.error(errMessage(res.message))
    }
  }

  const uploadFileItem = async (file: File) => {
    const isLt20M = file.size < 20 * 1000 * 1024 //check file size is less than 20Mb
    if (!isLt20M) {
      notyf.error(
        'Your file was not uploaded because it exceeds the 20 MB size limit.'
      )
      return
    }
    const res = await uploadFile({
      file,
      filePath: state.currentDirectory,
    })
    if (checkResponseStatus(res)) {
      notyf.success('Your file was uploaded successfully!')
      state.newFile = [res.data, ...state.newFile]
    } else {
      if (typeof res.message === 'object') state.validate = res.message
      else notyf.error(errMessage(res.message))
    }
  }

  const addFolder = async (data: IAddFolder) => {
    const res = await createNewFolder({
      folderName: data.folderName,
      path: data.path,
    })
    if (checkResponseStatus(res)) {
      notyf.success('Adding folder has been completed!')
      state.newFile = [res.data, ...state.newFile]
    } else {
      if (typeof res.message === 'object') state.validate = res.message
      else notyf.error(errMessage(res.message))
    }
  }

  //fileList will show all of files, folders, and the new files that just created or uploaded
  const fileList = computed(() => [...state.newFile, ...state.files])

  //Use this when navigate change
  const clearNewFile = () => (state.newFile = [])

  /**
   * `directories` is depth of navigation or sub-directory. We know it from `currentDirectory` that indicate the current path
   * HOW: The systym will separate `currentDirectory` with the end of `/` (blackslash)
   */
  const directories = computed(() => {
    // directoryArray will be => ['Assessment/', 'submit/', '2019-12-11/']
    const directoryArray = state.currentDirectory?.match(/[^\/]+\/?|\//g) || []
    return directoryArray.reduce(
      (preDirect, curDirect, i) => {
        //Label is the name that show on breadcrumb
        const label = `${curDirect[0].toLocaleUpperCase()}${curDirect.slice(1)}`
        preDirect.push({
          label:
            curDirect.length > 1 ? label.substring(0, label.length - 1) : label,
          key: preDirect[i].key + curDirect, //Key is depth of navigation ex => 'Assessment/submit/'
        })
        return preDirect
      }, // The initial directory is Home, the key is empty string
      [
        {
          label: 'Home',
          key: '',
        },
      ]
    ) as Array<IDirectoryNavigator>
  })
  onMounted(() => {
    fetchFileList({ prefix: '' }) // -> search from root with empty string
  })
  return {
    ...toRefs(state),
    fetchFileList,
    uploadFile,
    addFolder,
    fileList,
    directories,
    uploadFileItem,
    clearNewFile,
  }
}
