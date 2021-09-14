<script setup lang="ts">
// PackageGroupForm Component
import type { PropType } from 'vue'
import { watch, onBeforeMount, defineProps, ref } from 'vue'
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
})
const showMainPackageSection = ref(true)
const showAddonSection = ref(false)
const mainPackage = ref<IUpdateAddonPackage | undefined>(undefined)
const packageGroupInternal = ref<IUpdateAddonPackage[]>([])
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
