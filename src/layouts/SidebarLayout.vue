<script setup lang="ts">
import type { PropType } from 'vue'
import { defineProps, ref, watchEffect, watch } from 'vue'
import { useRoute } from 'vue-router'

import { activePanel } from '/@src/state/activePanelState'
import { pageTitle } from '/@src/state/sidebarLayoutState'

type SidebarTheme =
  | 'default'
  | 'color'
  | 'color-curved'
  | 'curved'
  | 'float'
  | 'labels'
  | 'labels-hover'

const props = defineProps({
  theme: {
    type: String as PropType<SidebarTheme>,
    default: 'labels',
  },
  defaultSidebar: {
    type: String,
    default: 'product',
  },
  closeOnChange: {
    type: Boolean,
    default: false,
  },
  openOnMounted: {
    type: Boolean,
    default: false,
  },
  nowrap: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()
const isMobileSidebarOpen = ref(false)
const isDesktopSidebarOpen = ref(props.openOnMounted)
const activeMobileSubsidebar = ref(props.defaultSidebar)

function switchSidebar(id: string) {
  if (id === activeMobileSubsidebar.value) {
    isDesktopSidebarOpen.value = !isDesktopSidebarOpen.value
  } else {
    isDesktopSidebarOpen.value = true
    activeMobileSubsidebar.value = id
  }
}

/**
 * watchEffect callback will be executed each time dependent reactive values has changed
 */
watchEffect(
  () => {
    const isOpen = isDesktopSidebarOpen.value
    const wrappers = document.querySelectorAll('.view-wrapper')

    wrappers.forEach((wrapper) => {
      if (isOpen === false) {
        wrapper.classList.remove('is-pushed-full')
      } else if (!wrapper.classList.contains('is-pushed-full')) {
        wrapper.classList.add('is-pushed-full')
      }
    })
  },
  { flush: 'post' }
)
watch(
  () => route.fullPath,
  () => {
    isMobileSidebarOpen.value = false

    if (props.closeOnChange && isDesktopSidebarOpen.value) {
      isDesktopSidebarOpen.value = false
    }
  }
)
</script>

<template>
  <div class="sidebar-layout">
    <div class="app-overlay"></div>

    <!-- Mobile navigation -->
    <MobileNavbar
      :is-open="isMobileSidebarOpen"
      @toggle="isMobileSidebarOpen = !isMobileSidebarOpen"
    >
      <template #brand>
        <RouterLink :to="{ name: 'index' }" class="navbar-item is-brand">
          <AnimatedLogo width="38px" height="38px" />
        </RouterLink>

        <div class="brand-end">
          <!-- <NotificationsMobileDropdown /> -->
          <UserProfileDropdown />
        </div>
      </template>
    </MobileNavbar>

    <!-- Mobile sidebar links -->
    <MobileSidebar
      :is-open="isMobileSidebarOpen"
      @toggle="isMobileSidebarOpen = !isMobileSidebarOpen"
    >
      <template #links>
        <!-- Students -->
        <li>
          <RouterLink
            :to="{ name: 'student' }"
            :class="[activeMobileSubsidebar === 'student' && 'is-active']"
            @click="activeMobileSubsidebar = 'dashboard'"
          >
            <i aria-hidden="true" class="iconify" data-icon="feather:users"></i>
          </RouterLink>
        </li>

        <!-- Products & Packages -->
        <li>
          <RouterLink
            :to="{ name: 'product' }"
            :class="[activeMobileSubsidebar === 'product' && 'is-active']"
            @click="activeMobileSubsidebar = 'product'"
          >
            <i aria-hidden="true" class="iconify" data-icon="feather:box"></i>
          </RouterLink>
        </li>

        <!-- Roles & Permissions -->
        <li>
          <RouterLink
            :to="{ name: 'role-permission' }"
            :class="[
              activeMobileSubsidebar === 'role-permission' && 'is-active',
            ]"
            @click="activeMobileSubsidebar = 'role-permission'"
          >
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:shield"
            ></i>
          </RouterLink>
        </li>
      </template>

      <template #bottom-links>
        <li>
          <a @click="activePanel = 'search'">
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:search"
            ></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i
              aria-hidden="true"
              class="iconify"
              data-icon="feather:settings"
            ></i>
          </a>
        </li>
      </template>
    </MobileSidebar>

    <!-- Mobile subsidebar links -->
    <transition name="slide-x">
      <StudentMobileSubsidebar
        v-if="isMobileSidebarOpen && activeMobileSubsidebar === 'student'"
      />
      <ProductMobileSubsidebar
        v-else-if="isMobileSidebarOpen && activeMobileSubsidebar === 'product'"
      />
      <RolePermissionMobileSubsidebar
        v-else-if="
          isMobileSidebarOpen && activeMobileSubsidebar === 'role-permission'
        "
      />
    </transition>

    <!-- Desktop navigation -->
    <!-- <CircularMenu /> -->

    <Sidebar :theme="props.theme" :is-open="isDesktopSidebarOpen">
      <template #links>
        <!-- Students -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'student' && 'is-active']"
            data-content="Students"
            @click="switchSidebar('student')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:users"
            ></i>
          </a>
        </li>

        <!-- Products & Packages -->
        <li>
          <a
            :class="[activeMobileSubsidebar === 'product' && 'is-active']"
            data-content="Products & Packages"
            @click="switchSidebar('product')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:box"
            ></i>
          </a>
        </li>

        <!-- Roles & Permissions -->
        <li>
          <a
            :class="[
              activeMobileSubsidebar === 'role-permission' && 'is-active',
            ]"
            data-content="Roles & Permissions"
            @click="switchSidebar('role-permission')"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:shield"
            ></i>
          </a>
        </li>
      </template>

      <template #bottom-links>
        <!-- Switch Sidebar  Layouts -->
        <!-- <li>
          <LayoutSwitcher />
        </li> -->

        <!-- Search -->
        <li class="right-panel-trigger">
          <a data-content="Search" @click="activePanel = 'search'">
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather-search"
            />
          </a>
          <a class="is-hidden is-inactive" @click="activePanel = 'none'">
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather-x"
            />
          </a>
        </li>

        <!-- Settings -->
        <li>
          <RouterLink
            id="open-settings"
            :to="{ name: 'index' }"
            data-content="Settings"
          >
            <i
              aria-hidden="true"
              class="iconify sidebar-svg"
              data-icon="feather:settings"
            ></i>
          </RouterLink>
        </li>

        <!-- Profile Dropdown -->
        <li>
          <UserProfileDropdown up />
        </li>
      </template>
    </Sidebar>

    <transition name="slide-x">
      <StudentSubsidebar
        v-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'student'"
        @close="isDesktopSidebarOpen = false"
      />
      <ProductSubsidebar
        v-else-if="isDesktopSidebarOpen && activeMobileSubsidebar === 'product'"
        @close="isDesktopSidebarOpen = false"
      />
      <RolePermissionSubsidebar
        v-else-if="
          isDesktopSidebarOpen && activeMobileSubsidebar === 'role-permission'
        "
        @close="isDesktopSidebarOpen = false"
      />
    </transition>

    <!-- <LanguagesPanel />
    <ActivityPanel />
    <SearchPanel />
    <TaskPanel /> -->

    <div class="view-wrapper">
      <div class="page-content-wrapper">
        <template v-if="props.nowrap">
          <slot></slot>
        </template>
        <div v-else class="page-content is-relative">
          <div class="page-title has-text-centered">
            <!-- Sidebar Trigger -->
            <div
              class="vuero-hamburger nav-trigger push-resize"
              @click="isDesktopSidebarOpen = !isDesktopSidebarOpen"
            >
              <span class="menu-toggle has-chevron">
                <span
                  :class="[isDesktopSidebarOpen && 'active']"
                  class="icon-box-toggle"
                >
                  <span class="rotate">
                    <i aria-hidden="true" class="icon-line-top"></i>
                    <i aria-hidden="true" class="icon-line-center"></i>
                    <i aria-hidden="true" class="icon-line-bottom"></i>
                  </span>
                </span>
              </span>
            </div>

            <div class="title-wrap">
              <h1 class="title is-4">{{ pageTitle }}</h1>
            </div>

            <!-- <Toolbar class="desktop-toolbar" /> -->
          </div>

          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
