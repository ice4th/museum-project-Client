<script setup lang="ts">
// AddonPackageForm Component
import { computed, ref, watch } from 'vue'
import type { PropType } from 'vue'
import { GenerateTicket } from '/@src/types/enums/package.enum'
import type { IUpdateAddonPackage } from '/@src/types/interfaces/package.interface'
import type { PackageOption } from '/@src/types/interfaces/option.interface'
import useOptionApi from '/@src/composable/api/useOptionApi'

const props = defineProps({
  groupPackages: {
    type: Array as PropType<IUpdateAddonPackage[]>,
    default: () => [],
  },
  // currentAddonPackage: {
  //   type: Object as PropType<IUpdateAddonPackage>,
  //   default: undefined,
  // },
})
const emit = defineEmits({
  cancel: null,
  add: Object,
})

const { getPackages } = useOptionApi()

const addonPackage = ref<IUpdateAddonPackage>({
  idx: undefined,
  packageId: 0,
  generateTicket: GenerateTicket.GENERATE_TICKET,
})

// TODO: check ticket from depenon package depenonPackageInfo?.ticket
const maxTicket = ref(5)

const showDependOnSelector = ref(false)
// const allGroupPackages = ref<PackageOption[]>(
//   props.packages.filter((pk) =>
//     props.groupPackages.some(
//       (gpk) =>
//         gpk.packageId === pk.id &&
//         props.currentAddonPackage?.packageId !== pk.id
//     )
//   ) || []
// )
// const addonPackage = ref<number | undefined>(
//   props.currentAddonPackage?.packageId
// )
// const dependOnPackage = ref<number | undefined>(
//   props.currentAddonPackage?.dependonPackageId
// )
// const ticketUsed = ref<number | undefined>(
//   props.currentAddonPackage?.dependonTicketUse
// )
// const showDependOnSelector = ref<boolean>(
//   !!props.currentAddonPackage?.dependonPackageId
// )

// const updateAddonPackage = () => {
//   if (showDependOnSelector.value) {
//     if (!addonPackage.value) return
//     const data = {
//       packageId: addonPackage.value,
//       generateTicket: GenerateTicket.GENERATE_TICKET,
//       dependonPackageId: dependOnPackage.value,
//       idx: props.currentAddonPackage?.idx || 0,
//       dependonTicketUse: ticketUsed.value ? +ticketUsed.value : undefined,
//       packageGroupId: props.currentAddonPackage.packageGroupId,
//     } as IUpdateAddonPackage
//     emit('add', data)
//   } else {
//     if (!addonPackage.value) return
//     const data = {
//       packageId: addonPackage.value,
//       generateTicket: GenerateTicket.GENERATE_TICKET,
//       idx: props.currentAddonPackage?.idx || 0,
//       packageGroupId: props.currentAddonPackage.packageGroupId,
//     } as IUpdateAddonPackage
//     emit('add', data)
//   }
// }
// const depenonPackageInfo = computed(() => {
//   return (
//     allGroupPackages.value.find((pk) => pk.id === dependOnPackage.value) ||
//     undefined
//   )
// })
const findDepenonPackageSelector = async (search: string) => {
  // Promise.all([
  //   props.groupPackages.map(async (pk) => {
  //     const data = await getPackages(search)

  //   }),
  // ])
  // TODO: filter package in package group
  const res = await getPackages(search)
  // res.filter(pk => pk)
  return res
}

const updateAddonPackage = () => {
  emit('add', addonPackage.value)
}

watch(
  () => showDependOnSelector.value,
  (value: boolean) => {
    if (!value) {
      addonPackage.value = {
        ...addonPackage.value,
        dependonPackageId: undefined,
        dependonTicketUse: undefined,
      }
    }
  }
)
</script>

<template>
  <div class="form-fieldset">
    <div class="fieldset-heading">
      <h4>Addon Package</h4>
      <p>Select addon package and order in package group</p>
    </div>
    <div class="columns is-multiline">
      <!-- <div class="column is-3">
        <V-Field>
          <label>Order Index</label>
          <V-Control icon="feather:layers">
            <input
              v-model="addonIdx"
              type="text"
              class="input"
              placeholder="order index"
            />
          </V-Control>
        </V-Field>
      </div> -->
      <div class="column is-12">
        <V-Field>
          <label>Addon Package</label>
          <V-Control>
            <SelectOption
              v-model="addonPackage.packageId"
              placeholder="Select a main package"
              :callback-search="getPackages"
              label-by="packageName"
              value-prop="id"
            />
          </V-Control>
        </V-Field>
      </div>

      <div class="column is-12">
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

      <template v-if="showDependOnSelector">
        <div class="column is-9">
          <V-Field>
            <label>Depend on package</label>
            <V-Control>
              <SelectOption
                v-model="addonPackage.dependonPackageId"
                placeholder="select depend on package"
                :callback-search="findDepenonPackageSelector"
                label-by="packageName"
                value-prop="id"
              >
              </SelectOption>
            </V-Control>
          </V-Field>
        </div>
        <div class="column is-3">
          <V-Field>
            <label>Ticket used (max: {{ maxTicket }})</label>
            <V-Control icon="feather:hash">
              <input
                v-model="addonPackage.dependonTicketUse"
                min="0"
                :max="maxTicket"
                type="number"
                class="input"
                placeholder=""
              />
            </V-Control>
          </V-Field>
        </div>
      </template>
    </div>
    <V-Button
      color="primary"
      icon="fas fa-plus"
      bold
      fullwidth
      @click="updateAddonPackage"
      >Add</V-Button
    >
    <V-Button
      icon="fas fa-times"
      bold
      fullwidth
      class="mt-3"
      @click="emit('cancel')"
      >Cancel</V-Button
    >
  </div>
</template>

<style lang="scss" scoped>
.w-100 {
  width: 100%;
}
</style>
