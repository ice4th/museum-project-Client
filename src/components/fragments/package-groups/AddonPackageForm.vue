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
const maxTicket = computed(
  () =>
    props.groupPackages.find(
      (pk) => pk.packageId === addonPackage.value.dependonPackageId
    )?.packageTicket || 0
)

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
const addonPackageChange = (value: number, option: PackageOption) => {
  addonPackage.value.packageName = option.packageName
  addonPackage.value.packageTicket = option.ticket
}
const findAddonPackages = async (search: string) => {
  const res = await getPackages(search)
  const filter = await res.filter((pk) =>
    props.groupPackages.every((gp) => gp.packageId !== pk.id)
  )
  return filter
}

const updateAddonPackage = () => {
  emit('add', addonPackage.value)
}

watch(
  () => showDependOnSelector.value,
  async (value: boolean) => {
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
              :callback-search="findAddonPackages"
              label-by="packageName"
              value-prop="id"
              @update:modelValue="addonPackageChange"
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
        <div class="column is-8">
          <V-Field>
            <label>Depend on package</label>
            <V-Control>
              <Multiselect
                v-model="addonPackage.dependonPackageId"
                placeholder="select depend on package"
                :options="groupPackages"
                track-by="packageName"
                value-prop="packageId"
              >
                <template #singlelabel="{ value }">
                  <div class="multiselect-single-label">
                    ({{ value.packageId }}) {{ value.packageName }}
                  </div>
                </template>
                <template #option="{ option }">
                  <span class="select-option-text">
                    ({{ option.packageId }}) {{ option.packageName }}
                  </span>
                </template>
              </Multiselect>
            </V-Control>
          </V-Field>
        </div>
        <div class="column is-4">
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
                @change="
                  addonPackage.dependonTicketUse =
                    +addonPackage.dependonTicketUse
                "
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
