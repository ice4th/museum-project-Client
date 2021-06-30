/**
 * usePackageTable Composition API
 */

import { computed, onMounted, reactive, toRefs } from 'vue'
import PackageService from '/@src/api/package.service'
import {
  IPackageGroupInfo,
  IPackageInfo,
} from '/@src/types/interfaces/package.interface'

interface UsePackageTableState {
  isLoading: boolean
  packages: IPackageGroupInfo[]
}
export default function usePackageTable() {
  const state = reactive<UsePackageTableState>({
    isLoading: false,
    packages: [],
  })
  const fetchAllPackages = async () => {
    state.isLoading = true
    const { status, data } = await PackageService.getAllPackagesGroup()
    state.isLoading = false
    if (status === 200 && data) {
      state.packages = data
    }
  }

  const packageTableFormat = computed(() => {
    //heading  ['id', 'Name', 'Type', 'Purchasable', 'Price', 'Duration']
    return state.packages.map((pk) => [
      pk.packageId,
      pk.packageInfo.packageName,
      pk.packageInfo.type,
      pk.packageInfo.purchasable,
      pk.packageInfo.price,
      pk.packageInfo.duration,
    ])
  })
  const optionsTable = computed(() => {
    return {
      // searchable: true,
      // sortable: true,
      // perPageSelect: true,
      data: {
        headings: ['id', 'Name', 'Type', 'Purchasable', 'Price', 'Duration'],
        data: packageTableFormat.value,
      },
    }
  })

  const viewAddonPackage = async (packageId: number) => {
    console.log('viewAddonPackage', packageId)
    const {
      status,
      data,
    } = await PackageService.getAddonPackageByMainPackageId(packageId)
    if (status === 200) {
      console.log(data)
    }
  }

  onMounted(() => {
    fetchAllPackages()
  })

  return {
    ...toRefs(state),
    packageTableFormat,
    optionsTable,
    viewAddonPackage,
  }
}
