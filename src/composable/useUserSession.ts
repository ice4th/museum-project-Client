import { InjectionKey, ref, computed, inject, reactive, toRef } from 'vue'
import { useStorage } from '@vueuse/core'
import { IAdminInfo } from '../types/interfaces/admin.interface'
import Cookies from 'js-cookie'
import { ADMIN_ACCESS_TOKEN, ADMIN_PROFILE } from './api'

export const userSessionSymbol: InjectionKey<UserSessionData> = Symbol()
export interface UserSessionData {
  user?: IAdminInfo
  isLoggedIn: boolean
}

export function initUserSession(): UserSessionData {
  const userJsonString = useStorage(ADMIN_PROFILE, '')
  const user = ref<IAdminInfo | undefined>(
    userJsonString.value !== ''
      ? (JSON.parse(userJsonString.value) as IAdminInfo)
      : undefined
  )
  const isLoggedIn = computed(() => !!user.value)
  return reactive({
    user,
    isLoggedIn,
  })
}

export default function useUserSession(): UserSessionData {
  const userSession = inject<UserSessionData>(userSessionSymbol)
  if (!userSession) {
    throw new Error('UserSession not properly injected in app')
  }
  return userSession
}
