<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { useHead } from '@vueuse/head'
import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
import useManagePackageGroup from '/@src/composable/package-groups/useManagePackageGroup'
import useFormPackageInfo from '/@src/composable/package/use-form-package-info'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { useRoute } from 'vue-router'

pageTitle.value = 'Package Group Management'

useHead({
  title: 'Whitehouse Group Package',
})
const route = useRoute()
const { fetchPackageInfo, packageGroupInfo } = useManagePackageGroup()

onBeforeMount(() => {
  const mainPackageId = route.params.packageid as string
  fetchPackageInfo(+mainPackageId)
})
</script>

<template>
  <div class="page-content-inner">
    <PackageGroupForm
      title="Edit Package Group"
      :package-group="packageGroupInfo"
    />
  </div>
</template>

<style lang="scss">
@import 'src/scss/abstracts/_variables.scss';
@import 'src/scss/abstracts/_mixins.scss';
@import 'src/scss/pages/generic/_forms.scss';
.button-submit {
  text-align: end;
}
.package-row-drag {
  cursor: pointer;
  margin-bottom: 1rem;
  .package-detail {
    display: flex;
    align-items: center;
  }
}
</style>
