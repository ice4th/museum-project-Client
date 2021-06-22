<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, reactive, ref } from 'vue'
import { useHead } from '@vueuse/head'
// import { popovers } from '/@src/data/users/userPopovers'
import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
import useCreatePackage from '/@src/composable/package/use-create-package'

useHead({
  title: 'Whitehouse Group Package',
})

const showDependOnSelector = ref(false)
const {
  addonPackages,
  createPackageGroup,
  dependOnPackageList,
  displayPackageNameById,
  displayPackageImageById,
  mainIdx,
  mainPackage,
  generateTicket,
  packages,
  addAddonPackage,
  showAddonSection,
  showMainPackageSection,
  toggleShowAddonPackageSection,
  toggleShowMainPackageSection,
} = useCreatePackage()

const { y } = useWindowScroll()
const isStuck = computed(() => {
  return y.value > 30
})
</script>

<template>
  <div>
    <div class="page-title has-text-centered">
      <!-- Sidebar Trigger -->
      <div
        class="vuero-hamburger nav-trigger push-resize"
        @click="toggleSidebar('product')"
      >
        <span class="menu-toggle has-chevron">
          <span
            :class="[activeSidebar !== 'none' && 'active']"
            class="icon-box-toggle"
          >
            <span class="rotate">
              <i class="icon-line-top"></i>
              <i class="icon-line-center"></i>
              <i class="icon-line-bottom"></i>
            </span>
          </span>
        </span>
      </div>

      <div class="title-wrap">
        <h1 class="title is-4">Package Management</h1>
      </div>

      <!-- <Toolbar /> -->
    </div>

    <div class="page-content-inner">
      <!-- create group package -->
      <div class="form-layout is-stacked">
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
                  <V-Button color="primary" raised @click="createPackageGroup">
                    Create
                  </V-Button>
                </div>
              </div>
            </div>
          </div>
          <div class="form-body">
            <div v-show="addonPackages.length" class="form-section is-grey">
              <V-Block
                title="Main Package"
                :subtitle="displayPackageNameById(mainPackage)"
                center
              >
                <template #icon>
                  <strong>{{ mainIdx }}</strong>
                  <!-- <p>Main Package: {{ displayPackageNameById(mainPackage) }}</p> -->
                </template>
                <template #action>
                  <V-Button
                    color="primary"
                    elevated
                    @click="toggleShowMainPackageSection"
                    >Edit</V-Button
                  >
                </template>
              </V-Block>

              <template
                v-for="addon in addonPackages"
                :key="`show-addon-${addon.idx}`"
              >
                <template v-if="addon.packageId !== mainPackage">
                  <V-Block
                    title="Addon Package"
                    :subtitle="displayPackageNameById(addon.packageId)"
                    center
                  >
                    <template #icon>
                      <strong>{{ addon.idx }}</strong>
                      <!-- <p>Main Package: {{ displayPackageNameById(mainPackage) }}</p> -->
                    </template>
                    <template #action>
                      <V-Button
                        color="primary"
                        elevated
                        @click="toggleShowAddonPackageSection"
                        >Edit</V-Button
                      >
                    </template>
                  </V-Block>
                </template>
              </template>
              <div class="p-3 center">
                <V-Button @click="toggleShowAddonPackageSection"
                  >Add addon package</V-Button
                >
              </div>
            </div>

            <!-- Main package section -->
            <div v-if="showMainPackageSection" class="form-section">
              <div class="form-section-inner">
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Order Index</label>
                  </div>
                  <div class="field-body">
                    <V-Field>
                      <V-Control>
                        <input
                          v-model="mainIdx"
                          type="text"
                          class="input"
                          placeholder="order index"
                        />
                      </V-Control>
                    </V-Field>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Main Package</label>
                  </div>
                  <div class="field-body">
                    <V-Field>
                      <V-Control>
                        <Multiselect
                          v-model="mainPackage"
                          placeholder="Select a main package"
                          :options="packages"
                          :searchable="true"
                          track-by="packageName"
                          value-prop="id"
                        >
                          <template #singlelabel="{ value }">
                            <div class="multiselect-single-label">
                              ({{ value.id }}) {{ value.packageName }}
                            </div>
                          </template>
                          <template #option="{ option }">
                            <span class="select-option-text">
                              ({{ option.id }}) {{ option.packageName }}
                            </span>
                          </template>
                        </Multiselect>
                      </V-Control>
                    </V-Field>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Generate Ticket</label>
                  </div>
                  <div class="field-body">
                    <V-Field>
                      <V-Control>
                        <V-Radio
                          v-model="generateTicket"
                          value="1"
                          label="Yes"
                          name="outlined_squared_radio"
                          color="success"
                          square
                        />

                        <V-Radio
                          v-model="generateTicket"
                          value="0"
                          label="No"
                          name="outlined_squared_radio"
                          color="primary"
                          square
                        />
                      </V-Control>
                    </V-Field>
                  </div>
                </div>
              </div>
            </div>

            <AddonPackageForm
              v-if="showAddonSection"
              :packages="packages"
              :all-group-packages="dependOnPackageList"
              @add="addAddonPackage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/abstracts/_mixins.scss';
@import '../../scss/pages/generic/_forms.scss';
</style>
