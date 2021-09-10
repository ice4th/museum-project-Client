<script setup lang="ts">
// PackageGroupForm Component

import type { PropType } from 'vue'
import { defineProps, ref } from 'vue'
import type { IUpdateAddonPackage } from '/@src/types/interfaces/package.interface'

const props = defineProps({
  title: {
    type: String,
    default: 'Create Package Group',
  },
  packageGroup: {
    type: Object as PropType<IUpdateAddonPackage[]>,
    default: undefined,
  },
})
const showMainPackageSection = ref(true)
const showAddonSection = ref(false)
const mainPackage = ref<IUpdateAddonPackage | undefined>(undefined)
const packageGroupInternal = ref<IUpdateAddonPackage[]>(
  props.packageGroup || []
)
const emit = defineEmits(['create', 'update-main-package'])
const isMainPackage = (packageId: number) => {
  return mainPackage.value?.packageId === packageId
}
const create = () => {
  //TODO
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

const swapOrderIndex = () => {
  modelValue.value = modelValue.value.map((addon, index) => {
    return { ...addon, idx: index + 1 }
  })
}
</script>

<template>
  <FormTemplate :title="title">
    <template #buttons>
      <V-Button icon="lnir lnir-arrow-left rem-100" light dark-outlined>
        Cancel
      </V-Button>
      <V-Button color="primary" raised @click="create"> Create </V-Button>
    </template>

    <div class="form-section is-grey">
      <V-Card v-for="addon in packageGroupInternal" :key="addon.packageId">
        <V-Block
          :title="`packageId: ${addon.packageId}`"
          :subtitle="
            isMainPackage(addon.packageId) ? 'Main Package' : 'Addon Package'
          "
        >
          {{ addon }}
        </V-Block>
      </V-Card>

      <div class="p-3 right">
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
      @add="addNewSubPackage"
      @cancel="showAddonSection = false"
    />
    <!-- @add="addAddonPackage"
      @cancel="toggleShowAddonPackageSection" -->
  </FormTemplate>
</template>
