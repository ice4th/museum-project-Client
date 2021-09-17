<script setup lang="ts">
// PackageGroupForm Component
import type { PropType } from 'vue'
import { computed, watch, onBeforeMount, defineProps, ref } from 'vue'
import type {
  IPackageGroupInfo,
  IUpdateAddonPackage,
} from '/@src/types/interfaces/package.interface'

const props = defineProps({
  title: {
    type: String,
    default: 'Create Package Group',
  },
  packageGroup: {
    type: Object as PropType<IPackageGroupInfo[]>,
    default: undefined,
  },
  mode: {
    type: String as PropType<'create' | 'edit' | 'view'>,
    default: 'create',
  },
})
const readonly = computed(() => props.mode === 'view')
const isEdit = computed(() => props.mode === 'edit')
const showMainPackageSection = ref(true)
const showAddonSection = ref(false)
const mainPackage = ref<IUpdateAddonPackage | undefined>(undefined)
const currentAddonPackage = ref<IUpdateAddonPackage | undefined>(undefined)
const packageGroupInternal = ref<IUpdateAddonPackage[]>([])
const emit = defineEmits(['create', 'update', 'cancel', 'update-main-package'])
const isMainPackage = (packageId: number) => {
  return mainPackage.value?.packageId === packageId
}

const displayPackageName = (packageId: number): string => {
  return (
    packageGroupInternal.value.find((pk) => pk.packageId === packageId)
      ?.packageName || `${packageId}`
  )
}
const create = () => {
  if (isEdit.value) {
    emit('update', {
      mainPackage: mainPackage.value,
      addonPackages: packageGroupInternal.value,
    })
    return
  }
  emit('create', {
    mainPackage: mainPackage.value,
    addonPackages: packageGroupInternal.value,
  })
}
// Access props with `props.myCustomObject` and `props.myStringArray`
const updateMainPackage = (mainpk: IUpdateAddonPackage) => {
  mainPackage.value = mainpk
  if (!mainpk.idx) {
    packageGroupInternal.value.push({
      ...mainPackage.value,
      idx: packageGroupInternal.value.length + 1,
    })
  } else {
    const includedPackageIdIndex = packageGroupInternal.value.findIndex(
      (pk) => pk.packageId === mainpk.packageId
    )
    if (includedPackageIdIndex >= 0) {
      packageGroupInternal.value.splice(includedPackageIdIndex, 1)
    }
    const index = packageGroupInternal.value.findIndex(
      (pk) => pk.idx === mainpk.idx
    )
    packageGroupInternal.value[index] = mainpk
  }
  showMainPackageSection.value = false
}

const addNewSubPackage = (subPackage: IUpdateAddonPackage) => {
  packageGroupInternal.value.push({
    ...subPackage,
    idx: packageGroupInternal.value.length + 1,
  })
  showAddonSection.value = false
}

const editSubPackage = (subPackage: IUpdateAddonPackage) => {
  const index = packageGroupInternal.value.findIndex(
    (pk) => pk.idx === subPackage.idx
  )
  packageGroupInternal.value[index] = subPackage
  currentAddonPackage.value = undefined
  showAddonSection.value = false
}

const editPackage = (addon: IUpdateAddonPackage) => {
  if (addon.packageId === mainPackage.value?.packageId) {
    showMainPackageSection.value = true
  } else {
    currentAddonPackage.value = addon
    showAddonSection.value = true
  }
}

const removePackage = (addon: IUpdateAddonPackage) => {
  const index = packageGroupInternal.value.findIndex(
    (pk) => pk.packageId === addon.packageId
  )
  packageGroupInternal.value.splice(index, 1)
  packageGroupInternal.value.map((pk) => {
    if (pk.dependonPackageId === addon.packageId) {
      pk.dependonPackageId = pk.dependonTicketUse = undefined
    }
    return pk
  })
  swapOrderIndex()
}

const swapOrderIndex = () => {
  packageGroupInternal.value = packageGroupInternal.value.map(
    (addon, index) => {
      return { ...addon, idx: index + 1 }
    }
  )
}
watch(
  () => props.packageGroup,
  () => {
    const mainPk = props.packageGroup?.find((pk) => pk.isMainPackage)
    packageGroupInternal.value =
      props.packageGroup?.map<IUpdateAddonPackage[]>((pk) => {
        return {
          packageGroupId: pk.id,
          packageId: pk.packageId,
          generateTicket: pk.generateTicket,
          idx: pk.idx,
          dependonPackageId: pk.dependonPackageId,
          dependonTicketUse: pk.dependonTicketUse,
          packageName: pk.packageInfo.packageName,
          packageTicket: pk.packageInfo.ticket,
        }
      }) || []
    if (mainPk) {
      mainPackage.value = {
        packageGroupId: mainPk.id,
        packageId: mainPk.packageId,
        generateTicket: mainPk.generateTicket,
        idx: mainPk.idx,
        dependonPackageId: mainPk.dependonPackageId,
        dependonTicketUse: mainPk.dependonTicketUse,
        packageName: mainPk.packageInfo.packageName,
        packageTicket: mainPk.packageInfo.ticket,
      }
      showMainPackageSection.value = false
    }
  }
)
</script>

