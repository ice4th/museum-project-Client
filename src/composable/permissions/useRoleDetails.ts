import { computed, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { initAvatar } from '../../helpers/avatar.helper'
import { toFormat } from '../../helpers/date.helper'
import { TeamOption } from '../../types/interfaces/option.interface'
import {
  IMenu,
  IRoleInfo,
  ISelectedMenuItem,
} from '../../types/interfaces/permission.interface'
import useOptionApi from '../api/useOptionApi'
import usePermissionApi from '../api/usePermissionApi'

export interface IUseRoleDetailsState {
  roleData: IRoleInfo | null
  menuItems: IMenu[]
  teamOptions: TeamOption[]
  loadingRole: boolean
  menuLoading: boolean
  loadingOption: boolean
}

export default function useRoleDetails() {
  /**
   * Use Composable Api
   */
  const { getRoleById, getMenus, getRoleUsers } = usePermissionApi()
  const { getTeams } = useOptionApi()

  /**
   * Use Router
   */
  const route = useRoute()

  /**
   * State
   */
  const state = reactive<IUseRoleDetailsState>({
    roleData: null,
    menuItems: [],
    teamOptions: [],
    // Loading
    loadingRole: false,
    menuLoading: false,
    loadingOption: false,
  })

  /**
   * Computed
   */
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
  const userData = computed(() => {
    return state.roleData?.users?.map((item) => {
      const { firstname, lastname, lastLogin } = item
      const { initials, color } = initAvatar(firstname, lastname)
      return {
        lastLogin: toFormat(lastLogin, 'MMM D, YYYY HH:mm'),
        manageCountry: item.manageCountry,
        avatar: item.avatar,
        status: item.status,
        email: item.email,
        name: item.name,
        firstname,
        lastname,
        initials,
        color,
      }
    })
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
  }
  const fetchTeamsOption = async (search?: string) => {
    state.loadingOption = true
    state.teamOptions = await getTeams({
      currentPage: 1,
      perPage: 25,
      search,
    })
    state.loadingOption = false
    return state.teamOptions
  }
  const fetchRole = async (id: number) => {
    state.loadingRole = true
    const [roleUsers, rolePermissions] = await Promise.all([
      getRoleUsers(id),
      getRoleById(id),
    ])

    state.roleData = rolePermissions
    if (state.roleData) {
      state.roleData.name = rolePermissions.name || ''
      state.roleData.description = rolePermissions.description || ''
      state.roleData.teamId = rolePermissions.team?.id
      // set role users
      state.roleData.users = roleUsers.users
    }
    state.loadingRole = false
  }

  /**
   * On Mounted
   */
  onMounted(async () => {
    await fetchRole(parseInt(`${route.params.id}`))
    setMenuItems()
    fetchTeamsOption()
  })

  return {
    ...toRefs(state),
    // Computed
    selectedItems,
    userData,
    // Methods
    fetchTeamsOption,
  }
}
