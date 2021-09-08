import { Notyf } from 'notyf'
import { computed, onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { errMessage } from '../../helpers/filter.helper'
import { TeamOption } from '../../types/interfaces/option.interface'
import {
  IMenu,
  ISelectedMenuItem,
} from '../../types/interfaces/permission.interface'
import useOptionApi from '../api/useOptionApi'
import usePermissionApi from '../api/usePermissionApi'

export interface IUseCreateRoleState {
  menuItems: IMenu[]
  roleName: string
  roleDescription: string
  teamId?: number
  teamOptions: TeamOption[]
  menuLoading: boolean
  loadingOption: boolean
  showMessage: boolean
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

export default function useCreateRole() {
  /**
   * Use Composable Api
   */
  const { createRole, getMenus } = usePermissionApi()
  const { getTeams } = useOptionApi()

  /**
   * Use Router
   */
  const router = useRouter()

  /**
   * State
   */
  const state = reactive<IUseCreateRoleState>({
    menuItems: [],
    roleName: '',
    roleDescription: '',
    teamId: undefined,
    teamOptions: [],
    // Loading
    menuLoading: false,
    loadingOption: false,
    // verify message
    showMessage: true,
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

    const { data } = await getMenus()
    state.menuItems = data.map((mainMenu) => {
      let totalActions = 0

      const subMenus = mainMenu.subMenus.map((subMenu) => {
        const actions = subMenu.permissions.map((action) => ({
          ...action,
          selected: false,
        }))

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

    state.menuLoading = false
  }
  const fetchOption = async () => {
    state.loadingOption = true
    state.teamOptions = await getTeams()
    state.loadingOption = false
  }
  const onCreate = async () => {
    const permissionIds = selectedItems.value
      .map((item: any) =>
        item.subMenus.map((sub: any) =>
          sub.actions.map((action: any) => action.id)
        )
      )
      .flat(2)

    if (state?.teamId) {
      const { status, message } = await createRole({
        description: state.roleDescription,
        teamId: state.teamId,
        name: state.roleName,
        permissionIds,
      })

      if (status === 201) {
        notyfMessage.open({
          type: 'success',
          message: 'Role was created!',
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
  const onClear = async () => {
    state.roleDescription = ''
    state.roleName = ''
    state.teamId = undefined
    await setMenuItems()
  }

  /**
   * On Mounted
   */
  onMounted(() => {
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
    onCreate,
    onClear,
  }
}
