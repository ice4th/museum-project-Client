<script setup lang="ts">
// MainPackageForm Component

import { ref } from 'vue'
import type { PropType } from 'vue'
import { GenerateTicket } from '/@src/types/enums/package.enum'
import type { IUpdateAddonPackage } from '/@src/types/interfaces/package.interface'
import type { PackageOption } from '/@src/types/interfaces/option.interface'
import useOptionApi from '/@src/composable/api/useOptionApi'

const props = defineProps({
  mainPackage: {
    type: Object as PropType<IUpdateAddonPackage>,
    default: undefined,
  },
  packageGroup: {
    type: Array as PropType<IUpdateAddonPackage[]>,
    default: () => [],
  },
})

const { getPackages } = useOptionApi()
const mainPackageId = ref<number>(props.mainPackage?.packageId || 0)
const generateTicket = ref<GenerateTicket>(
  props.mainPackage?.generateTicket || GenerateTicket.NOT_GENERATE_TICKET
)
const emit = defineEmits({
  'on-update': Object,
})

const mainPackageInfo = ref<IUpdateAddonPackage>(
  props.mainPackage || {
    idx: undefined,
    packageId: 0,
    generateTicket: GenerateTicket.NOT_GENERATE_TICKET,
  }
)

const addMainPackage = () => {
  // const mainPackageData = {
  //   // ...props.mainPackage,
  //   packageGroupId: props.mainPackage?.packageGroupId,
  //   idx: props.mainPackage?.idx || 1,
  //   packageId: mainPackageId.value,
  //   generateTicket: generateTicket.value,
  // } as IUpdateAddonPackage
  emit('on-update', mainPackageInfo.value)
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
            <SelectOption
              v-model="mainPackageInfo.packageId"
              placeholder="Search for select a main package"
              :callback-search="getPackages"
              label-by="packageName"
              value-prop="id"
            />
          </V-Control>
        </V-Field>
      </div>
      <div class="column is-12">
        <V-Field>
          <label>Generate Ticket</label>
          <V-Control>
            <V-Radio
              v-model="mainPackageInfo.generateTicket"
              value="1"
              label="Yes"
              name="outlined_squared_radio"
              color="success"
              square
            />

            <V-Radio
              v-model="mainPackageInfo.generateTicket"
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
        :disabled="!mainPackageInfo.packageId"
        class="ml-3"
        @click="addMainPackage"
        >Add Main Package</V-Button
      >
    </div>
  </div>
</template>
