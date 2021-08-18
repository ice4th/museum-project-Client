import { reactive, toRefs } from 'vue'
// import { useRoute, useRouter } from 'vue-router'
// import usePackageApi from '../api/usePackageApi'
interface UseViewAdminState {}
export default function useViewAdmin() {
  const state = reactive<UseViewAdminState>({})
  return { ...toRefs(state) }
}
