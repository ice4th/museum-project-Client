<script setup lang="ts">
import type { PropType } from 'vue'
import { defineProps, computed, ref } from 'vue'

const props = defineProps({
  breadcrumb: {
    type: Object,
    default: () => {},
  },
})

const emit = defineEmits(['change-navigate'])
</script>

<template>
  <div class="breadcrumb is-flex m-0">
    <a
      v-for="item in breadcrumb"
      :key="item.id"
      class="breadcrumb-item"
      @click="emit('change-navigate', item)"
    >
      {{ item.label }} <i class="fas fa-chevron-right"></i>
    </a>
  </div>
</template>
<style lang="scss" scoped>
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/abstracts/_mixins.scss';
.breadcrumb {
  padding: 0.75rem;
  a.breadcrumb-item {
    color: black;
    cursor: pointer;
    text-decoration: none;
    font-weight: 600;
    padding: 10px;
    &:hover {
      color: $primary;
    }
  }
}
</style>
