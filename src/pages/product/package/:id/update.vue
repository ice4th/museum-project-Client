<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useHead } from '@vueuse/head'
import { pageTitle } from '/@src/state/sidebarLayoutState'

import useFormPackageInfo from '/@src/composable/package/use-form-package-info'

pageTitle.value = 'Update Package'

useHead({
  title: 'Whitehouse Update Package',
})

const {
  // state
  formPackageInfo,
  featureGroups,
  moocCourses,
  fmcPackages,
  curriculums,
  products,
  loadingOptions,
  loadingPackage,
  notFoundPackage,
  // computed
  disabledDone,
  // methods
  savePackage,
} = useFormPackageInfo()

/**
 * Methods
 */
const { y } = useWindowScroll()
const isStuck = computed(() => {
  return y.value > 30
})
</script>

<template>
  <div v-if="notFoundPackage">
    <div class="error-container">
      <div class="error-wrapper">
        <div class="error-inner has-text-centered">
          <div class="bg-number">404</div>
          <img
            src="/@src/assets/illustrations/placeholders/error-1.svg"
            alt=""
          />
          <h3>We couldn't find that package</h3>
          <p>
            Looks like we couldn't find that package. Please try again or
            contact an administrator if the problem persists.
          </p>
          <div class="button-wrap">
            <V-Button
              color="primary"
              elevated
              :to="{ name: 'product-package' }"
            >
              Take me Back
            </V-Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="page-content-inner">
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
          <AddPackageForm
            :create-package-form="formPackageInfo"
            :feature-groups="featureGroups"
            :mooc-courses="moocCourses"
            :fmc-packages="fmcPackages"
            :curriculums="curriculums"
            :products="products"
            :loading-options="loadingOptions"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../../scss/abstracts/_variables.scss';
@import '../../../../scss/abstracts/_mixins.scss';
@import '../../../../scss/pages/generic/_forms.scss';
@import '../../../../scss/pages/generic/_utility.scss';

* {
  box-sizing: border-box;
}
</style>
