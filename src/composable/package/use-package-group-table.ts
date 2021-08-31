/**
 * usePackageTable Composition API
 */

import { onMounted, reactive, toRefs } from 'vue'
import usePackageApi from '../api/usePackageApi'
import useNotyf from '../useNotyf'
import { errMessage } from '/@src/helpers/filter.helper'
import { IDatatableHeader } from '/@src/types/interfaces/component.interface'
import {
  IPackageGroupInfo,
  IPackageGroupTable,
} from '/@src/types/interfaces/package.interface'

interface UsePackageTableState {
  isLoading: boolean
  packages: IPackageGroupTable[]
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
    const data = await getAllPackagesGroup({ currentPage: 1, perPage: 10 })
    state.isLoading = false
    state.packages = data.data
  }
  const noty = useNotyf()

  const packageTableHeaders: IDatatableHeader[] = [
    { key: 'packageId', label: 'Main ID' },
    { key: 'packageName', label: 'Package Name' },
    { key: 'generateTicket', label: 'Generate Ticket? (Main)', isCenter: true },
    { key: 'subPackages', label: 'Sub Packages' },
    { key: 'type', label: 'Type', isCenter: true },
    { key: 'purchasable', label: 'Purchasable', isCenter: true },
    { key: 'price', label: 'Price', isCenter: true },
    { key: 'duration', label: 'Duration', isCenter: true },
  ]

  const viewAddonPackage = async (packageId: number) => {
    const data = await getAddonPackageByMainPackageId(packageId)
    if (data.length) {
      state.currentViewMainPackageId = packageId
      state.addonPackages = data
    }
  }

  const removePackageGroup = async (packageId: number) => {
    const { status, message } = await deletePackageGroupByMainPackageId(
      packageId
    )

    if (status === 200) {
      await fetchAllPackages()
    } else {
      noty.error(errMessage(message) || 'Fail !')
    }
  }

  onMounted(() => {
    fetchAllPackages()
  })

  return {
    ...toRefs(state),
    viewAddonPackage,
    removePackageGroup,
    packageTableHeaders,
  }
}
