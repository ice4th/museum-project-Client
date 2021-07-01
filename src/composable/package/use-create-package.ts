/**
 * useCreatePackage Composition API
 */

import { onMounted, reactive, ref, toRefs } from 'vue'
import PackageService from '/@src/api/package.service'
import {
  ICreateAddonPackage,
  IPackageInfo,
} from '/@src/types/interfaces/package.interface'
import { GenerateTicket } from '/@src/types/enums/package.enum'
import { Notyf } from 'notyf'
import { themeColors } from '/@src/utils/themeColors'

/**
 * add type for render with type
 */
interface IAddonPackageWithType extends ICreateAddonPackage {
  type: 'main' | 'addon'
}
export interface IUseCreatePackageState {
  mainIdx: string
  mainPackage?: number
  generateTicket: GenerateTicket
  isLoadingPackages: boolean
  packages: IPackageInfo[]
  dependOnPackageList: IPackageInfo[]
  mainSelectedPackage?: IAddonPackageWithType
  addonPackages: IAddonPackageWithType[]
  currentAddonPackage?: IAddonPackageWithType
}

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

  const addGroupPackage = (newPackage: IAddonPackageWithType) => {
    const packageIndex = state.addonPackages.findIndex(
      (pk) => pk.packageId === newPackage.packageId
    )
    const isMyPackage = state.addonPackages.some(
      (pk, index) =>
        pk.packageId === newPackage.packageId && packageIndex === index
    )
    console.log(isMyPackage, packageIndex)
    /**
     * @info have packageId in list
     */
    if (packageIndex >= 0) {
      if (newPackage.type === 'main') {
        /**
         * @info remove addon package is same main package
         */
        state.addonPackages = state.addonPackages.filter(
          (pk) => pk.packageId !== newPackage.packageId
        )
        const mainIdx = state.addonPackages.findIndex(
          (pk) => pk.type === 'main'
        )
        if (mainIdx >= 0) state.addonPackages[mainIdx] = newPackage
        else state.addonPackages.push(newPackage)
      } else {
        notyfWarning.open({
          type: 'warning',
          message: 'package id is duplicate',
        })
        return
      }
    } else {
      state.addonPackages.push(newPackage)
    }
    state.addonPackages = state.addonPackages.map((pk, index) => {
      return { ...pk, idx: index + 1 }
    })
    state.dependOnPackageList = state.packages.filter((pk) =>
      state.addonPackages.some((apk) => apk.packageId === pk.id)
    )
    showAddonSection.value = false
    showMainPackageSection.value = false
  }

  const addMainPackage = () => {
    if (!state.mainPackage) return
    state.mainSelectedPackage = {
      packageId: state.mainPackage,
      generateTicket: state.generateTicket,
      idx: state.addonPackages.length + 1,
      type: 'main',
    }
    addGroupPackage(state.mainSelectedPackage)
  }

  const addAddonPackage = (addon: ICreateAddonPackage) => {
    addGroupPackage({
      ...addon,
      idx: +addon.idx || state.addonPackages.length + 1,
      type: 'addon',
    })
  }

  const toggleShowAddonPackageSection = (addon?: IAddonPackageWithType) => {
    state.currentAddonPackage = addon
    showAddonSection.value = !showAddonSection.value
  }
  const toggleShowMainPackageSection = () => {
    showMainPackageSection.value = !showMainPackageSection.value
  }

  const removePackage = (idx: number) => {
    state.addonPackages = state.addonPackages
      .filter((pk) => pk.idx !== idx)
      .map((pk, index) => {
        return { ...pk, idx: index + 1 }
      })
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
