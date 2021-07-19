<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  compact: {
    type: Boolean,
    default: false,
  },
})
</script>
<template>
  <div class="table" :class="[compact && 'is-compact']">
    <tbody>
      <slot name="header"></slot>
      <slot name="body"></slot>
    </tbody>
  </div>
</template>

<style lang="scss" scoped>
.link {
  color: #a2a5b9;
  border-bottom: 1px solid white;
  &:hover {
    color: #e9e9e9;
  }
}
</style>
