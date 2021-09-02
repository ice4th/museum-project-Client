<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, onBeforeUpdate, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useManagePackageGroup from '/@src/composable/package/use-manage-package-group'
import useViewPackageGroup from '/@src/composable/package/use-view-package-group'

const route = useRoute()
const router = useRouter()
const showUpdate = ref(false)

const {
  packages,
  addMainPackage,
  addAddonPackage,
  addonPackages,
  currentAddonPackage,
  displayPackageNameById,
  displayPackageImageById,
  toggleShowAddonPackageSection,
  toggleShowMainPackageSection,
  showMainPackageSection,
  showAddonSection,
  mainPackageId,
  mainSelectedPackage,
  removePackage,
} = useManagePackageGroup()
const {
  mainPackage,
  addonPackages: rawAddonPackages,
  isLoading,
  updatePackage,
  isUpdating,
} = useViewPackageGroup()
onBeforeUpdate(() => {
  showMainPackageSection.value = false
  addonPackages.value = rawAddonPackages.value
  if (mainSelectedPackage) {
    mainSelectedPackage.value = mainPackage?.value
    mainPackageId.value = mainPackage?.value?.packageId || 0
  }
})
const { y } = useWindowScroll()
const isStuck = computed(() => {
  return y.value > 50
})

const swapOrderIndex = () => {
  addonPackages.value = addonPackages.value.map((addon, index) => {
    return { ...addon, idx: index + 1 }
  })
}
const reload = () => {
  router.go(0)
}
</script>
<template>
  <div class="page-content-inner">
    <!-- create group package -->
    <div class="form-layout">
      <V-Loader
        size="small"
        lighter
        grey
        translucent
        :active="isLoading || isUpdating"
      >
        <div class="form-outer">
          <div
            :class="[isStuck && 'is-stuck']"
            class="form-header stuck-header"
          >
            <div class="form-header-inner">
              <div class="left">
                <h3>Package Group Details</h3>
              </div>
              <div class="right">
                <div class="buttons">
                  <V-Button
                    icon="lnir lnir-arrow-left rem-100"
                    light
                    dark-outlined
                    :to="{ name: 'product-package-group' }"
                  >
                    Back
                  </V-Button>
                  <V-Button
                    icon="lnir lnir-pencil rem-100"
                    color="primary"
                    dark-outlined
                    :to="{
                      name: 'product-package-group-:packageid-edit',
                      params: { ...$route.params },
                    }"
                  >
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
                :disabled="true"
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
                          showUpdate &&
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
  </div>
</template>

<style lang="scss">
@import 'src/scss/abstracts/_variables.scss';
@import 'src/scss/abstracts/_mixins.scss';
@import 'src/scss/pages/generic/_forms.scss';
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
