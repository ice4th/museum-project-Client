<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, reactive, ref } from 'vue'
import { useHead } from '@vueuse/head'
import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
import useManagePackageGroup from '/@src/composable/package-groups/useManagePackageGroup'
import useFormPackageInfo from '/@src/composable/package/use-form-package-info'
import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Package Group Management'

useHead({
  title: 'Whitehouse Group Package',
})

const { createPackageGroup } = useManagePackageGroup()
</script>

<template>
  <div class="page-content-inner">
    <PackageGroupForm
      title="Create Package Group"
      @create="createPackageGroup"
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
