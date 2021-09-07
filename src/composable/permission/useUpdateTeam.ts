import { Notyf } from 'notyf'
import { onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import usePermissionApi from '../api/usePermissionApi'
import useNotyf from '../useNotyf'
import { errMessage } from '/@src/helpers/filter.helper'
import { ITeamData } from '/@src/types/interfaces/permission.interface'

export interface IUseUpdateTeamstate {
  teamInfo: ITeamData
  validate: Object
}

export default function useUpdateTeam() {
  const state = reactive<IUseUpdateTeamstate>({
    teamInfo: {
      name: '',
      description: '',
    },
    validate: {},
  })
  const route = useRoute()
  const router = useRouter()
  const notyf = useNotyf()
  const { getTeamById, updateTeam } = usePermissionApi()
  const teamId = route.params.id as string
  const getTeamInfo = async () => {
    const res = await getTeamById(+teamId)
    state.teamInfo = res
  }

  const editTeam = async () => {
    const res = await updateTeam(+teamId, state.teamInfo)
    if (res.status === 200) {
      notyf.success('success!')
      state.validate = {}
      router.push({ name: 'permission-team' })
    } else {
      if (typeof res.message === 'object') {
        state.validate = res.message
      } else {
        notyf.error(errMessage(res.message))
      }
    }
  }

  onMounted(() => {
    getTeamInfo()
  })
  return { ...toRefs(state), editTeam }
}
