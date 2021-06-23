/**
 * useCreatePackage Composition API
 */

import { onMounted, reactive, ref, toRefs, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import PackageService from '/@src/api/package.service'
import {
  ICreateAddonPackage,
  IPackageInfo,
} from '/@src/types/interfaces/package.interface'
import { GenerateTicket } from '/@src/types/enums/package.enum'
import { Notyf } from 'notyf'
import { themeColors } from '/@src/utils/themeColors'

interface IAddonPackageWithType extends ICreateAddonPackage {
  type: 'main' | 'addon'
}
export interface IUseCreatePackageState {
  mainIdx: string
  mainPackage?: number
  generateTicket: GenerateTicket // 0 | 1
  isLoadingPackages: boolean
  packages: IPackageInfo[]
  dependOnPackageList: IPackageInfo[]
  mainSelectedPackage?: IAddonPackageWithType
  addonPackages: IAddonPackageWithType[]
  currentAddonPackage?: IAddonPackageWithType
}
/**
 * Generate refs to handle a dropdown state
 */

const notyfWarning = new Notyf({
  duration: 2000,
  position: {
    x: 'center',
    y: 'top',
  },
  types: [
    {
      type: 'warning',
      background: themeColors.orange,
      icon: {
        className: 'fas fa-check',
        tagName: 'i',
        text: '',
      },
    },
  ],
})
const notyfSuccess = new Notyf({
  duration: 2000,
  position: {
    x: 'center',
    y: 'top',
  },
  types: [
    {
      type: 'success',
      background: themeColors.green,
      icon: {
        className: 'fas fa-check',
        tagName: 'i',
        text: '',
      },
    },
  ],
})
export default function useCreatePackage() {
  const showAddonSection = ref<boolean>(false)
  const showMainPackageSection = ref<boolean>(true)
  const state = reactive<IUseCreatePackageState>({
    mainIdx: '1',
    mainPackage: undefined,
    generateTicket: GenerateTicket.NOT_GENERATE_TICKET,
    isLoadingPackages: false,
    packages: [],
    dependOnPackageList: [],
    mainSelectedPackage: undefined,
    addonPackages: [],
    currentAddonPackage: undefined,
  })

  const displayPackageNameById = (id: number) => {
    return state.packages.find((pk) => pk.id === id)?.packageName
  }

  const displayPackageImageById = (id: number) => {
    return state.packages.find((pk) => pk.id === id)?.photo
  }

  const fetchAllPackage = async () => {
    state.isLoadingPackages = true
    const { status, data } = await PackageService.getAllPackages()
    state.isLoadingPackages = false
    if (status === 200 && data) {
      state.packages = data
    }
  }

  const addGroupPackage = (
    idx: number,
    newPackage: IAddonPackageWithType,
    type?: 'main' | 'addon'
  ) => {
    if (type === 'main') {
      state.addonPackages = state.addonPackages.filter(
        (pk) => pk.type !== 'main'
      )
    }
    const mainPackageIdx = state.addonPackages.find((pk) => pk.type === 'main')
      ?.idx
    if (mainPackageIdx === idx && type !== 'main') {
      notyfWarning.open({
        type: 'warning',
        message: 'idx duplicate main package',
      })
      return
    }
    const index = state.addonPackages.findIndex((pk) => pk.idx === idx)
    if (index >= 0) state.addonPackages[index] = newPackage
    else state.addonPackages.push(newPackage)
    state.addonPackages.sort(
      (a: ICreateAddonPackage, b: ICreateAddonPackage) => a.idx - b.idx
    )
    state.dependOnPackageList = state.packages.filter((pk) =>
      state.addonPackages.some((apk) => apk.packageId === pk.id)
    )
    showAddonSection.value = false
    showMainPackageSection.value = false
  }

  const addMainPackage = () => {
    if (
      state.addonPackages.some(
        (pk) => pk.idx === +state.mainIdx && pk.type !== 'main'
      )
    ) {
      notyfWarning.open({
        type: 'warning',
        message: 'idx must be uniq',
      })
      return
    }
    if (!state.mainPackage) return
    state.mainSelectedPackage = {
      packageId: state.mainPackage,
      generateTicket: state.generateTicket,
      idx: +state.mainIdx,
      type: 'main',
    }
    addGroupPackage(+state.mainIdx, state.mainSelectedPackage, 'main')
  }

  const addAddonPackage = (addon: ICreateAddonPackage) => {
    console.log('addAddonPackage', addon)
    addGroupPackage(+addon.idx, { ...addon, type: 'addon' }, 'addon')
  }

  const toggleShowAddonPackageSection = (addon?: IAddonPackageWithType) => {
    state.currentAddonPackage = addon
    showAddonSection.value = !showAddonSection.value
  }
  const toggleShowMainPackageSection = () => {
    showMainPackageSection.value = !showMainPackageSection.value
  }

  const removePackage = (idx: number) => {
    state.addonPackages = state.addonPackages.filter((pk) => pk.idx !== idx)
  }

  const createPackageGroup = async () => {
    if (!state.mainPackage) return
    const { status, message } = await PackageService.createPackageGroup({
      mainPackageId: state.mainPackage,
      addonPackages: state.addonPackages,
    })
    if (status === 201) {
      notyfSuccess.open({
        type: 'success',
        message: 'Created Success!',
      })
      return
    }
    notyfWarning.open({
      type: 'error',
      message,
    })
  }
  // watch(() => [state.mainPackage, state.generateTicket], updateMainPackage)
  onMounted(() => {
    fetchAllPackage()
  })

  return {
    ...toRefs(state),
    showAddonSection,
    showMainPackageSection,
    addMainPackage,
    addAddonPackage,
    displayPackageNameById,
    displayPackageImageById,
    toggleShowAddonPackageSection,
    toggleShowMainPackageSection,
    createPackageGroup,
    removePackage,
  }
}
