<script setup lang="ts">
import { defineProps, onBeforeMount, onMounted, ref } from 'vue'
import type { PropType } from 'vue'
import type { IStudentPackageItems } from '/@src/types/interfaces/package-item.interface'
import _ from 'lodash'
import { useRoute } from 'vue-router'

const props = defineProps({
  inactivePackages: {
    type: Array as PropType<IStudentPackageItems[]>,
    default: [],
  },
  activePackages: {
    type: Array as PropType<IStudentPackageItems[]>,
    default: [],
  },
  expirePackages: {
    type: Array as PropType<IStudentPackageItems[]>,
    default: [],
  },
  validation: {
    type: Object,
    default: {},
  },
})
const internalActivePackage = ref<IStudentPackageItems[]>(props.activePackages)
const internalInactivePackage = ref<IStudentPackageItems[]>(
  props.inactivePackages
)
const internalExpirePackage = ref<IStudentPackageItems[]>(props.expirePackages)

onBeforeMount(() => {})
</script>
<template>
  <CollapseContent
    with-chevron
    title="Inactive Package"
    v-if="inactivePackages.length"
  >
    <template #collapse-content>
      <PackageItemDetail :package-items="inactivePackages" can-activate />
    </template>
  </CollapseContent>
  <CollapseContent
    with-chevron
    title="Active Package"
    v-if="activePackages.length"
  >
    <template #collapse-content>
      <PackageItemDetail :package-items="activePackages" />
    </template>
  </CollapseContent>
  <CollapseContent
    with-chevron
    title="Expired Package"
    v-if="expirePackages.length"
  >
    <template #collapse-content>
      <PackageItemDetail :package-items="expirePackages" />
    </template>
  </CollapseContent>
</template>
