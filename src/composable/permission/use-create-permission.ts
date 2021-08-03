import { computed, onMounted, reactive, toRaw, toRefs } from 'vue'
import PermissionService from '../../api/permission.service'
import { IMenu } from '../../types/interfaces/permission.interface'

const PERMISSION_ICON = [
  { id: 1, type: 'iconify', icon: 'feather:users' },
  { id: 4, type: 'iconify', icon: 'feather:box' },
  { id: 8, type: 'iconify', icon: 'feather:unlock' },
]

export default function useCreatePermission() {
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

    const { data } = await PermissionService.getMenus()
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
        icon:
          PERMISSION_ICON.find((icon) => icon.id === mainMenu.id)?.icon ||
          'feather:bookmark',
        subMenus,
      }
    })

    state.menuLoading = false
  }
  const onCreate = async () => {
    const permissions = state.selectedItems
      .map((item: any) =>
        item.subMenus.map((sub: any) =>
          sub.actions.map((action: any) => action.id)
        )
      )
      .flat(2)

    const { status } = await PermissionService.createRole({
      teamId: 100,
      permissions,
      name: state.roleName,
      description: state.roleDescription,
    })

    if (status !== 201) {
      // notify error
    }
    // await onClear()
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
