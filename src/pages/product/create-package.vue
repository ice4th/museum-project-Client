<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, reactive, ref } from 'vue'
import { useHead } from '@vueuse/head'
import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
import useCreatePackage from '/@src/composable/package/use-create-package'
import useFormPackageInfo from '/@src/composable/package/use-form-package-info'
import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Package Management'

useHead({
  title: 'Whitehouse Group Package',
})

const showDependOnSelector = ref(false)
const {
  addonPackages,
  addMainPackage,
  currentAddonPackage,
  createPackageGroup,
  dependOnPackageList,
  displayPackageNameById,
  displayPackageImageById,
  isLoadingPackages,
  mainPackageId,
  mainSelectedPackage,
  packages,
  addAddonPackage,
  showAddonSection,
  removePackage,
  showMainPackageSection,
  toggleShowAddonPackageSection,
  toggleShowMainPackageSection,
} = useCreatePackage()

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

const swapOrderIndex = () => {
  addonPackages.value = addonPackages.value.map((addon, index) => {
    return { ...addon, idx: index + 1 }
  })
}
</script>

<template>
  <div class="page-content-inner">
    <!-- create group package -->
    <div class="form-layout">
      <V-Tabs
        selected="package"
        :tabs="[
          { label: 'Package', value: 'package' },
          { label: 'Package Group', value: 'package-group' },
        ]"
      >
        <template #tab="{ activeValue }">
          <div v-if="activeValue === 'package'">
            <V-Loader
              size="small"
              lighter
              grey
              translucent
              :active="isLoadingPackages"
            >
              <div class="form-outer">
                <div
                  :class="[isStuck && 'is-stuck']"
                  class="form-header stuck-header"
                >
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
                  />
                </div>
              </div>
            </V-Loader>
          </div>
          <div v-else-if="activeValue === 'package-group'">
            <V-Loader
              size="small"
              lighter
              grey
              translucent
              :active="isLoadingPackages"
            >
              <div class="form-outer">
                <div
                  :class="[isStuck && 'is-stuck']"
                  class="form-header stuck-header"
                >
                  <div class="form-header-inner">
                    <div class="left">
                      <h3>Create Package Group</h3>
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
                        <V-Button
                          color="primary"
                          raised
                          @click="createPackageGroup"
                        >
                          Create
                        </V-Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-body">
                  <div
                    v-show="addonPackages.length && !showMainPackageSection"
                    class="form-section is-grey"
                  >
                    <VueDraggable
                      v-model="addonPackages"
                      :disabled="showMainPackageSection || showAddonSection"
                      item-key="packageId"
                      class="list-group"
                      ghost-class="ghost"
                      @change="swapOrderIndex"
                    >
                      <template #item="{ element: addon }">
                        <V-CardAction
                          :avatar="displayPackageImageById(addon.packageId)"
                          :title="`[idx: ${addon.idx}] (id: ${
                            addon.packageId
                          }) ${displayPackageNameById(addon.packageId)}`"
                          :subtitle="
                            addon.packageId === mainPackageId
                              ? 'Main Package'
                              : 'Addon Package'
                          "
                          class="package-row-drag"
                        >
                          <template #action>
                            <V-IconBox
                              v-if="addon.packageId === mainPackageId"
                              size="small"
                              color="primary"
                              rounded
                              class="mr-3"
                            >
                              <i class="iconify" data-icon="feather:flag"></i>
                            </V-IconBox>
                            <template
                              v-if="
                                !(showMainPackageSection || showAddonSection)
                              "
                            >
                              <V-Button
                                v-if="addon.packageId === mainPackageId"
                                elevated
                                @click="toggleShowMainPackageSection"
                                >Edit</V-Button
                              >
                              <V-Button
                                v-else
                                elevated
                                @click="toggleShowAddonPackageSection(addon)"
                                >Edit</V-Button
                              >
                              <V-Button
                                v-if="addon.packageId !== mainPackageId"
                                color="danger"
                                elevated
                                class="ml-3"
                                @click="removePackage(addon.packageId)"
                                >Remove</V-Button
                              >
                            </template>
                          </template>
                          <div class="package-detail">
                            <V-Snack
                              v-if="addon.generateTicket === '1'"
                              title="Generate Ticket"
                              color="success"
                              white
                              solid
                              icon="feather:plus-circle"
                            >
                              <div></div>
                            </V-Snack>
                            <V-Snack
                              v-if="addon.generateTicket === '0'"
                              title="Not Generate Ticket"
                              color="danger"
                              white
                              solid
                              icon="feather:minus-circle"
                            >
                              <div></div>
                            </V-Snack>

                            <V-Snack
                              v-if="addon.dependonPackageId"
                              :title="
                                displayPackageNameById(addon.dependonPackageId)
                              "
                              color="warning"
                              white
                              solid
                              icon="feather:alert-triangle"
                              class="ml-3"
                            >
                              <!-- <i class="iconify" data-icon="feather:minus"></i> -->
                              <div></div>
                            </V-Snack>

                            <V-Snack
                              v-if="addon.dependonTicketUse"
                              :title="`Ticket Used: ${addon.dependonTicketUse}`"
                              color="success"
                              white
                              solid
                              icon="feather:hash"
                              class="ml-3"
                            >
                              <!-- <i class="iconify" data-icon="feather:hash"></i> -->
                              <div></div>
                            </V-Snack>
                          </div>
                        </V-CardAction>
                      </template>
                    </VueDraggable>
                    <div class="p-3 right">
                      <V-Button @click="toggleShowAddonPackageSection"
                        >Add addon package</V-Button
                      >
                    </div>
                  </div>

                  <!-- Main package section -->
                  <MainPackageForm
                    v-if="showMainPackageSection"
                    :main-package="mainSelectedPackage"
                    :packages="packages"
                    @on-update="addMainPackage"
                  />

                  <AddonPackageForm
                    v-if="showAddonSection"
                    :packages="packages"
                    :group-packages="addonPackages"
                    :current-addon-package="currentAddonPackage"
                    @add="addAddonPackage"
                    @cancel="toggleShowAddonPackageSection"
                  />
                </div>
              </div>
            </V-Loader>
          </div>
        </template>
      </V-Tabs>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/abstracts/_mixins.scss';
@import '../../scss/pages/generic/_forms.scss';
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
