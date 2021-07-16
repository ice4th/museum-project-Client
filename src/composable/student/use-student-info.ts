import { reactive, toRefs } from 'vue'
import { StudentCountry, StudentLanguage } from '/@src/types/enums/student.enum'
import { IStudentInfo } from '/@src/types/interfaces/student.interface'
interface UseStudentInfoState {
  studentInfo: IStudentInfo
}
export default function useStudentInfo() {
  const state = reactive<UseStudentInfoState>({
    studentInfo: {
      id: 14452,
      email: 'asamaporn.c@globish.co.th',
      avatar:
        'https://d1bnvx5vhcnf8w.cloudfront.net/student/avatar/dq9HN3OHJW4M7LpwferV2gTLskHKb53jECfXU2nh.jpeg',

      gender: 'female',
      firstname: {
        en: 'Asamaporn',
        th: 'อสมาภรณ์',
      },
      lastname: {
        en: 'Chantarasakul',
        th: 'จันทรสกุล',
      },
      nickname: {
        en: 'Now',
        th: 'นาว',
      },
      dob: '1996-12-12',
      devices: ['Mac'],
      country: StudentCountry.TH,
      language: StudentLanguage.TH,
      nationality: 'Thai',
      industry: '',
      occupation: 'COMPUTER & MATHEMATICAL',
      phone: '0945528338',
      school: '',
      timezone: 'Asia/Bangkok',
    },
  })

  return { ...toRefs(state) }
}
