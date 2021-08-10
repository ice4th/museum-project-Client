import { InjectionKey, ref, computed, inject, reactive } from 'vue'
import { useStorage } from '@vueuse/core'
import { IAdminInfo } from '../types/interfaces/admin.interface'
import { ADMIN_PROFILE } from './api'
import {
  listOfMainMenuByPermission,
  NavbarItemDetail,
} from '../helpers/permission.helper'

export const userSessionSymbol: InjectionKey<UserSessionData> = Symbol()
export interface UserSessionData {
  user?: IAdminInfo
  isLoggedIn: boolean
  navbarList: NavbarItemDetail[]
}

export function initUserSession(): UserSessionData {
  const userJsonString = useStorage(ADMIN_PROFILE, '')
  const user = ref<IAdminInfo | undefined>(
    userJsonString.value !== ''
      ? (JSON.parse(userJsonString.value) as IAdminInfo)
      : undefined
  )
  const isLoggedIn = computed(() => !!user.value)
  const navbarList = computed(() =>
    user.value ? listOfMainMenuByPermission(user.value.menus) : []
  )
  return reactive({
    user,
    isLoggedIn,
    navbarList,
  })
}

export default function useUserSession(): UserSessionData {
  const userSession = inject<UserSessionData>(userSessionSymbol)
  if (!userSession) {
    throw new Error('UserSession not properly injected in app')
  }
  return userSession
}
