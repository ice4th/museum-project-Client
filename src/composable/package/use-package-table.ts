/**
 * usePackageTable Composition API
 */

import { computed, onMounted, reactive, toRefs } from 'vue'
import PackageService from '/@src/api/package.service'
import { IPackageInfo } from '/@src/types/interfaces/package.interface'

interface UsePackageTableState {
  isLoading: boolean
  packages: IPackageInfo[]
}
export default function usePackageTable() {
  const state = reactive<UsePackageTableState>({
    isLoading: false,
    packages: [],
  })
  const fetchAllPackages = async () => {
    state.isLoading = true
    const { status, data } = await PackageService.getAllPackages()
    state.isLoading = false
    if (status === 200 && data) {
      state.packages = data
    }
  }

  const packageTableFormat = computed(() => {
    //heading  ['id', 'Name', 'Type', 'Purchasable', 'Price', 'Duration']
    return state.packages.map((pk) => [
      pk.id,
      pk.packageName,
      pk.type,
      pk.purchasable,
      pk.price,
      pk.duration,
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

  onMounted(() => {
    fetchAllPackages()
  })

  return { ...toRefs(state), packageTableFormat, optionsTable }
}
