<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useHead } from '@vueuse/head'
import useFormPackageInfo from '/@src/composable/package/use-form-package-info'
import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Package Management'

useHead({
  title: 'Whitehouse Group Package',
})

const {
  // state
  formPackageInfo,
  featureGroups,
  moocCourses,
  fmcPackages,
  curriculums,
  products,
  // computed
  disabledDone,
  // methods
  savePackage,
} = useFormPackageInfo()

const { y } = useWindowScroll()
const isStuck = computed(() => {
  return y.value > 30
})
</script>

<template>
  <div class="page-content-inner">
    <!-- create group package -->
    <div class="form-layout">
      <div class="form-outer">
        <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
          <div class="form-header-inner">
            <div class="left"><h3>Create Package</h3></div>
            <div class="right">
              <div class="buttons">
                <V-Button
                  :to="{ name: 'product-package' }"
                  icon="lnir lnir-arrow-left rem-100"
                  dark-outlined
                  light
                >
                  Back
                </V-Button>
                <V-Button
                  icon="lnir lnir-checkmark rem-100"
                  color="primary"
                  raised
                  :disabled="disabledDone"
                  @click="savePackage"
                >
                  Done
                </V-Button>
              </div>
            </div>
          </div>
        </div>
        <div class="form-body">
          <FormPackageInfo
            :form-package-info="formPackageInfo"
            :feature-groups="featureGroups"
            :mooc-courses="moocCourses"
            :fmc-packages="fmcPackages"
            :curriculums="curriculums"
            :products="products"
          />
        </div>
      </div>
    </div>
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
