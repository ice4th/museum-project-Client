<script setup lang="ts">
// SelectOption Component
import { onMounted, ref, defineProps, watch } from 'vue'
import type { PropType } from 'vue'
/**
 * @Guide
 *
 * callBackSearch => fetch data from api ** function return array Or object[] for display options **
 * labelBy => display text by 'labelBy' default is 'name'
 * trackBy => search by 'trackBy' default is labelBy
 * valueProps => track value by 'valueProps' (type as modelValue) default is 'id'
 */
/**
 * @example
 * 
 * <SelectOption
      v-model="student"
      :callback-search="getStudents"
      label-by="fullnameTh"
      track-by="fullnameTh"
      value-prop="id"
      placeholder="Select student for send package (Search by name)"
    />
 */

const props = defineProps({
  modelValue: {
    type: [Array, Object, String, Number],
    default: undefined,
    required: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  searchable: {
    type: Boolean,
    default: true,
  },
  labelBy: {
    type: String,
    default: 'name',
  },
  trackBy: {
    type: String,
    default: '',
  },
  valueProp: {
    type: String,
    default: 'id',
  },
  isShowId: {
    type: Boolean,
    default: true,
  },
  callbackSearch: {
    type: Function,
    default: () => [],
  },
})
const emit = defineEmits(['update:modelValue'])

const searchOption = async (query?: string) => {
  return await props.callbackSearch(query)
}
onMounted(() => {
  searchOption()
})
</script>

<template>
  <Multiselect
    v-model="modelValue"
    :placeholder="placeholder"
    :options="searchOption"
    :filterResults="false"
    :resolve-on-load="false"
    :delay="0"
    :searchable="searchable"
    :label="labelBy"
    :track-by="trackBy || labelBy"
    :value-prop="valueProp"
    :no-options-text="'search...'"
    @select="emit('update:modelValue', $event)"
  >
    <template #singlelabel="{ value }">
      <div class="multiselect-single-label">
        <span v-show="isShowId && value.id" class="pr-1">({{ value.id }})</span>
        {{ value[labelBy] }}
      </div>
    </template>
    <template #option="{ option }">
      <span class="select-option-text">
        <span v-show="isShowId && option.id" class="pr-1"
          >({{ option.id }})</span
        >
        {{ option[labelBy] }}
      </span>
    </template>
  </Multiselect>
</template>
