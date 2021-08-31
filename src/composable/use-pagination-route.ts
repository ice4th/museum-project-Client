import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { IPaginationParams } from '../types/interfaces/common.interface'
interface PaginationRouteState extends IPaginationParams {}
export default function usePaginationRoute() {
  const route = useRoute()

  const currentPage = computed(() => (route.query.page as string) || '1')
  const perPage = computed(() => (route.query.perPage as string) || '10')
  const search = computed(() => (route.query.search as string) || undefined)
  return reactive<PaginationRouteState>({
    currentPage: +currentPage.value,
    perPage: +perPage.value,
    search: search.value || undefined,
  })
}
