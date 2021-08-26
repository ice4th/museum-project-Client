import { onMounted, reactive, toRefs } from 'vue'
import useNotyf from '../useNotyf'
import useFileManagerApi from '../api/useFileManagerApi'
import { IFileList } from '/@src/types/interfaces/file-manager.interface'
import { errMessage } from '/@src/helpers/filter.helper'
import { checkResponseStatus } from '../api'

interface UseFileManagerState {
  validate: Object
  fileList?: IFileList
}
export default function useFileManager() {
  const state = reactive<UseFileManagerState>({
    validate: {},
    fileList: undefined,
  })
  const { createNewFolder } = useFileManagerApi()
  const notyf = useNotyf()
  const directoryLists = {
    baseUrl: 'https://d1627oxh4wmxfp.cloudfront.net',
    currentDirectory: 'assessment/submit',
    files: [
      {
        name: 'p1q1.mp3',
        src: 'https://d1627oxh4wmxfp.cloudfront.net/assessment/get-started/p1q1.mp3',
        lastModified: '2021-05-20T11:13:14.000Z',
        size: '14 KB',
        type: 'audio/mp3',
      },
      {
        name: 'business_g1.1.m4a',
        src: 'https://d1627oxh4wmxfp.cloudfront.net/assessment/Assessment Post-Test /Posttest Business G1 /business_g1.1.m4a',
        lastModified: '2021-05-20T11:13:14.000Z',
        size: '14 KB',
        type: 'audio/mp3',
      },
      {
        name: 'muban_kunalai_soi_20-3.m4a',
        src: 'https://d1627oxh4wmxfp.cloudfront.net/assessment/muban_kunalai_soi_20-3.m4a',
        lastModified: '2021-08-24T06:04:32.000Z',
        size: '258.44 KB',
        type: 'audio/m4a',
      },
      {
        name: 'Test 004.jpg',
        src: 'https://www.themoviedb.org/t/p/w220_and_h330_face/jTswp6KyDYKtvC52GbHagrZbGvD.jpg',
        lastModified: '2021-05-20T11:13:14.000Z',
        size: '258.44 KB',
        type: 'image/jpg',
      },
      {
        name: 'book.png',
        src: 'https://d1627oxh4wmxfp.cloudfront.net/A_TEST/book.png',
        lastModified: '2021-08-23T09:33:25.000Z',
        size: '31 KB',
        type: 'image/png',
      },
      {
        name: '_english_for_beginners_(32_lessons).pdf',
        src: 'https://d1627oxh4wmxfp.cloudfront.net/B2B/_english_for_beginners_(32_lessons).pdf',
        lastModified: '2021-05-20T11:13:14.000Z',
        size: '11 MB',
        type: 'application/pdf',
      },
      {
        name: 'get-directory.json',
        src: 'https://d1627oxh4wmxfp.cloudfront.net/A_TEST/get-directory.json',
        lastModified: '2021-08-24T06:04:13.000Z',
        size: '970 Bytes',
        type: 'application/json',
      },
      {
        name: 'IMG_6589.MOV',
        src: 'https://d1627oxh4wmxfp.cloudfront.net/A_TEST/IMG_6589.MOV',
        lastModified: '2021-08-24T07:56:02.000Z',
        size: '8 MB',
        type: 'video/quicktime',
      },
      {
        name: 'ElephantsDream.mp4',
        src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        lastModified: '2021-08-21T07:56:02.000Z',
        size: '15 MB',
        type: 'video/mp4',
      },
      {
        name: '000000000000000000222222222222.png',
        src: 'https://d1627oxh4wmxfp.cloudfront.net/000000000000000000222222222222.png',
        lastModified: '2021-08-21T07:56:02.000Z',
        size: '2 MB',
        type: 'image/png',
      },
      {
        name: 'image.png',
        src: 'https://d1627oxh4wmxfp.cloudfront.net/A_TEST/image.png',
        lastModified: '2021-08-21T07:56:02.000Z',
        size: '2 MB',
        type: 'image/png',
      },
      {
        name: 'Iphone_Aug2.png',
        src: 'https://d1627oxh4wmxfp.cloudfront.net/A_TEST/Iphone_Aug2.png',
        lastModified: '2021-08-21T07:56:02.000Z',
        size: '2 MB',
        type: 'image/png',
      },
    ],
    subDirectories: [
      '18q3/',
      'Assessment Mid-test /',
      'Assessment Post-Test /',
      'LA_ETW/',
      'Photo Pre-Test/',
      'WWC_AYC/',
      'freetalk/',
      'get-started/',
      'submit/',
    ],
    total: 10,
    nextContinuationToken:
      '1hzRwQoSeRSqf7Ej/5RTwZap0oDxHPNy4dg6gvtAGJR4549rVSrSSRaFP1zz6v/dJ',
  }
  const fetchFileList = async (value?: IFileList) => {
    state.fileList = value || directoryLists
  }

  const uploadFile = async (file: File) => {
    const newFile = {
      name: file.name,
      src: 'https://d1627oxh4wmxfp.cloudfront.net/assessment/get-started/p1q1.mp3',
      lastModified: file.lastModified,
      size: file.size,
      type: file.type,
    }
    return newFile
  }

  const addFolder = async (payload: { folderName: string }) => {
    const res = await createNewFolder(payload)
    if (checkResponseStatus(res)) {
      notyf.success('Add folder is completed!')
      return status
    }
    if (typeof res.message === 'object') state.validate = res.message
    else notyf.error(errMessage(res.message))
  }

  onMounted(() => {
    fetchFileList()
  })
  return { ...toRefs(state), fetchFileList, uploadFile, addFolder }
}
