/**
 * useAdminProfile Composition API
 */
import { onMounted, reactive, ref, toRefs } from 'vue'
import AuthService from '/@src/api/auth.service'
import { Notyf } from 'notyf'
import { useRoute, useRouter } from 'vue-router'
import AdminService from '/@src/api/admin.service'

interface AdminProfile {
  name: string
  email: string
  firstname: string
  lastname: string
  // dob: string
}
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
  const adminProfile = reactive<AdminProfile>({
    name: '',
    email: '',
    firstname: '',
    lastname: '',
  })

  const fetchProfile = async () => {
    isLoading.value = true
    await AdminService.getMyProfile()
    isLoading.value = false
    const data = {
      name: 'Now',
      email: 'pongpaimn@gmail.com',
      firstname: 'Asamaporn',
      lastname: 'Chantarasakul',
    } as AdminProfile

    adminProfile.name = data.name
    adminProfile.email = data.email
    adminProfile.firstname = data.firstname
    adminProfile.lastname = data.lastname
    localStorage.setItem('wh_profile', JSON.stringify(data))
    //  if (status === 201) {
    //    // cookie
    //    return
    //  }
    //  messageError.value = message
  }

  const getMyProfile = async () => {
    const myProfile = localStorage.getItem('wh_profile')
    if (!!myProfile) {
      const parsedProfile = JSON.parse(myProfile) as AdminProfile
      adminProfile.name = parsedProfile.name
      adminProfile.email = parsedProfile.email
      adminProfile.firstname = parsedProfile.firstname
      adminProfile.lastname = parsedProfile.lastname
      return
    }
    await fetchProfile()
  }

  onMounted(() => {
    getMyProfile()
  })

  return { adminProfile, fetchProfile, messageError }
}
