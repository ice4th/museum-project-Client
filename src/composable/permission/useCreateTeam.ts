import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import usePermissionApi from '../api/usePermissionApi'
import useNotyf from '../useNotyf'
import { errMessage } from '/@src/helpers/filter.helper'
import { ITeamCreate } from '/@src/types/interfaces/permission.interface'

export interface IUseCreateTeamstate {
  teamInfo: ITeamCreate
  validate: Object
}

export default function useCreateTeam() {
  const state = reactive<IUseCreateTeamstate>({
    teamInfo: {
      name: '',
      description: '',
    },
    validate: {},
  })
  const notyf = useNotyf()
  const { createTeam: apiCreateTeam } = usePermissionApi()
  const router = useRouter()
  const createTeam = async () => {
    const data = await apiCreateTeam(state.teamInfo)
    if (data.status === 201) {
      notyf.success('success!')
      state.validate = {}
      router.push({ name: 'permission-team' })
    } else {
      if (typeof data.message === 'object') {
        state.validate = data.message
      } else {
        notyf.error(errMessage(data.message))
      }
    }
  }
  return { ...toRefs(state), createTeam }
}
