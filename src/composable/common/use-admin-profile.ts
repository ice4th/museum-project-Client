/**
 * useAdminProfile Composition API
 */
import { onMounted, reactive, ref, toRefs } from 'vue'
import AuthService from '/@src/api/auth.service'
import { Notyf } from 'notyf'
import { useRoute, useRouter } from 'vue-router'
import { IAdminInfo } from '/@src/types/interfaces/admin.interface'
import { AdminStatus } from '/@src/types/enums/admin.enum'

export default function useAdminProfile() {
  const notyf = new Notyf({
    duration: 2000,
    position: {
      x: 'center',
      y: 'top',
    },
  })
  const router = useRouter()
  const route = useRoute()
  const isLoading = ref(false)
  const messageError = ref('')
  const adminProfile = reactive<IAdminInfo>({
    id: 0,
    name: '',
    email: '',
    firstname: '',
    lastname: '',
    status: AdminStatus.DEACTIVATE,
    avatar: '',
    phone: '',
    dob: '',
    lastLogin: '',
  })

  const fetchProfile = async () => {
    isLoading.value = true
    const { data, status } = await AuthService.getMyAdminInfo()
    isLoading.value = false
    if (status === 200) {
      adminProfile.id = data.id
      adminProfile.name = data.name
      adminProfile.email = data.email
      adminProfile.firstname = data.firstname
      adminProfile.lastname = data.lastname
      adminProfile.status = data.status
      adminProfile.avatar = data.avatar
      adminProfile.dob = data.dob
      adminProfile.lastLogin = data.lastLogin
      localStorage.setItem('wh_profile', JSON.stringify(data))
      return
    }
  }

  const getMyProfile = async () => {
    const myProfile = localStorage.getItem('wh_profile')
    if (!!myProfile) {
      const parsedProfile = JSON.parse(myProfile) as IAdminInfo
      adminProfile.id = parsedProfile.id
      adminProfile.name = parsedProfile.name
      adminProfile.email = parsedProfile.email
      adminProfile.firstname = parsedProfile.firstname
      adminProfile.lastname = parsedProfile.lastname
      adminProfile.status = parsedProfile.status
      adminProfile.avatar = parsedProfile.avatar
      adminProfile.dob = parsedProfile.dob
      adminProfile.lastLogin = parsedProfile.lastLogin
      return
    }
    await fetchProfile()
  }

  onMounted(() => {
    getMyProfile()
  })

  return { adminProfile, fetchProfile, messageError }
}
