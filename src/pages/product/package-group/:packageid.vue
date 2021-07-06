<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, onBeforeUpdate, ref } from 'vue'
import { useRoute } from 'vue-router'
import useCreatePackage from '/@src/composable/package/use-create-package'
import useViewPackageGroup from '/@src/composable/package/use-view-package-group'

const route = useRoute()
const showUpdate = ref(false)
const showConfirmRemovePopup = ref(false)

const {
  packages,
  addMainPackage,
  addAddonPackage,
  addonPackages,
  currentAddonPackage,
  dependOnPackageList,
  displayPackageNameById,
  displayPackageImageById,
  toggleShowAddonPackageSection,
  toggleShowMainPackageSection,
  showMainPackageSection,
  showAddonSection,
  mainPackage,
  generateTicket,
} = useCreatePackage()
const {
  addonPackages: rawAddonPackages,
  isLoading,
  updatePackage,
  removeAddonPackage,
} = useViewPackageGroup()
onBeforeUpdate(() => {
  showMainPackageSection.value = false
  addonPackages.value = rawAddonPackages.value
  dependOnPackageList.value = packages.value.filter((pk) =>
    addonPackages.value.some((apk) => apk.packageId === pk.id)
  )
  const mainPk = addonPackages.value.find((pk) => pk.type === 'main')
  if (mainPk) {
    generateTicket.value = mainPk.generateTicket
    mainPackage.value = mainPk.packageId
  }
  console.log(addonPackages.value, rawAddonPackages.value)
})
const remove = async (packageId: number) => {
  showConfirmRemovePopup.value = true
  // await removeAddonPackage(packageId)
}
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
    <div class="form-layout is-stacked">
      <V-Loader size="small" lighter grey translucent :active="isLoading">
        <div class="form-outer">
          <div
            :class="[isStuck && 'is-stuck']"
            class="form-header stuck-header"
          >
            <div class="form-header-inner">
              <div class="left">
                <h3>View/Edit Package Group</h3>
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
                  <V-Button
                    color="primary"
                    raised
                    @click="updatePackage(addonPackages)"
                  >
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
            <div v-if="addonPackages.length" class="form-section is-grey">
              <VueDraggable
                v-model="addonPackages"
                :disabled="!showUpdate"
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
                      addon.isMainPackage ? 'Main Package' : 'Addon Package'
                    "
                    class="package-row-drag"
                  >
                    <template #action>
                      <V-IconBox
                        v-if="addon.isMainPackage"
                        size="small"
                        color="primary"
                        rounded
                        class="mr-3"
                      >
                        <i class="iconify" data-icon="feather:flag"></i>
                      </V-IconBox>
                      <template v-if="showUpdate">
                        <V-Button
                          v-if="addon.isMainPackage"
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
                          v-if="!addon.isMainPackage"
                          color="danger"
                          elevated
                          class="ml-3"
                          @clik="remove(addon.packageInfo.id)"
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
                        :title="displayPackageNameById(addon.dependonPackageId)"
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
              <div v-if="showUpdate" class="p-3 right">
                <V-Button @click="toggleShowAddonPackageSection"
                  >Add addon package</V-Button
                >
              </div>
            </div>

            <!-- Main package section -->
            <div v-if="showMainPackageSection" class="form-fieldset">
              <div class="fieldset-heading">
                <h4>Main Package</h4>
                <p>Select main package</p>
              </div>
              <div class="columns is-multiline">
                <div class="column is-12">
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
.package-row-drag {
  cursor: pointer;
  margin-bottom: 1rem;
  .package-detail {
    display: flex;
    align-items: center;
  }
}
</style>
