/**
 * useViewPackageGroup Composition API
 */

import { onMounted, reactive, ref, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import useNotyf from '../useNotyf'
import { IAddonPackageWithType } from './use-create-package'
import PackageService from '/@src/api/package.service'
import router from '/@src/router'
import {
  IPackageGroupInfo,
  IPackageInfo,
  IUpdateAddonPackage,
} from '/@src/types/interfaces/package.interface'
interface UseViewPackageGroupState {
  isLoading: boolean
  packages: IPackageInfo[]
  addonPackages: IUpdateAddonPackage[]
  mainPackage?: IUpdateAddonPackage
}
export default function useViewPackageGroup() {
  const state = reactive<UseViewPackageGroupState>({
    isLoading: false,
    packages: [],
    addonPackages: [],
    mainPackage: undefined,
  })

  const route = useRoute()
  const notyf = useNotyf()
  const mainPackageId = ref<number>(+(route.params.packageid as string))

  const fetchAddonPackage = async () => {
    const { status, data } =
      await PackageService.getAddonPackageByMainPackageId(mainPackageId.value)
    if (status === 200) {
      const findMainPackage = data.find((pk) => pk.isMainPackage)
      state.mainPackage = {
        ...findMainPackage,
        packageGroupId: findMainPackage?.id,
        packageId: findMainPackage?.addonPackageId,
      } as IUpdateAddonPackage
      state.addonPackages = await data.map((d) => {
        return {
          ...d,
          packageGroupId: d.id,
          packageId: d.addonPackageId,
        }
      })
    } else {
      router.push(`/404${route.fullPath}`)
    }
  }

  const removeAddonPackage = async (packageGroupId: number) => {
    const { status, message } =
      await PackageService.deleteAddonPackageGroupById(packageGroupId)
    if (status === 200) {
      await fetchAddonPackage()
      notyf.success('Remove Success!!')
    } else {
      notyf.error(message || 'Fail! Please try again.')
    }
  }

  const updatePackage = async (
    packages: IUpdateAddonPackage[],
    mainId?: number
  ) => {
    console.log('updatePackage', packages)
    await Promise.all(
      state.addonPackages.map(async (apk) => {
        if (
          !packages.some((pk) => apk.packageId === pk.packageId) &&
          apk.packageId !== mainPackageId.value
        ) {
          console.log('remove', apk.packageId)
          if (!apk.packageGroupId) return
          await removeAddonPackage(apk.packageGroupId)
        }
      })
    )
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
      mainPackageId: mainId || mainPackageId.value,
      addonPackages: parsedPackages,
    })
    if (status === 200) {
      if (mainId === mainPackageId.value) {
        router.go(0)
        return
      }
      router.push({
        name: 'product-package-group-:packageid',
        params: { packageid: `${mainId || mainPackageId.value}` },
      })
    }
    console.log(status)
  }

  onMounted(async () => {
    state.isLoading = true
    await fetchAddonPackage()
    state.isLoading = false
  })

  return {
    ...toRefs(state),
    fetchAddonPackage,
    updatePackage,
    removeAddonPackage,
  }
}
