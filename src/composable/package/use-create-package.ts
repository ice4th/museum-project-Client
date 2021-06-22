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
export interface IUseCreatePackageState {
  mainIdx: string
  mainPackage?: number
  generateTicket: GenerateTicket // 0 | 1
  packages: IPackageInfo[]
  dependOnPackageList: IPackageInfo[]
  mainSelectedPackage?: ICreateAddonPackage
  addonPackages: ICreateAddonPackage[]
}
/**
 * Generate refs to handle a dropdown state
 */
export default function useCreatePackage() {
  const showAddonSection = ref<boolean>(false)
  const showMainPackageSection = ref<boolean>(true)
  const state = reactive<IUseCreatePackageState>({
    mainIdx: '1',
    mainPackage: undefined,
    generateTicket: GenerateTicket.NOT_GENERATE_TICKET,
    packages: [],
    dependOnPackageList: [],
    mainSelectedPackage: undefined,
    addonPackages: [],
  })

  const displayPackageNameById = (id: number) => {
    return state.packages.find((pk) => pk.id === id)?.packageName
  }

  const displayPackageImageById = (id: number) => {
    return state.packages.find((pk) => pk.id === id)?.photo
  }

  const fetchAllPackage = async () => {
    const { status, data } = await PackageService.getAllPackages()
    if (status === 200 && data) {
      state.packages = data
    }
  }

  const addGroupPackage = (id: number, newPackage: ICreateAddonPackage) => {
    const index = state.addonPackages.findIndex(
      ({ packageId }: ICreateAddonPackage) => packageId === id
    )
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

  const updateMainPackage = () => {
    console.log('updateMainPackage', state.mainPackage, state.generateTicket)
    if (!state.mainPackage) return
    state.mainSelectedPackage = {
      packageId: state.mainPackage,
      generateTicket: state.generateTicket,
      idx: +state.mainIdx,
    }
    addGroupPackage(state.mainPackage, state.mainSelectedPackage)
  }

  const addAddonPackage = (addon: ICreateAddonPackage) => {
    console.log('addAddonPackage', addon)
    addGroupPackage(addon.packageId, addon)
  }

  const toggleShowAddonPackageSection = () => {
    showAddonSection.value = !showAddonSection.value
  }
  const toggleShowMainPackageSection = () => {
    showMainPackageSection.value = !showMainPackageSection.value
  }

  const createPackageGroup = async () => {
    if (!state.mainPackage) return
    const res = await PackageService.createPackageGroup({
      mainPackageId: state.mainPackage,
      addonPackages: state.addonPackages,
    })
    console.log(res)
  }
  watch(() => [state.mainPackage, state.generateTicket], updateMainPackage)
  onMounted(() => {
    fetchAllPackage()
  })

  return {
    ...toRefs(state),
    showAddonSection,
    showMainPackageSection,
    updateMainPackage,
    addAddonPackage,
    displayPackageNameById,
    displayPackageImageById,
    toggleShowAddonPackageSection,
    toggleShowMainPackageSection,
    createPackageGroup,
  }
}
