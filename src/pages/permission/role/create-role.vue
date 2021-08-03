<script setup lang="ts">
/**
 * This is a Vue Component that will be
 * automatically mapped to a entry on vue-router.
 *
 * You will be able to access this page at http://localhost:8083/sidebar-blank-page-5
 * Page uri will match related path to src/pages folder
 *
 * Read more about routing:
 * @see /vite.config.ts
 * @see /src/router.ts
 */

import { useHead } from '@vueuse/head'
import { computed, ref } from 'vue'

/**
 * activeSidebar is an exported ref() that we can use everywhere
 * @see /src/components/navigation/desktop/sidebar/subsidebars/GenericSidebar.vue
 */
import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
import useCreatePermission from '/@src/composable/permission/use-create-permission'
import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Create Role'

useHead({
  title: 'Whitehouse Create Role',
})

const {
  // state
  menuItems,
  selectedItems,
  roleName,
  roleDescription,
  menuLoading,
  // computed
  disabledCreateBtn,
  // methods
  onCreate,
  onClear,
} = useCreatePermission()

/**
 * Computed
 */
const sortSelectedItems = computed(() => {
  return selectedItems.value.sort((a: any, b: any) => a.key - b.key)
})
</script>

<template>
  <div class="box-container">
    <div class="box-permission">
      <V-Card>
        <!-- Header -->
        <div class="py-4">
          <h3 class="text-header">Create Role</h3>
        </div>
        <!-- Input Field -->
        <div>
          <V-Field>
            <label>Role name</label>
            <V-Control icon="lnil lnil-protection">
              <input
                v-model="roleName"
                type="text"
                class="input"
                placeholder="Role name"
              />
            </V-Control>
          </V-Field>
          <V-Field>
            <label>Role description</label>
            <V-Control>
              <textarea
                v-model="roleDescription"
                class="textarea"
                rows="3"
                placeholder="A description for this role..."
              ></textarea>
            </V-Control>
          </V-Field>
        </div>
        <!-- Create Button -->
        <div class="align-button mt-4 py-4">
          <V-Buttons>
            <V-Button @click="onClear" :loading="menuLoading"> Clear </V-Button>
            <V-Button
              color="primary"
              :disabled="disabledCreateBtn"
              @click="onCreate"
            >
              Create
            </V-Button>
          </V-Buttons>
        </div>
        <!-- Selected Items -->
        <div v-if="selectedItems.length > 0">
          <div
            v-for="(item, key) in sortSelectedItems"
            :key="key"
            class="media-flex"
          >
            <V-IconBox :key="item.icon" size="small" color="primary">
              <i class="iconify" :data-icon="item.icon"></i>
            </V-IconBox>
            <div class="flex-meta">
              <span>{{ item.mainMenu }}</span>
              <span
                ><i class="fas fa-list"></i> {{ item.subtitles }} subtitles
                <i class="lnir lnir-bookmark"></i>
                {{ item.actions }} actions</span
              >
              <div
                v-for="(subItem, idx) in item.subMenus"
                :key="idx"
                class="pt-2"
              >
                <h3 class="pb-1">{{ subItem.subMenu }}</h3>
                <V-Tags class="mb-1">
                  <V-Tag
                    v-for="(action, i) in subItem.actions"
                    :key="i"
                    :label="action.name.replace(/_/g, ' ')"
                  />
                </V-Tags>
              </div>
            </div>
          </div>
        </div>
      </V-Card>
    </div>

    <FlexListPermission :items="menuItems" @selected="selectedItems = $event" />
  </div>
</template>

<style lang="scss" scoped>
.box-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  & > * {
    box-sizing: border-box;
    padding: 5px;
  }

  .box-permission {
    flex: auto;
    max-width: 320px;

    .text-header {
      font-size: 1.2rem;
      font-weight: bold;
      text-align: center;
    }

    .align-button {
      display: flex;
      justify-content: center;
    }

    .media-flex {
      padding-top: 20px;
    }
  }

  .box-menu-list {
    flex: 1;

    .box-menu {
      padding-bottom: 10px;

      .main-menu .r-card {
        border-radius: 6px !important;
      }

      .box-accordion {
        margin-top: 5px;
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-device-width: 1024px) {
  .box-container {
    .box-permission {
      flex: auto;
      max-width: 280px;
    }
  }
}

@media only screen and (max-width: 767px) {
  .box-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;

    & > * {
      padding: 5px;
    }

    .box-permission {
      max-width: 900px;
      width: 95%;
    }

    .box-menu-list {
      width: 100%;
    }
  }
}
</style>
