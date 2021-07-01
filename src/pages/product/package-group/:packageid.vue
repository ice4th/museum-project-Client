<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import useViewPackageGroup from '/@src/composable/package/use-view-package-group'

const route = useRoute()
const showUpdate = ref(false)
const { addonPackages, isLoading, updatePackage, displayPackageNameById } =
  useViewPackageGroup()
const { y } = useWindowScroll()
const isStuck = computed(() => {
  return y.value > 30
})
</script>
<template>
  <div class="page-content-inner">
    <!-- create group package -->
    <div class="form-layout is-stacked">
      <V-Loader size="small" lighter grey translucent :active="isLoading">
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
                <div v-if="showUpdate" class="buttons">
                  <V-Button
                    icon="lnir lnir-arrow-left rem-100"
                    light
                    dark-outlined
                    :to="{ name: 'product-package-group' }"
                  >
                    Cancel
                  </V-Button>
                  <V-Button color="primary" raised @click="updatePackage">
                    Update
                  </V-Button>
                </div>
                <div v-else class="buttons">
                  <V-Button color="primary" raised @click="showUpdate = true">
                    Edit
                  </V-Button>
                </div>
              </div>
            </div>
          </div>
          <div class="form-body">
            <div v-show="addonPackages.length" class="form-section is-grey">
              <V-Block
                v-for="addon in addonPackages"
                :key="`show-addon-${addon.idx}`"
                :title="addon.isMainPackage ? 'Main Package' : 'Addon Package'"
                :subtitle="`(id: ${addon.packageId}) ${displayPackageNameById(
                  addon.packageId
                )}`"
                center
              >
                <template #icon>
                  <strong>{{ addon.idx }}</strong>
                </template>
                <template #action>
                  <V-Button v-if="addon.isMainPackage" elevated>Edit</V-Button>
                  <V-Button v-else elevated>Edit</V-Button>
                  <V-Button
                    v-if="!addon.isMainPackage"
                    color="danger"
                    elevated
                    class="ml-3"
                    @click="removePackage(addon.idx)"
                    >Remove</V-Button
                  >
                </template>
              </V-Block>
              <!-- <div class="p-3 right">
                <V-Button @click="toggleShowAddonPackageSection"
                  >Add addon package</V-Button
                >
              </div> -->
            </div>

            <!-- Main package section -->
            <!-- <div v-if="showMainPackageSection" class="form-fieldset">
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
                <V-Button color="primary" class="ml-3" @click="addMainPackage"
                  >Add Main Package</V-Button
                >
              </div>
            </div> -->

            <!-- <AddonPackageForm
              v-if="showAddonSection"
              :packages="packages"
              :all-group-packages="dependOnPackageList"
              :current-addon-package="currentAddonPackage"
              @add="addAddonPackage"
              @cancel="toggleShowAddonPackageSection"
            /> -->
          </div>
        </div>
      </V-Loader>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../scss/abstracts/_variables.scss';
@import '../../../scss/abstracts/_mixins.scss';
@import '../../../scss/pages/generic/_forms.scss';
.form-fieldset {
  max-width: 540px;
}
.button-submit {
  text-align: end;
}
</style>
