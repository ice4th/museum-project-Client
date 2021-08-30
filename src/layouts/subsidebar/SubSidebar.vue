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
const myMenus = computed(() => user?.menus || [])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">{{ mainLabel }}</h3>
      <div class="panel-close" @click="emit('close')">
        <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
      </div>
    </div>
    <div class="inner" data-simplebar>
      <ul>
        <li
          v-for="(navItem, index) in subsidebarList"
          :key="`sub-${mainMenuKey}-${navItem.routeName}-${index}`"
          :class="[navItem.isDivider && 'divider']"
        >
          <RouterLink
            v-if="!navItem.isDivider"
            :to="{ name: navItem.routeName }"
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <span v-if="navItem.icon" v-html="navItem.icon"></span>
            <!-- <i class="iconify" data-icon="feather:activity"></i> -->
            <!-- <i
              v-if="navItem.icon"
              aria-hidden="true"
              class="fas fa-arrow-right pr-2"
              :class="[navItem.icon]"
            ></i> -->
            {{ navItem.label }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/layout/_sidebar-panel.scss';
ul li:first-child,
li:last-child {
  &.divider {
    display: none !important;
  }
}
</style>
