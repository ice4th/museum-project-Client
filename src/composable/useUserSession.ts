import { InjectionKey, ref, computed, inject, reactive } from 'vue'
import { useStorage } from '@vueuse/core'
import { IAdminInfo } from '../types/interfaces/admin.interface'

export const userSessionSymbol: InjectionKey<UserSessionData> = Symbol()

const ADMIN_ACCESS_TOKEN = 'wh_access_token'
const ADMIN_PROFILE = 'wh_profile'
export interface UserSessionData {
  token: string
  user?: IAdminInfo
  isLoggedIn: boolean
}

export function initUserSession(): UserSessionData {
  const token = useStorage(ADMIN_ACCESS_TOKEN, '')
  const userJsonString = useStorage(ADMIN_PROFILE, '')
  const user = ref<IAdminInfo | undefined>(
    JSON.parse(userJsonString.value) as IAdminInfo
  )
  const isLoggedIn = computed(() => token.value !== '')
  return reactive({
    token,
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
