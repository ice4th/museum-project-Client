/**
 * useViewPackageGroup Composition API
 */

import { computed, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import PackageService from '/@src/api/package.service'
import {
  IPackageGroupInfo,
  IPackageInfo,
} from '/@src/types/interfaces/package.interface'

interface UseViewPackageGroupState {
  isLoading: boolean
  packages: IPackageInfo[]
  addonPackages: IPackageGroupInfo[]
}
export default function useViewPackageGroup() {
  const state = reactive<UseViewPackageGroupState>({
    isLoading: false,
    packages: [],
    addonPackages: [],
  })
  const fetchAllPackages = async () => {
    const { status, data } = await PackageService.getAllPackages()
    if (status === 200 && data) {
      state.packages = data
    }
  }

  const route = useRoute()

  const displayPackageNameById = (id: number) => {
    return state.packages.find((pk) => pk.id === id)?.packageName
  }
  const fetchAddonPackage = async () => {
    console.log('fetchAddonPackage', route.params.packageid)
    const packageId = route.params.packageid as string
    const { status, data } =
      await PackageService.getAddonPackageByMainPackageId(+packageId)
    if (status === 200) {
      state.addonPackages = data
    }
  }

  const updatePackage = async () => {
    console.log('updatePackage')
  }

  onMounted(async () => {
    state.isLoading = true
    await Promise.all([fetchAllPackages(), fetchAddonPackage()])
    state.isLoading = false
  })

  return {
    ...toRefs(state),
    fetchAddonPackage,
    updatePackage,
    displayPackageNameById,
  }
}
