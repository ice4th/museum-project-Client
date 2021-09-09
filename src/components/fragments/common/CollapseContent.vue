<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  open: {
    type: Boolean,
    default: false,
  },
  withChevron: {
    type: Boolean,
    default: false,
  },
})

const internalOpen = ref<boolean | undefined>(props.open)
const internalTitle = ref<string | undefined>(props.title)

const toggleOpen = () => {
  if (internalOpen.value) {
    internalOpen.value = undefined
  } else {
    internalOpen.value = true
  }
}
</script>

<template>
  <details
    :class="[
      withChevron && 'has-chevron',
      !withChevron && 'has-plus',
      internalOpen && 'is-active',
    ]"
    class="collapse"
  >
    <summary class="collapse-header" @click="() => toggleOpen()">
      <h1>{{ internalTitle }}</h1>
      <div class="collapse-icon">
        <V-Icon v-if="withChevron" icon="feather:chevron-down" />
        <V-Icon v-else-if="!withChevron" icon="feather:plus" />
      </div>
    </summary>
    <div class="collapse-content">
      <slot name="collapse-content"></slot>
    </div>
  </details>
</template>

<style lang="scss" scoped>
summary {
  outline: none;
  list-style: none;

  &::marker {
    display: none;
  }

  h1 {
    font-size: 16px;
    font-weight: 600;
  }
}
.collapse {
  .collapse-content {
    // display: block !important;
    transition: all 0.3s;
  }
}
</style>
