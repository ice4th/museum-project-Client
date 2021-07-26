import { onMounted, reactive, toRefs, computed } from 'vue'
import { useRoute } from 'vue-router'
import StudentService from '/@src/api/student.service'
import {
  IStudentPackageItems,
  StudentPackageItemResponse,
} from '/@src/types/interfaces/package-item.interface'
import { TicketType } from '../../types/enums/ticket.enum'

interface UseStudentPackageItemState {
  validation?: object
  inactivePackages: IStudentPackageItems[]
  activePackages: IStudentPackageItems[]
  expirePackages: IStudentPackageItems[]
}

export default function useStudentPackageItem() {
  const state = reactive<UseStudentPackageItemState>({
    validation: {},
    inactivePackages: [],
    activePackages: [],
    expirePackages: [],
  })
  const route = useRoute()

  const response: StudentPackageItemResponse = {
    inactivePackages: [
      {
        packageItemId: 1,
        packageId: 2322,
        packageName: 'English Speaking Lab for Junior',
        packageImage:
          'https://d1627oxh4wmxfp.cloudfront.net/Kids course/package-cover/english-junior.jpg',
        tickets: [
          {
            type: TicketType.SUBSCRIPTION,
            remain: 1,
            startDate: undefined,
            expireDate: new Date('12-02-2021'),
          },
        ],
      },
      {
        packageItemId: 2,
        packageId: 923,
        packageName: 'Find My Coach Business G1-G2',
        packageImage:
          'https://d1627oxh4wmxfp.cloudfront.net/Kids course/package-cover/english-junior.jpg',
        tickets: [
          {
            type: TicketType.PACKAGE,
            remain: 3,
            startDate: undefined,
            expireDate: new Date('12-02-2021'),
          },
        ],
      },
    ],
    activePackages: [
      {
        packageItemId: 3,
        packageId: 1121,
        packageName: 'General English G2',
        packageImage: 'https://d1627oxh4wmxfp.cloudfront.net',
        tickets: [
          {
            type: TicketType.GBP,
            remain: 11,
            startDate: new Date('01-03-2021'),
            expireDate: new Date('12-11-2021'),
          },
          {
            type: TicketType.PACKAGE,
            remain: 11,
            startDate: new Date('01-03-2021'),
            expireDate: new Date('12-11-2021'),
          },
          {
            type: TicketType.GROUP,
            remain: 3,
            startDate: new Date('01-03-2021'),
            expireDate: new Date('12-11-2021'),
          },
          {
            type: TicketType.MASTER,
            remain: 3,
            startDate: new Date('01-03-2021'),
            expireDate: new Date('12-11-2021'),
          },
          {
            type: TicketType.FREETALK,
            remain: 1,
            startDate: new Date('01-03-2021'),
            expireDate: new Date('12-11-2021'),
          },
        ],
      },
    ],
    expirePackages: [],
  }
  const fetchStudentPackages = async () => {
    const id = route.params.id as string
    const { data, status } = await StudentService.getStudentPackageItems(+id)
    if (status === 200 && data) {
      state.activePackages = response.activePackages
      state.inactivePackages = response.inactivePackages
      state.expirePackages = response.expirePackages
      // state.activePackages = data.activePackages
      // state.inactivePackage = data.inactivePackage
      // state.expirePackages = data.expirePackages
    }
  }

  onMounted(() => {
    fetchStudentPackages()
  })
  return { ...toRefs(state) }
}
