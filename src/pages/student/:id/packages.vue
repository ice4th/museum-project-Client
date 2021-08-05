<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref, watch } from 'vue'
import useStudentPackageItemState from '/@src/composable/student/use-student-package'
import type { IStudentPackageItems } from '/@src/types/interfaces/package-item.interface'
const ModalChangePackage = defineAsyncComponent(
  () => import('/@src/components/student/packages/ModalChangePackage.vue')
)
const ModalSendPackage = defineAsyncComponent(
  () => import('/@src/components/student/packages/ModalSendPackage.vue')
)
const ModalRemovePackage = defineAsyncComponent(
  () => import('/@src/components/student/packages/ModalRemovePackage.vue')
)
const {
  packageItems,
  fetchStudentPackages,
  isLoading,
  currentPackageItem,
  removeTicket,
  sendPackage,
  changeToNewPackage,
  removePackage,
} = useStudentPackageItemState()
type modalComponent = 'send-package' | 'change-package' | 'remove-package'
const currentModal = ref('')
const toggleModal = (
  packageItem?: IStudentPackageItems,
  from?: modalComponent
) => {
  console.log('toggleModal')
  currentModal.value = from || ''
  currentPackageItem.value = packageItem
}
const isOpenModalComponent = computed(() => {
  switch (currentModal.value) {
    case 'change-package':
      return ModalChangePackage
    case 'send-package':
      return ModalSendPackage
    case 'remove-package':
      return ModalRemovePackage

    default:
      return ModalRemovePackage
  }
})

const onSubmit = (value: string | number) => {
  switch (currentModal.value) {
    case 'change-package':
      if (typeof value === 'number') changeToNewPackage(data)
    case 'send-package':
      if (typeof value === 'number') sendPackage(value)
    case 'remove-package':
      if (typeof value === 'string') removePackage(value)

    default:
      return
  }
}
onMounted(() => {
  fetchStudentPackages()
})
</script>
<template>
  <div v-if="!isLoading">
    <!-- [Modal]: Send Package -->
    <!-- [Modal]: Change Package -->
    <!-- [Modal]: Remove Package -->
    <component
      :is="isOpenModalComponent"
      :title="`Send package`"
      :open-modal="!!currentPackageItem"
      @on-change="onSubmit"
      @toggle-close="toggleModal"
    ></component>
    <CollapseContent
      v-if="packageItems.inactivePackages.length"
      with-chevron
      title="Inactive Package"
    >
      <template #collapse-content>
        <StudentPackageItem
          :package-items="packageItems.inactivePackages"
          can-activate
          @fetch-package-items="fetchStudentPackages"
          @send-package="toggleModal($event, 'send-package')"
          @change-package="toggleModal($event, 'change-package')"
          @remove-package="toggleModal($event, 'remove-package')"
        />
      </template>
    </CollapseContent>
    <CollapseContent
      v-if="packageItems.activePackages.length"
      with-chevron
      title="Active Package"
    >
      <template #collapse-content>
        <StudentPackageItem
          :package-items="packageItems.activePackages"
          @fetch-package-items="fetchStudentPackages"
          @send-package="toggleModal($event, 'send-package')"
          @change-package="toggleModal($event, 'change-package')"
          @remove-package="toggleModal($event, 'remove-package')"
        />
      </template>
    </CollapseContent>
    <CollapseContent
      v-if="packageItems.expirePackages.length"
      with-chevron
      title="Expired Package"
    >
      <template #collapse-content>
        <StudentPackageItem
          :package-items="packageItems.expirePackages"
          @fetch-package-items="fetchStudentPackages"
          @send-package="toggleModal($event, 'send-package')"
          @change-package="toggleModal($event, 'change-package')"
          @remove-package="toggleModal($event, 'remove-package')"
        />
      </template>
    </CollapseContent>
  </div>
</template>
