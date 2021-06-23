<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, reactive, ref } from 'vue'
import { useHead } from '@vueuse/head'
import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
import useCreatePackage from '/@src/composable/package/use-create-package'

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
  mainIdx,
  mainPackage,
  generateTicket,
  packages,
  addAddonPackage,
  showAddonSection,
  removePackage,
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
        <V-Tabs
          selected="package-group"
          :tabs="[
            { label: 'Package', value: 'package' },
            { label: 'Package Group', value: 'package-group' },
          ]"
        >
          <template #tab="{ activeValue }">
            <p v-if="activeValue === 'package'">Create normal package</p>
            <p v-else-if="activeValue === 'package-group'">
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
                      <V-Block
                        v-for="addon in addonPackages"
                        :key="`show-addon-${addon.idx}`"
                        :title="
                          addon.type === 'main'
                            ? 'Main Package'
                            : 'Addon Package'
                        "
                        :subtitle="`(id: ${
                          addon.packageId
                        }) ${displayPackageNameById(addon.packageId)}`"
                        center
                      >
                        <template #icon>
                          <strong>{{ addon.idx }}</strong>
                        </template>
                        <template
                          v-if="!(showMainPackageSection || showAddonSection)"
                          #action
                        >
                          <V-Button
                            v-if="addon.type === 'main'"
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
                            v-if="addon.type === 'addon'"
                            color="danger"
                            elevated
                            class="ml-3"
                            @click="removePackage(addon.idx)"
                            >Remove</V-Button
                          >
                        </template>
                      </V-Block>
                      <div class="p-3 right">
                        <V-Button @click="toggleShowAddonPackageSection"
                          >Add addon package</V-Button
                        >
                      </div>
                    </div>

                    <!-- Main package section -->
                    <div v-if="showMainPackageSection" class="form-fieldset">
                      <div class="fieldset-heading">
                        <h4>Main Package</h4>
                        <p>Select main package and order in package group</p>
                      </div>
                      <div class="columns is-multiline">
                        <div class="column is-3">
                          <V-Field>
                            <label>Order Index</label>
                            <V-Control icon="feather:layers">
                              <input
                                v-model="mainIdx"
                                type="text"
                                class="input"
                                placeholder=""
                                autocomplete="organization"
                              />
                            </V-Control>
                          </V-Field>
                        </div>
                        <div class="column is-9">
                          <V-Field>
                            <label>Main Package</label>
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
                        <div class="column is-12">
                          <V-Field>
                            <label>Generate Ticket</label>
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
                      <div class="button-submit">
                        <V-Button @click="toggleShowMainPackageSection"
                          >Cancel</V-Button
                        >
                        <V-Button
                          color="primary"
                          class="ml-3"
                          @click="addMainPackage"
                          >Add Main Package</V-Button
                        >
                      </div>
                    </div>

                    <AddonPackageForm
                      v-if="showAddonSection"
                      :packages="packages"
                      :all-group-packages="dependOnPackageList"
                      :current-addon-package="currentAddonPackage"
                      @add="addAddonPackage"
                      @cancel="toggleShowAddonPackageSection"
                    />
                  </div>
                </div>
              </V-Loader>
            </p>
          </template>
        </V-Tabs>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/abstracts/_mixins.scss';
@import '../../scss/pages/generic/_forms.scss';
.form-fieldset {
  max-width: 540px;
}
.button-submit {
  text-align: end;
}
</style>
