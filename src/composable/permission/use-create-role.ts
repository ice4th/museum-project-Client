import { Notyf } from 'notyf'
import { computed, onMounted, reactive, toRaw, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { errMessage } from '../../helpers/filter.helper'
import { TeamOption } from '../../types/interfaces/option.interface'
import { IMenu } from '../../types/interfaces/permission.interface'
import useOptionApi from '../api/useOptionApi'
import usePermissionApi from '../api/usePermissionApi'

export interface IUseCreateRole {
  menuItems: IMenu[]
  selectedItems: any[] // create interface later
  roleName: string
  roleDescription: string
  teamId?: number
  teamOptions: TeamOption[]
  menuLoading: boolean
  loadingOption: boolean
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
  const state = reactive<IUseCreateRole>({
    menuItems: [] as IMenu[],
    selectedItems: [] as any[],
    roleName: '',
    roleDescription: '',
    teamId: undefined,
    teamOptions: [],
    // Loading
    menuLoading: false,
    loadingOption: false,
  })

  /**
   * Computed
   */
  const disabledCreateBtn = computed(() => {
    return (
      state.roleDescription.trim().length < 12 ||
      state.roleName.trim().length < 4 ||
      state.selectedItems.length === 0
    )
  })

  /**
   * Methods
   */
  const fetchMenus = async () => {
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
    const permissionIds = state.selectedItems
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

    await router.push({
      name: 'permission-role',
      query: {
        search: state.roleName,
      },
    })
  }
  const onClear = async () => {
    state.selectedItems = []
    state.roleDescription = ''
    state.roleName = ''
    state.teamId = undefined
    await fetchMenus()
  }

  /**
   * On Mounted
   */
  onMounted(() => {
    fetchOption()
    fetchMenus()
  })

  return {
    ...toRefs(state),
    // Computed
    disabledCreateBtn,
    // Methods
    fetchOption,
    onCreate,
    onClear,
  }
}
