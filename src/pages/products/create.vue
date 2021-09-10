<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@vueuse/head'

import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { useWindowScroll } from '@vueuse/core'
import useManageProduct from '/@src/composable/products/useManageProduct'

pageTitle.value = 'Create Product'

useHead({
  title: 'Whitehouse Product',
})
const { validate, submitCreateProduct } = useManageProduct()
const { y } = useWindowScroll()
const isStuck = computed(() => {
  return y.value > 50
})
</script>

<template>
  <div class="page-content-inner">
    <ProductForm :validate="validate" @create="submitCreateProduct" />
  </div>
</template>
<style lang="scss">
@import 'src/scss/abstracts/_variables.scss';
@import 'src/scss/abstracts/_mixins.scss';
@import 'src/scss/pages/generic/_forms.scss';
// .form-fieldset {
//   max-width: 800px;
// }
// .form-layout {
//   width: 100%;
//   max-width: 1200px;
// }
// .button-submit {
//   text-align: end;
// }
// .package-row-drag {
//   cursor: pointer;
//   margin-bottom: 1rem;
//   .package-detail {
//     display: flex;
//     align-items: center;
//   }
// }
</style>
