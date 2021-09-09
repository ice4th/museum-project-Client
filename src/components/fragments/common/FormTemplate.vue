<script setup lang="ts">
// FormTemplate Component
import { computed, defineProps } from 'vue'
import { useWindowScroll } from '@vueuse/core'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})

const { y } = useWindowScroll()
const isStuck = computed(() => {
  return y.value > 30
})
</script>

<template>
  <div class="form-layout">
    <div class="form-outer">
      <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
        <div class="form-header-inner">
          <div class="left">
            <slot name="title" />
            <h3 v-if="!$slots.title">{{ title }}</h3>
          </div>
          <div class="right">
            <div class="buttons">
              <slot name="buttons" />
              <!-- <V-Button icon="lnir lnir-arrow-left rem-100" light dark-outlined>
              Cancel
            </V-Button>
            <V-Button color="primary" raised @click="createPackageGroup">
              Create
            </V-Button> -->
            </div>
          </div>
        </div>
      </div>
      <div class="form-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'src/scss/abstracts/_variables.scss';
@import 'src/scss/abstracts/_mixins.scss';
@import 'src/scss/pages/generic/_forms.scss';
</style>
