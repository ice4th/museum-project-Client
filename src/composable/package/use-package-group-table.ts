/**
 * usePackageTable Composition API
 */

import { computed, onMounted, reactive, toRefs } from 'vue'
import usePackageApi from '../api/usePackageApi'
import useNotyf from '../useNotyf'
import { IPackageGroupInfo } from '/@src/types/interfaces/package.interface'

interface UsePackageTableState {
  isLoading: boolean
  packages: IPackageGroupInfo[]
  currentViewMainPackageId: number
  addonPackages: IPackageGroupInfo[]
}
export default function usePackageGroupTable() {
  const state = reactive<UsePackageTableState>({
    isLoading: false,
    packages: [],
    currentViewMainPackageId: 0,
    addonPackages: [],
  })
  const {
    getAllPackagesGroup,
    getAddonPackageByMainPackageId,
    deletePackageGroupByMainPackageId,
  } = usePackageApi()
  const fetchAllPackages = async () => {
    state.isLoading = true
    const data = await getAllPackagesGroup()
    state.isLoading = false
    state.packages = data
  }
  const noty = useNotyf()

  const packageTableHeaders = [
    { key: 'packageId', label: 'Package ID' },
    { key: 'packageInfo.packageName', label: 'Package Name' },
    { key: 'packageInfo.type', label: 'Type' },
    { key: 'packageInfo.purchasable', label: 'Purchasable' },
    { key: 'packageInfo.price', label: 'Price' },
    { key: 'packageInfo.duration', label: 'Duration' },
  ]

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
    const data = await getAddonPackageByMainPackageId(packageId)
    if (data.length) {
      state.currentViewMainPackageId = packageId
      state.addonPackages = data
    }
  }

  const removePackageGroup = async (packageId: number) => {
    const { status } = await deletePackageGroupByMainPackageId(packageId)

    if (status === 200) {
      await fetchAllPackages()
    } else {
      // TODO: handle error
      // noty.error(message || 'Fail !')
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
    removePackageGroup,
    packageTableHeaders,
  }
}
