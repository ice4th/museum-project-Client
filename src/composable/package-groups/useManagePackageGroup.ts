/**
 * useCreatePackage Composition API
 */

import { computed, reactive, toRefs } from 'vue'
import {
  ICreateAddonPackage,
  IPackageGroupInfo,
  IUpdateAddonPackage,
} from '/@src/types/interfaces/package.interface'
import { useRoute, useRouter } from 'vue-router'
import usePackageApi, { DeleteAddonPackageParams } from '../api/usePackageApi'
import { errMessage } from '/@src/helpers/filter.helper'
import useNotyf from '../useNotyf'

/**
 * add type for render with type
 */
export interface IAddonPackageWithType extends ICreateAddonPackage {
  type: 'main' | 'addon'
}
export interface IUseCreatePackageState {
  packageGroupInfo: IPackageGroupInfo[]
}
export default function useManagePackageGroup() {
  const state = reactive<IUseCreatePackageState>({
    packageGroupInfo: [],
  })
  const notyf = useNotyf()
  const route = useRoute()
  const router = useRouter()

  const isEditPage = computed(() => route.hash === '#edit')
  const {
    createPackageGroup: createPackageGroupApi,
    updatePackageGroup,
    getAddonPackageByMainPackageId,
    deleteAddonPackageGroupById,
  } = usePackageApi()

  const createPackageGroup = async (packageGroup: {
    mainPackage: IUpdateAddonPackage
    addonPackages: IUpdateAddonPackage[]
  }) => {
    console.log('createPackageGroup', packageGroup)
    const { status, message } = await createPackageGroupApi({
      mainPackageId: packageGroup.mainPackage.packageId,
      addonPackages: packageGroup.addonPackages,
    })
    if (status === 201) {
      notyf.success('Created Success!')
      router.push({
        name: 'products-packages-groups-:packageid',
        params: { packageid: `${packageGroup.mainPackage.packageId}` },
      })
      return
    }
    notyf.error(errMessage(message))
  }

  const fetchPackageInfo = async (id: number) => {
    const res = await getAddonPackageByMainPackageId(id)
    state.packageGroupInfo = res
  }

  const editPackageGroup = async (packageGroup: {
    mainPackage: IUpdateAddonPackage
    addonPackages: IUpdateAddonPackage[]
  }) => {
    if (state.packageGroupInfo) {
      const mainPackage = state.packageGroupInfo.find((pk) => pk.isMainPackage)

      await Promise.all(
        state.packageGroupInfo.map(async (pk) => {
          const havePackage = packageGroup.addonPackages.some(
            (p) => p.packageId === pk.packageId
          )
          if (!havePackage) {
            await removePackageById({
              packageId: pk.packageId,
              packageGroupId: pk.id,
            })
          }
        })
      )
      const { error, message } = await updatePackageGroup({
        mainPackageId: packageGroup.mainPackage.packageId,
        addonPackages: packageGroup.addonPackages,
      })

      if (error) {
        notyf.error(errMessage(message))
      } else {
        router.push({
          name: 'products-packages-groups-:packageid',
          params: { packageid: `${packageGroup.mainPackage.packageId}` },
        })
      }
    }
    //
  }

  const removePackageById = async (params: DeleteAddonPackageParams) => {
    const res = await deleteAddonPackageGroupById(params)
    console.log(res)
  }

  const routeToView = () => {
    if (isEditPage.value) {
      router.push({ hash: '' })
    }
  }

  return {
    ...toRefs(state),
    isEditPage,
    createPackageGroup,
    editPackageGroup,
    fetchPackageInfo,
    removePackageById,
    routeToView,
  }
}
