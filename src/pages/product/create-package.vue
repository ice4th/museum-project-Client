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
  mainPackage,
  generateTicket,
  addonPackage,
  packages,
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
                  <V-Button color="primary" raised> Add </V-Button>
                </div>
              </div>
            </div>
          </div>
          <div class="form-body">
            <div class="form-section">
              <div class="form-section-inner">
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
                          :value="1"
                          label="Yes"
                          name="outlined_squared_radio"
                          square
                        />

                        <V-Radio
                          v-model="generateTicket"
                          :value="0"
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

            <div class="form-section is-grey">
              <div class="form-section-inner">
                <!-- select addon package row -->
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Addon Package</label>
                  </div>
                  <div class="field-body">
                    <V-Field>
                      <V-Control>
                        <Multiselect
                          v-model="addonPackage"
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

                    <V-Field>
                      <V-Control>
                        <V-SwitchBlock
                          v-model="showDependOnSelector"
                          label="Package have depend on"
                          color="primary"
                        />
                      </V-Control>
                    </V-Field>
                  </div>
                </div>

                <!-- depend on package and ticket used row -->
                <div v-show="showDependOnSelector" class="columns is-multiline">
                  <div class="column is-6">
                    <V-Field>
                      <label>Depend on package</label>
                      <V-Control>
                        <Multiselect
                          v-model="addonPackage"
                          placeholder="select depend on package"
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
                  <div class="column is-6">
                    <V-Field>
                      <label>Ticket used</label>
                      <V-Control icon="feather:hash">
                        <input
                          type="number"
                          class="input"
                          placeholder=""
                          autocomplete="family-name"
                        />
                      </V-Control>
                    </V-Field>
                  </div>
                </div>
              </div>
            </div>
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
