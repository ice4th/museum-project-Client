import { Notyf } from 'notyf'
import { computed, onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { errMessage } from '../../helpers/filter.helper'
import {
  IMenu,
  IRoleInfo,
  ISelectedMenuItem,
} from '../../types/interfaces/permission.interface'
import useOptionApi from '../api/useOptionApi'
import usePermissionApi from '../api/usePermissionApi'
import { IUseCreateRoleState } from './use-create-role'

export interface IUseUpdateRoleState extends IUseCreateRoleState {
  roleData: IRoleInfo | null
  loadingRole: boolean
}

/**
 * global notify
 */
const notyfMessage = new Notyf({
  duration: 2000,
  position: {
    x: 'center',
    y: 'top',
  },
})

export default function useUpdateRole() {
  /**
   * Use Composable Api
   */
  const { getRoleById, getMenus, updateRole } = usePermissionApi()
  const { getTeams } = useOptionApi()

  /**
   * Use Router
   */
  const router = useRouter()
  const route = useRoute()

  /**
   * State
   */
  const state = reactive<IUseUpdateRoleState>({
    roleData: null,
    menuItems: [],
    roleName: '',
    roleDescription: '',
    teamId: undefined,
    teamOptions: [],
    // Loading
    loadingRole: false,
    menuLoading: false,
    loadingOption: false,
    // verify message
    showMessage: false,
  })

  /**
   * Computed
   */
  const disabledCreateBtn = computed(() => {
    return (
      state.roleDescription.trim().length < 12 ||
      state.roleName.trim().length < 4 ||
      selectedItems.value.length === 0
    )
  })
  const selectedItems = computed(() => {
    return state.menuItems.reduce((prev, next: IMenu) => {
      let totalActions = 0
      const subMenus = next.subMenus.filter(({ actions }) => {
        const selected = (actions || []).filter((action) => action.selected)
        if (selected?.length > 0) {
          totalActions += selected.length
          return true
        }
        return false
      })
      if (subMenus?.length > 0) {
        prev.push({
          name: next.name,
          icon: 'feather:file-plus',
          actions: totalActions,
          subtitles: subMenus?.length,
          subMenus: subMenus.map(({ name, actions }) => {
            return {
              name,
              actions: (actions || [])
                .filter(({ selected }) => selected)
                .map((permission) => ({
                  id: permission.id,
                  name: permission.actionName,
                })),
            }
          }),
        })
      }
      return prev
    }, [] as ISelectedMenuItem[])
  })
  const verifyMessage = computed(() => {
    if (selectedItems.value.length === 0) {
      state.showMessage = true
    }
    return state.showMessage
  })
  const colorMessage = computed(() => {
    return selectedItems.value.length === 0 ? 'danger' : 'success'
  })

  /**
   * Methods
   */
  const setMenuItems = async () => {
    state.menuLoading = true

    if (state.roleData) {
      const permissions = state.roleData.permissions?.map(({ id }) => id)

      const { data } = await getMenus()
      state.menuItems = data.map((mainMenu) => {
        let totalActions = 0

        const subMenus = mainMenu.subMenus.map((subMenu) => {
          const actions = subMenu.permissions.map((action) => {
            const selected = permissions?.includes(action.id)
            return {
              ...action,
              selected,
            }
          })

          totalActions += actions.length

          return {
            ...subMenu,
            actions,
          }
        })

        return {
          ...mainMenu,
          show: false,
          subtitles: subMenus.length,
          actions: totalActions,
          icon: 'feather:file-plus',
          subMenus,
        }
      })
    }

    state.menuLoading = false
    state.showMessage = false
  }
  const fetchOption = async () => {
    state.loadingOption = true
    state.teamOptions = await getTeams()
    state.loadingOption = false
  }
  const fetchRole = async (id: number) => {
    state.loadingRole = true
    const res = await getRoleById(id)

    state.roleData = res
    if (state.roleData) {
      state.roleName = res.name || ''
      state.roleDescription = res.description || ''
      state.teamId = res.team?.id
    }
    state.loadingRole = false
  }
  const onUpdate = async () => {
    const permissionIds = selectedItems.value
      .map((item: any) =>
        item.subMenus.map((sub: any) =>
          sub.actions.map((action: any) => action.id)
        )
      )
      .flat(2)

    if (state?.teamId && state.roleData?.id) {
      const { status, message } = await updateRole({
        description: state.roleDescription,
        id: state.roleData.id,
        teamId: state.teamId,
        name: state.roleName,
        permissionIds,
      })

      if (status === 200) {
        notyfMessage.open({
          type: 'success',
          message: 'Role was updated!',
        })
      } else {
        notyfMessage.open({
          message: errMessage(message),
          type: 'error',
        })
      }
    }

    const team = state.teamOptions.find(({ id }) => id === state.teamId)
    await router.push({
      name: 'permissions-role',
      query: {
        search: team?.name || '',
      },
    })
  }
  const onReset = async () => {
    state.roleDescription = state.roleData?.description || ''
    state.roleName = state.roleData?.name || ''
    state.teamId = state.roleData?.team?.id
    await setMenuItems()
  }

  /**
   * On Mounted
   */
  onMounted(async () => {
    await fetchRole(parseInt(`${route.params.id}`))
    setMenuItems()
    fetchOption()
  })

  return {
    ...toRefs(state),
    // Computed
    disabledCreateBtn,
    selectedItems,
    verifyMessage,
    colorMessage,
    // Methods
    fetchOption,
    onUpdate,
    onReset,
  }
}
