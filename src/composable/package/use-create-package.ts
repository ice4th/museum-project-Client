/**
 * useCreatePackage Composition API
 */

import { onMounted, reactive, ref, toRefs, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import PackageService from '/@src/api/package.service'
import { IPackage } from '/@src/types/interfaces/package.interface'
export interface IUseCreatePackageState {
  mainPackage?: IPackage
  generateTicket: number // 0 | 1
  addonPackage?: IPackage
  packages: object[]
}
/**
 * Generate refs to handle a dropdown state
 */
export default function useCreatePackage() {
  const state = reactive<IUseCreatePackageState>({
    mainPackage: undefined,
    addonPackage: undefined,
    generateTicket: 0,
    packages: [],
  })
  const isOpen = ref(false)
  const dropdownElement = ref<HTMLElement | null>(null)

  const fetchAllPackage = async () => {
    const { status, data } = await PackageService.getAllPackages()
    if (status === 200 && data) {
      state.packages = data
    }
  }
  onClickOutside(dropdownElement, () => {
    isOpen.value = false
  })

  const open = () => {
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  onMounted(() => {
    fetchAllPackage()
  })

  return {
    ...toRefs(state),
    dropdownElement,
    isOpen,
    open,
    close,
    toggle,
  }
}
