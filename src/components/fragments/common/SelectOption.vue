<script setup lang="ts">
// SelectOption Component
import type { PropType } from 'vue'
import { ref, defineProps, watch } from 'vue'
import { toFormat } from '/@src/helpers/date.helper'

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
  options: {
    type: [Array, Object],
    default: () => [],
  },
  labelBy: {
    type: String,
    default: 'name',
  },
  trackBy: {
    type: String,
    default: 'name',
  },
  valueProp: {
    type: String,
    default: 'id',
  },
  isShowId: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['search', 'update:modelValue'])

const searchOption = (value: string) => {
  emit('search', value)
}
</script>

<template>
  <Multiselect
    v-model="modelValue"
    :placeholder="placeholder"
    :options="options"
    :searchable="searchable"
    :label="labelBy"
    :track-by="trackBy"
    :value-prop="valueProp"
    @search-change="searchOption"
    @change="emit('update:modelValue', $event)"
  >
    <template #singlelabel="{ value }">
      <div class="multiselect-single-label">
        <span v-show="isShowId && value.id">({{ value.id }})</span>
        {{ value[labelBy] }}
      </div>
    </template>
    <template #option="{ option }">
      <span class="select-option-text">
        <span v-show="isShowId && option.id">({{ option.id }})</span>
        {{ option[labelBy] }}
      </span>
    </template>
  </Multiselect>
</template>
