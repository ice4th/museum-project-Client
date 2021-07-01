<script setup lang="ts">
// AddonPackageForm Component
import { defineEmit, defineProps, ref } from 'vue'
import type { PropType } from 'vue'
import { GenerateTicket } from '/@src/types/enums/package.enum'
import type {
  ICreateAddonPackage,
  IPackageInfo,
} from '/@src/types/interfaces/package.interface'

const props = defineProps({
  packages: {
    type: Array as PropType<IPackageInfo[]>,
    required: true,
  },
  allGroupPackages: {
    type: Array as PropType<IPackageInfo[]>,
    default: () => [],
  },
  currentAddonPackage: {
    type: Object as PropType<ICreateAddonPackage>,
    default: undefined,
  },
})
const emit = defineEmit({
  cancel: null,
  add: Object,
})
const addonIdx = ref<string>(
  props.currentAddonPackage?.idx?.toString() ||
    (props.allGroupPackages.length + 1).toString() ||
    '2'
)
const addonPackage = ref<number | undefined>(
  props.currentAddonPackage?.packageId
)
const dependOnPackage = ref<number | undefined>(
  props.currentAddonPackage?.dependonPackageId
)
const ticketUsed = ref<number | undefined>(
  props.currentAddonPackage?.dependonTicketUse
)
const showDependOnSelector = ref<boolean>(
  !!props.currentAddonPackage?.dependonPackageId
)

const updateAddonPackage = () => {
  if (showDependOnSelector.value) {
    if (!addonPackage.value) return
    const data = {
      packageId: addonPackage.value,
      generateTicket: GenerateTicket.GENERATE_TICKET,
      idx: +addonIdx?.value,
      dependonPackageId: dependOnPackage.value,
      dependonTicketUse: ticketUsed.value ? +ticketUsed.value : undefined,
    } as ICreateAddonPackage
    emit('add', data)
  } else {
    if (!addonPackage.value) return
    const data = {
      packageId: addonPackage.value,
      generateTicket: GenerateTicket.GENERATE_TICKET,
      idx: +addonIdx?.value,
    } as ICreateAddonPackage
    emit('add', data)
  }
}
</script>

<template>
  <div class="form-fieldset">
    <div class="fieldset-heading">
      <h4>Addon Package</h4>
      <p>Select addon package and order in package group</p>
    </div>
    <div class="columns is-multiline">
      <div class="column is-3">
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
      </div>
      <div class="column is-9">
        <V-Field>
          <label>Addon Package</label>
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
              <Multiselect
                v-model="dependOnPackage"
                placeholder="select depend on package"
                :options="allGroupPackages"
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
        <div class="column is-3">
          <V-Field>
            <label>Ticket used</label>
            <V-Control icon="feather:hash">
              <input
                v-model="ticketUsed"
                type="number"
                class="input"
                placeholder=""
                autocomplete="family-name"
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
