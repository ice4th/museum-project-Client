<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import { NavbarKey, subsidebarByPermission } from '../../helpers/permission'
import useUserSession from '/@src/composable/useUserSession'

const props = defineProps({
  mainMenuKey: {
    type: String as PropType<NavbarKey>,
    default: 'student',
  },
  mainLabel: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['close'])
const { user, permissions } = useUserSession()
const subsidebarList = computed(() =>
  subsidebarByPermission(props.mainMenuKey, permissions)
)
</script>

<template>
  <div class="mobile-subsidebar">
    <div class="inner">
      <div class="sidebar-title">
        <h3>{{ mainLabel }}</h3>
      </div>

      <ul class="submenu" data-simplebar>
        <li
          v-for="(navItem, index) in subsidebarList"
          :key="`sub-${mainMenuKey}-${navItem.routeName}-${index}`"
          class="is-submenu"
          :class="[navItem.isDivider && 'divider']"
        >
          <RouterLink
            v-if="!navItem.isDivider"
            :to="{ name: navItem.routeName }"
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-if="navItem.icon" v-html="navItem.icon"></span>
            <span>{{ navItem.label }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/layout/_sidebar-mobile.scss';
</style>
