<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import useOptionApi from '/@src/composable/api/useOptionApi'
const { getFeatureGroups } = useOptionApi()

const props = defineProps({
  modelValue: {
    type: Number,
    default: undefined,
    required: false,
  },
  disabled: {
    type: Boolean,
    default: true,
    required: false,
  },
})
const featureGroupOption = ref<FeatureGroupOption[]>([])
const emit = defineEmits(['update:modelValue', 'clear:validate'])
const fetchFetureGroup = async () => {
  const data = await getFeatureGroups()
  featureGroupOption.value = data.map((group) => {
    return {
      id: group.id,
      label: `(${group.id}) ${group.name}  [users: ${group.numberOfActiveUsers}]`,
    }
  })
}
onBeforeMount(() => {
  fetchFetureGroup()
})
</script>

<template>
  <Multiselect
    v-model="modelValue"
    placeholder="Select Feature Group"
    track-by="id"
    value-prop="id"
    clear-on-select
    clear-on-search
    :disabled="disabled"
    :searchable="true"
    :options="featureGroupOption"
    @select="emit('update:modelValue', $event)"
    @change="emit('update:modelValue', $event)"
    @keypress="emit('clear:validate')"
  >
    <template #singlelabel="{ value }">
      <div class="multiselect-single-label">
        {{ value.label }}
      </div>
    </template>
    <template #option="{ option }">
      <span class="select-option-text">
        {{ option.label }}
      </span>
    </template>
  </Multiselect>
</template>
