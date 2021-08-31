import { InjectionKey, ref, computed, inject, reactive } from 'vue'
import { useStorage } from '@vueuse/core'
import { IUserInfo } from '../types/interfaces/admin.interface'
import { ADMIN_ACCESS_TOKEN, ADMIN_PROFILE } from './api'
import {
  listOfMainMenuByPermission,
  NavbarItemDetail,
} from '../helpers/permission'
import Cookies from 'js-cookie'

export const userSessionSymbol: InjectionKey<UserSessionData> = Symbol()
export interface UserSessionData {
  user?: IUserInfo
  isLoggedIn: boolean
  navbarList: NavbarItemDetail[]
  permissions: string[]
}

export function initUserSession(): UserSessionData {
  const token = !!Cookies.get(ADMIN_ACCESS_TOKEN)
  const userJsonString = useStorage(ADMIN_PROFILE, '')
  const user = ref<IUserInfo | undefined>(
    userJsonString.value !== '' && token
      ? (JSON.parse(userJsonString.value) as IUserInfo)
      : undefined
  )
  const isLoggedIn = computed(() => !!user.value)
  const navbarList = computed(() =>
    user.value ? listOfMainMenuByPermission(user.value.menus) : []
  )
  const permissions = computed(() => user?.value?.permissions || [])
  return reactive({
    user,
    isLoggedIn,
    navbarList,
    permissions,
  })
}

export default function useUserSession(): UserSessionData {
  const userSession = inject<UserSessionData>(userSessionSymbol)
  if (!userSession) {
    throw new Error('UserSession not properly injected in app')
  }
  return userSession
}
