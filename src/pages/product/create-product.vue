<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@vueuse/head'

import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { useWindowScroll } from '@vueuse/core'

pageTitle.value = 'Create Product'

useHead({
  title: 'Whitehouse Product',
})
const { y } = useWindowScroll()
const isStuck = computed(() => {
  return y.value > 50
})
</script>

<template>
  <div class="page-content-inner">
    <ProductForm />
    <!-- <div>Create Product</div> -->
    <!-- <div class="form-layout">
      <div class="form-outer">
        <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
          <div class="form-header-inner">
            <div class="left">
              <h3>View/Edit Package Group</h3>
            </div>
            <div class="right">
              <div class="buttons">
                <V-Button
                  icon="lnir lnir-arrow-left rem-100"
                  light
                  dark-outlined
                >
                  Cancel
                </V-Button>
                <V-Button color="primary" raised> Create </V-Button>
              </div>
            </div>
          </div>
        </div>
        <div class="form-body">
          <ProductForm />
        </div>
      </div>
    </div> -->
  </div>
</template>
<style lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/abstracts/_mixins.scss';
@import '../../scss/pages/generic/_forms.scss';
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