<template>
  <FormTemplate :title="title">
    <template #buttons>
      <V-Button
        v-if="!readonly"
        icon="lnir lnir-arrow-left rem-100"
        light
        dark-outlined
        @click="emit('cancel')"
      >
        Cancel
      </V-Button>
      <V-Button
        v-if="mode === 'create'"
        color="primary"
        :disabled="packageGroupInternal.length < 2"
        raised
        @click="create"
      >
        Create
      </V-Button>
      <V-Button
        v-if="isEdit"
        color="primary"
        :disabled="packageGroupInternal.length < 2"
        raised
        @click="create"
      >
        Update
      </V-Button>
      <V-Button
        v-if="readonly"
        to="#edit"
        color="primary"
        raised
        @click="create"
      >
        Edit
      </V-Button>
    </template>

    <div v-show="!showMainPackageSection" class="form-section is-grey">
      <VueDraggable
        v-model="packageGroupInternal"
        item-key="packageId"
        class="list-group"
        ghost-class="ghost"
        :disabled="showMainPackageSection || showAddonSection"
        @change="swapOrderIndex"
      >
        <template #item="{ element: addon }">
          <V-Card class="package-row-drag">
            <V-Block
              :title="`[id: ${addon.packageId}] ${
                addon.packageName || addon.packageId
              }`"
            >
              <template #action>
                <div class="mx-3">
                  <V-Tag
                    :color="isMainPackage(addon.packageId) ? 'danger' : 'blue'"
                    :label="
                      isMainPackage(addon.packageId)
                        ? 'Main Package'
                        : 'Addon Package'
                    "
                    curved
                  />
                </div>
                <V-Dropdown
                  v-if="isEdit"
                  icon="feather:more-vertical"
                  color="primary"
                  spaced
                  right
                >
                  <template #content>
                    <a
                      role="menuitem"
                      class="dropdown-item is-media"
                      @click="editPackage(addon)"
                    >
                      <div class="icon">
                        <i aria-hidden="true" class="lnil lnil-pencil"></i>
                      </div>
                      <div class="meta">
                        <span>Edit</span>
                        <span>Download this file</span>
                      </div>
                    </a>
                    <a
                      v-if="addon.packageId !== mainPackage.packageId"
                      role="menuitem"
                      class="dropdown-item is-media"
                      @click="removePackage(addon)"
                    >
                      <div class="icon">
                        <i aria-hidden="true" class="lnil lnil-trash"></i>
                      </div>
                      <div class="meta">
                        <span>Remove</span>
                        <span>Copy public url</span>
                      </div>
                    </a>
                  </template>
                </V-Dropdown>
              </template>
            </V-Block>

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
                :title="`(id: ${addon.packageId}) ${displayPackageName(
                  addon.dependonPackageId
                )}`"
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
          </V-Card>
        </template>
      </VueDraggable>
      <!-- <V-Card v-for="addon in packageGroupInternal" :key="addon.packageId">
        <V-Block
          :title="`packageId: ${addon.packageId}`"
          :subtitle="
            isMainPackage(addon.packageId) ? 'Main Package' : 'Addon Package'
          "
        >
          {{ addon }}
        </V-Block>
      </V-Card> -->

      <div v-if="isEdit" class="p-3 right">
        <V-Button
          v-if="!showMainPackageSection && !showAddonSection"
          @click="showAddonSection = true"
          >Add addon package</V-Button
        >
      </div>
    </div>
    <!-- Main package section -->
    <MainPackageForm
      v-if="showMainPackageSection"
      :main-package="mainPackage"
      @on-update="updateMainPackage"
    />

    <AddonPackageForm
      v-if="showAddonSection && mainPackage"
      :group-packages="packageGroupInternal"
      :current-addon-package="currentAddonPackage"
      @add="addNewSubPackage"
      @edit="editSubPackage"
      @cancel="showAddonSection = false"
    />
    <!-- @add="addAddonPackage"
      @cancel="toggleShowAddonPackageSection" -->
  </FormTemplate>
</template>

<style lang="scss" scoped>
.package-row-drag {
  cursor: pointer;
  margin-bottom: 1rem;
  .package-detail {
    display: flex;
    align-items: center;
  }
}
</style>
