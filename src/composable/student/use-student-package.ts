import { onMounted, reactive, toRefs, computed } from 'vue'
import { useRoute } from 'vue-router'
import StudentService from '/@src/api/student.service'
import { StudentPackageItemResponse } from '/@src/types/interfaces/package-item.interface'
import { ITicketInfo } from '/@src/types/interfaces/ticket.interface'
import { TicketType } from '../../types/enums/ticket.enum'
import moment from 'moment'

interface IGroupPackageItems {
  inactivePackage: StudentPackageItemResponse[]
  activePackages: StudentPackageItemResponse[]
  expirePackages: StudentPackageItemResponse[]
}

interface UseStudentPackageItemState {
  packageItems: StudentPackageItemResponse[]
  validation?: object
  inactivePackage: StudentPackageItemResponse[]
  activePackages: StudentPackageItemResponse[]
  expirePackages: StudentPackageItemResponse[]
}

export default function useStudentPackageItem() {
  const state = reactive<UseStudentPackageItemState>({
    packageItems: [],
    validation: {},
    inactivePackage: [],
    activePackages: [],
    expirePackages: [],
  })
  const route = useRoute()

  const getPrivateTicket = (data: ITicketInfo[]) => {
    const type = ['package', 'makeup', 'freetalk']
    const remain = data?.filter((ticket) => type.includes(ticket.type))
    return remain
  }
  const getDiscussionClassTicket = (data: ITicketInfo[]) => {
    const type = ['group_class']
    const remain = data?.filter((ticket) => type.includes(ticket.type))
    return remain
  }
  const getMasterClassTicket = (data: ITicketInfo[]) => {
    const type = ['master_class']
    const remain = data?.filter((ticket) => type.includes(ticket.type))
    return remain
  }
  const getGlobishPlusTicket = (data: ITicketInfo[]) => {
    const type = ['globish_plus']
    const remain = data?.filter((ticket) => type.includes(ticket.type))
    return remain
  }
  const setDate = (date: string | Date) => {
    return moment(date).isValid() ? moment(date).format('DD-MM-YYYY') : '-'
  }
  const setData = (data: StudentPackageItemResponse) => {
    const [firstTicket] = data?.tickets
    if (firstTicket?.type === TicketType.SUBSCRIPTION) {
      return {
        packageItemId: data.id,
        packageName: data.package?.packageName,
        type: TicketType.SUBSCRIPTION,
        startDate: setDate(firstTicket?.startDate),
        expireDate: setDate(firstTicket?.expireDate),
      }
    } else {
      const privateTicket = getPrivateTicket(data?.tickets)

      return {
        packageItemId: data.id,
        packageName: data.package?.packageName,
        type: data.package?.type,
        tickets: {
          privateTicket: privateTicket.length,
          startDate: setDate(privateTicket?.[0].startDate),
        },
      }
    }
  }
  const fetchStudentPackages = async () => {
    const id = route.params.id as string
    const { data, status } = await StudentService.getStudentPackageItems(+id)
    if (status === 200 && data) {
      state.packageItems = data
      state.packageItems.map((packItem) => {
        // if expire ticket < new Date so the package item already expired
        if (packItem.tickets?.[0]?.expireDate < new Date())
          state.expirePackages.push(packItem)
        // if startDate is null so the package item is not activated
        else if (!packItem.tickets?.[0]?.startDate)
          state.inactivePackage.push(packItem)
        // the package item is already activeted
        else state.activePackages.push(packItem)
      })
    }
  }

  onMounted(() => {
    // const page = route.query.page as string
    fetchStudentPackages()
  })
  return { ...toRefs(state) }
}
