/**
 * useViewPackageGroup Composition API
 */

import { onMounted, reactive, ref, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { IAddonPackageWithType } from './use-create-package'
import PackageService from '/@src/api/package.service'
import {
  IPackageGroupInfo,
  IPackageInfo,
  IUpdateAddonPackage,
} from '/@src/types/interfaces/package.interface'

interface IAddonUpdate extends IAddonPackageWithType {
  packageGroupId?: number
}
interface UseViewPackageGroupState {
  isLoading: boolean
  packages: IPackageInfo[]
  addonPackages: IAddonUpdate[]
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
  const mainPackageId = ref<number>(+(route.params.packageid as string))

  const fetchAddonPackage = async () => {
    const { status, data } =
      await PackageService.getAddonPackageByMainPackageId(mainPackageId.value)
    if (status === 200) {
      state.addonPackages = await data.map((d) => {
        return {
          ...d,
          packageGroupId: d.id,
          packageId: d.addonPackageId,
          type: d.isMainPackage ? 'main' : 'addon',
        }
      })
    }
    console.log('fetchAddonPackage', mainPackageId.value, state.addonPackages)
  }

  const updatePackage = async (packages: IAddonUpdate[]) => {
    console.log('updatePackage', packages)
    const parsedPackages = packages.map((pk) => {
      const {
        packageGroupId,
        packageId,
        generateTicket,
        idx,
        dependonPackageId,
        dependonTicketUse,
      } = pk
      return {
        packageGroupId,
        packageId,
        generateTicket,
        idx,
        dependonPackageId,
        dependonTicketUse,
      }
    }) as IUpdateAddonPackage[]
    const { status } = await PackageService.updatePackageGroup({
      mainPackageId: mainPackageId.value,
      addonPackages: parsedPackages,
    })
    console.log(status)
  }

  const removeAddonPackage = async (packageGroupId: number) => {
    // const { status } =
    // await PackageService.deleteAddonPackageGroupById(
    //   packageGroupId
    // )
    console.log('removeAddonPackage', packageGroupId)
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
    removeAddonPackage,
  }
}
