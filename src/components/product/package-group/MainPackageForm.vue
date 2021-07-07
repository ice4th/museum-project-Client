<script setup lang="ts">
// MainPackageForm Component

import { defineEmit, defineProps, ref } from 'vue'
import type { PropType } from 'vue'
import { GenerateTicket } from '/@src/types/enums/package.enum'
import type {
  IPackageInfo,
  IUpdateAddonPackage,
} from '/@src/types/interfaces/package.interface'

const props = defineProps({
  mainPackage: {
    type: Object as PropType<IUpdateAddonPackage>,
    default: undefined,
  },
  packages: {
    type: Array as PropType<IPackageInfo[]>,
    default: [],
  },
})

const mainPackageId = ref<number>(props.mainPackage?.packageId || 0)
const generateTicket = ref<GenerateTicket>(
  props.mainPackage?.generateTicket || GenerateTicket.NOT_GENERATE_TICKET
)
const emit = defineEmit({
  'on-update': Object as () => IUpdateAddonPackage,
})

const addMainPackage = () => {
  const mainPackageData = {
    // ...props.mainPackage,
    packageGroupId: props.mainPackage?.packageGroupId,
    idx: props.mainPackage?.idx || 1,
    packageId: mainPackageId.value,
    generateTicket: generateTicket.value,
  } as IUpdateAddonPackage
  emit('on-update', mainPackageData)
}
</script>

<template>
  <div class="form-fieldset">
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
              v-model="mainPackageId"
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
      <V-Button>Cancel</V-Button>
      <V-Button
        color="primary"
        :disabled="!mainPackageId"
        class="ml-3"
        @click="addMainPackage"
        >Add Main Package</V-Button
      >
    </div>
  </div>
</template>
