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
import { ref } from 'vue'

/**
 * activeSidebar is an exported ref() that we can use everywhere
 * @see /src/components/navigation/desktop/sidebar/subsidebars/GenericSidebar.vue
 */
import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Create Role'

useHead({
  title: 'Whitehouse Create Role',
})

const menuItems = ref([
  {
    mainMenu: 'Students',
    icon: 'feather:users',
    show: false,
    subtitles: 2,
    actions: 6,
    subMenu: [
      {
        subMenu: 'Student Information',
        actions: [
          {
            id: 101,
            selected: false,
            name: 'STUDENT_INFORMATION',
            description: 'list of student information',
          },
          {
            id: 102,
            selected: false,
            name: 'STUDENT_DETAILS',
            description: 'details for each student',
          },
        ],
      },
      {
        subMenu: 'Student Ticket',
        actions: [
          {
            id: 103,
            selected: false,
            name: 'TOTAL_STUDENT_TICKET',
            description: 'total ticket of student',
          },
          {
            id: 104,
            selected: false,
            name: 'ADD_STUDENT_TICKET',
            description: 'add ticket to student',
          },
          {
            id: 105,
            selected: false,
            name: 'SET_START_STUDENT_TICKET',
            description: 'set start date student ticket',
          },
          {
            id: 106,
            selected: false,
            name: 'SET_EXPIRE_STUDENT_TICKET',
            description: 'change expire date student ticket',
          },
        ],
      },
    ],
  },
  {
    mainMenu: 'Products & Packages',
    icon: 'feather:package',
    show: false,
    subtitles: 4,
    actions: 16,
    subMenu: [
      {
        subMenu: 'Product List',
        actions: [
          {
            id: 201,
            selected: false,
            name: 'PRODUCT_ACTION_1',
            description: 'action description 1',
          },
          {
            id: 202,
            selected: false,
            name: 'PRODUCT_ACTION_2',
            description: 'action description 2',
          },
          {
            id: 203,
            selected: false,
            name: 'PRODUCT_ACTION_3',
            description: 'action description 3',
          },
          {
            id: 204,
            selected: false,
            name: 'PRODUCT_ACTION_4',
            description: 'action description 4',
          },
        ],
      },
      {
        subMenu: 'Package List',
        actions: [
          {
            id: 205,
            selected: false,
            name: 'PACKAGE_ACTION_1',
            description: 'action description 1',
          },
          {
            id: 206,
            selected: false,
            name: 'PACKAGE_ACTION_2',
            description: 'action description 2',
          },
          {
            id: 207,
            selected: false,
            name: 'PACKAGE_ACTION_3',
            description: 'action description 3',
          },
          {
            id: 208,
            selected: false,
            name: 'PACKAGE_ACTION_4',
            description: 'action description 4',
          },
          {
            id: 209,
            selected: false,
            name: 'PACKAGE_ACTION_5',
            description: 'action description 5',
          },
        ],
      },
      {
        subMenu: 'Create Product',
        actions: [
          {
            id: 210,
            selected: false,
            name: 'CREATE_PRODUCT_ACTION_1',
            description: 'action description 1',
          },
          {
            id: 211,
            selected: false,
            name: 'CREATE_PRODUCT_ACTION_2',
            description: 'action description 2',
          },
          {
            id: 212,
            selected: false,
            name: 'CREATE_PRODUCT_ACTION_3',
            description: 'action description 3',
          },
        ],
      },
      {
        subMenu: 'Create Package',
        actions: [
          {
            id: 213,
            selected: false,
            name: 'CREATE_PACKAGE_ACTION_1',
            description: 'action description 1',
          },
          {
            id: 214,
            selected: false,
            name: 'CREATE_PACKAGE_ACTION_2',
            description: 'action description 2',
          },
          {
            id: 215,
            selected: false,
            name: 'CREATE_PACKAGE_ACTION_3',
            description: 'action description 3',
          },
          {
            id: 216,
            selected: false,
            name: 'CREATE_PACKAGE_ACTION_4',
            description: 'action description 4',
          },
        ],
      },
    ],
  },
  {
    mainMenu: 'Permission',
    icon: 'feather:unlock',
    show: false,
    subtitles: 2,
    actions: 9,
    subMenu: [
      {
        subMenu: 'Role',
        actions: [
          {
            id: 301,
            selected: false,
            name: 'ROLE_ACTION_1',
            description: 'action description 1',
          },
          {
            id: 302,
            selected: false,
            name: 'ROLE_ACTION_2',
            description: 'action description 2',
          },
          {
            id: 303,
            selected: false,
            name: 'ROLE_ACTION_3',
            description: 'action description 3',
          },
          {
            id: 304,
            selected: false,
            name: 'ROLE_ACTION_4',
            description: 'action description 4',
          },
        ],
      },
      {
        subMenu: 'Team',
        actions: [
          {
            id: 305,
            selected: false,
            name: 'TEAM_ACTION_1',
            description: 'action description 1',
          },
          {
            id: 306,
            selected: false,
            name: 'TEAM_ACTION_2',
            description: 'action description 2',
          },
          {
            id: 307,
            selected: false,
            name: 'TEAM_ACTION_3',
            description: 'action description 3',
          },
          {
            id: 308,
            selected: false,
            name: 'TEAM_ACTION_4',
            description: 'action description 4',
          },
          {
            id: 309,
            selected: false,
            name: 'TEAM_ACTION_5',
            description: 'action description 5',
          },
        ],
      },
    ],
  },
])
const selectedItems = ref<any[]>([])
</script>

<template>
  <div class="box-container">
    <div class="box-permission">
      <V-Card>
        <!-- Input Field -->
        <div>
          <V-Field>
            <label>Role name</label>
            <V-Control icon="lnil lnil-protection">
              <input type="text" class="input" placeholder="Role name" />
            </V-Control>
          </V-Field>
          <V-Field>
            <label>Role description</label>
            <V-Control>
              <textarea
                v-model="textarea"
                class="textarea"
                rows="3"
                placeholder="A description for this role..."
              ></textarea>
            </V-Control>
          </V-Field>
        </div>
        <!-- Create Button -->
        <div class="align-button py-4">
          <V-Buttons>
            <V-Button color="secondary"> Clear </V-Button>
            <V-Button color="primary"> Create </V-Button>
          </V-Buttons>
        </div>
        <!-- Selected Items -->
        <div v-if="selectedItems.length > 0">
          <div
            v-for="(item, key) in selectedItems"
            :key="key"
            class="media-flex"
          >
            <V-IconBox size="small" color="primary">
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
                    :label="action.replace(/_/g, ' ')"
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

  box-sizing: border-box;

  & > * {
    flex: auto 1 1;
    padding: 5px;
  }

  .box-permission {
    max-width: 320px;

    .align-button {
      display: flex;
      justify-content: center;
    }

    .media-flex {
      padding-top: 20px;
    }
  }

  .box-menu-list .box-menu {
    padding-bottom: 10px;

    .main-menu .r-card {
      border-radius: 6px !important;
    }

    .box-accordion {
      margin-top: 5px;
    }
  }
}

@media only screen and (min-width: 768px) and (max-device-width: 1024px) {
  .box-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    box-sizing: border-box;

    & > * {
      flex: auto 1 1;
      padding: 5px;
    }

    .box-permission {
      max-width: 280px;
    }
  }
}

@media only screen and (max-width: 767px) {
  .box-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    box-sizing: border-box;

    & > * {
      flex: auto 1 1;
      padding: 5px;
    }

    .box-permission {
      max-width: 100%;
    }
  }
}
</style>
