<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useHead } from '@vueuse/head'
import { pageTitle } from '/@src/state/sidebarLayoutState'

import usePackageDetails from '/@src/composable/package/usePackageDetails'

pageTitle.value = 'Package Details'

useHead({
  title: 'Whitehouse Package Details',
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
  notFoundPackage,
  // logic
  editable,
  // computed
  disabledDone,
  // methods
  fetchProductsOption,
  fetchCurriculumsOption,
  fetchFindMyCoachesOption,
  fetchMoocCoursesOption,
  onPressDone,
} = usePackageDetails()

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
              :to="{ name: 'products-packages' }"
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
            <div class="left"><h3>Package Details</h3></div>
            <div class="right">
              <div class="buttons">
                <V-Button
                  :to="{ name: 'products-packages' }"
                  icon="lnir lnir-arrow-left rem-100"
                  class="custom-btn"
                  dark-outlined
                  light
                >
                  Back
                </V-Button>
                <V-Button
                  v-if="!editable"
                  icon="lnir lnir-pencil rem-100"
                  to="#edit"
                  color="primary"
                  >Edit</V-Button
                >
                <V-Button
                  v-else
                  icon="lnir lnir-checkmark rem-100"
                  color="primary"
                  raised
                  @click="onPressDone"
                  >Done</V-Button
                >
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
            :fetch-products-option="fetchProductsOption"
            :fetch-curriculums-option="fetchCurriculumsOption"
            :fetch-find-my-coaches-option="fetchFindMyCoachesOption"
            :fetch-mooc-courses-option="fetchMoocCoursesOption"
            :loading-options="loadingOptions"
            :readonly="!editable"
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
@import 'src/scss/pages/generic/_utility.scss';

* {
  box-sizing: border-box;
}

.is-stuck {
  top: 0 !important;
}
</style>
