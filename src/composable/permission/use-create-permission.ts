import { Notyf } from 'notyf'
import { computed, onMounted, reactive, toRaw, toRefs } from 'vue'
import { errMessage } from '../../helpers/filter.helper'
import { IMenu } from '../../types/interfaces/permission.interface'
import usePermissionApi from '../api/usePermissionApi'
import useUserSession from '../useUserSession'

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

export default function useCreatePermission() {
  /**
   * Use Composable Api
   */
  const { createRole, getMenus } = usePermissionApi()
  const userSession = useUserSession()

  /**
   * State
   */
  const state = reactive({
    menuItems: [] as IMenu[],
    selectedItems: [] as any[],
    roleName: '',
    roleDescription: '',
    // Loading
    menuLoading: false,
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
  const onCreate = async () => {
    const permissionIds = state.selectedItems
      .map((item: any) =>
        item.subMenus.map((sub: any) =>
          sub.actions.map((action: any) => action.id)
        )
      )
      .flat(2)

    if (userSession.user?.teamId) {
      const { status, message } = await createRole({
        description: state.roleDescription,
        name: state.roleName,
        permissionIds,
        teamId: 1111,
      })

      if (status === 201) {
        notyfMessage.open({
          type: 'success',
          message: 'Package was created!',
        })
      } else {
        notyfMessage.open({
          message: errMessage(message),
          type: 'error',
        })
      }
      await onClear()
    } else {
      console.error('Not found team id')
    }
  }
  const onClear = async () => {
    state.selectedItems = []
    await fetchMenus()
  }

  /**
   * On Mounted
   */
  onMounted(async () => {
    await fetchMenus()
  })

  return {
    ...toRefs(state),
    // Computed
    disabledCreateBtn,
    // Methods
    onCreate,
    onClear,
  }
}
