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
    <div v-for="item in breadcrumb" :key="item.id" class="breadcrumb-item">
      <a class="dark-inverted" @click="emit('change-navigate', item)">{{
        item.label
      }}</a>
      <!-- <i class="is-flex m-auto dark-inverted fas fa-long-arrow-alt-right"></i> -->
      <!-- <span>/</span> -->
      <i class="is-flex m-auto dark-inverted fas fa-chevron-right"></i>
    </div>
  </div>
  <hr />
</template>
<style lang="scss" scoped>
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/abstracts/_mixins.scss';
.breadcrumb {
  padding: 0.75rem 0;
  .breadcrumb-item {
    padding: 10px 0;
    display: flex;
    a {
      color: black;
      cursor: pointer;
      font-weight: 600;
      &:hover {
        color: $primary;
      }
    }
  }
}

.is-dark {
  .breadcrumb {
    @include vuero-card--dark();
    a.dark-inverted {
      &:hover {
        color: #fef2ea !important;
      }
    }
  }
}
</style>
