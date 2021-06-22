<script setup lang="ts">
// AddonPackageForm Component
import { defineEmit, defineProps, PropType, ref } from 'vue'
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
})
const emit = defineEmit({
  add: Object,
})
const addonIdx = ref<string>(
  (props.allGroupPackages.length + 1).toString() || '2'
)
const addonPackage = ref<number | undefined>(undefined)
const dependOnPackage = ref<number | undefined>(undefined)
const ticketUsed = ref<number | undefined>(undefined)
const showDependOnSelector = ref<boolean>(false)

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
  console.log(
    'updateAddonPackage',
    addonPackage.value,
    dependOnPackage.value,
    ticketUsed.value
  )
}
</script>

<template>
  <div class="form-section is-grey">
    <div class="form-section-inner">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Order Index</label>
        </div>
        <div class="field-body">
          <V-Field>
            <V-Control>
              <input
                v-model="addonIdx"
                type="text"
                class="input"
                placeholder="order index"
              />
            </V-Control>
          </V-Field>
        </div>
      </div>
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
      <div v-show="showDependOnSelector" class="columns is-multiline px-5">
        <div class="column is-6">
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
        <div class="column is-6">
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
      </div>
      <V-Button class="text-right" color="primary" @click="updateAddonPackage"
        >Add</V-Button
      >
    </div>
  </div>
</template>
