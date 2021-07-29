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

const showStudents = ref(false)
const showProducts = ref(false)
const showPermissions = ref(false)

const data = [
  {
    title: 'Accordion Item 1',
    content: 'Sed ut perspiciatis unde omnis iste ...',
  },
  {
    title: 'Accordion Item 2',
    content: 'Sed ut perspiciatis unde omnis iste ...',
  },
  {
    title: 'Accordion Item 3',
    content: 'Sed ut perspiciatis unde omnis iste ...',
  },
]

const permissionData = [
  {
    mainMenu: 'Students',
    subMenu: [
      {
        subMenu: 'Student Information',
        actions: [
          {
            name: 'STUDENT_INFORMATION',
            description: 'list of student information',
          },
          {
            name: 'STUDENT_DETAILS',
            description: 'details for each student',
          },
        ],
      },
      {
        subMenu: 'Student Ticket',
        actions: [
          {
            name: 'TOTAL_STUDENT_TICKET',
            description: 'total ticket of student',
          },
          {
            name: 'ADD_STUDENT_TICKET',
            description: 'add ticket to student',
          },
          {
            name: 'SET_START_STUDENT_TICKET',
            description: 'set start date student ticket',
          },
          {
            name: 'SET_EXPIRE_STUDENT_TICKET',
            description: 'change expire date student ticket',
          },
        ],
      },
    ],
  },
]
</script>

<template>
  <div class="box-container">
    <div class="box-permission">
      <V-Card>
        <div class="media-flex">
          <V-IconBox size="small" color="primary">
            <i class="iconify" data-icon="feather:users"></i>
          </V-IconBox>
          <div class="flex-meta">
            <span>Students</span>
            <span>Manage Students</span>
            <div class="pt-2">
              <h3 class="pb-1">Students Information</h3>
              <V-Tags class="mb-1">
                <V-Tag label="Tag Label" />
                <V-Tag label="Tag Label" />
              </V-Tags>
              <h3 class="pb-1">Add Student Tickets</h3>
              <V-Tags class="mb-1">
                <V-Tag label="Tag Label" />
                <V-Tag label="Tag Label" />
                <V-Tag label="Tag Label" />
                <V-Tag label="Tag Label" />
              </V-Tags>
              <h3 class="pb-1">Open Assessment</h3>
              <V-Tags class="mb-1">
                <V-Tag label="Tag Label" />
                <V-Tag label="Tag Label" />
                <V-Tag label="Tag Label" />
                <V-Tag label="Tag Label" />
                <V-Tag label="Tag Label" />
              </V-Tags>
            </div>
          </div>
        </div>
      </V-Card>
    </div>

    <div class="box-menu-list">
      <!-- Students Menu -->
      <div class="box-menu">
        <div class="main-menu">
          <V-Card>
            <V-Block title="Students" center>
              <template #icon>
                <VIconBox color="info" size="medium" rounded>
                  <i class="iconify" data-icon="feather:users"></i>
                </VIconBox>
              </template>
              <template #default>
                <span
                  ><i class="fas fa-list"></i> 5 subtitles
                  <i class="lnir lnir-bookmark"></i> 13 actions</span
                >
              </template>
              <template #action>
                <V-Button color="primary" @click="showStudents = !showStudents">
                  Select
                </V-Button>
              </template>
            </V-Block>
          </V-Card>
        </div>
        <div v-if="showStudents" class="box-accordion">
          <AccordionSubmenu :items="data" exclusive />
        </div>
      </div>
      <!-- Products & Packages Menu -->
      <div class="box-menu">
        <div class="main-menu">
          <V-Card>
            <V-Block
              title="Products & Packages"
              subtitle="Manage Products & Packages"
              center
            >
              <template #icon>
                <VIconBox color="info" size="medium" rounded>
                  <i class="iconify" data-icon="feather:package"></i>
                </VIconBox>
              </template>
              <template #action>
                <V-Button color="primary" @click="showProducts = !showProducts">
                  Select
                </V-Button>
              </template>
            </V-Block>
          </V-Card>
        </div>
        <div v-if="showProducts" class="box-accordion">
          <AccordionSubmenu :items="data" exclusive />
        </div>
      </div>
      <!-- Permissions Menu -->
      <div class="box-menu">
        <div class="main-menu">
          <V-Card>
            <V-Block
              title="Permissions"
              subtitle="Manage Roles & Permissions"
              center
            >
              <template #icon>
                <VIconBox color="info" size="medium" rounded>
                  <i class="iconify" data-icon="feather:unlock"></i>
                </VIconBox>
              </template>
              <template #action>
                <V-Button
                  color="primary"
                  @click="showPermissions = !showPermissions"
                >
                  Select
                </V-Button>
              </template>
            </V-Block>
          </V-Card>
        </div>
        <div v-if="showPermissions" class="box-accordion">
          <AccordionSubmenu :items="data" exclusive />
        </div>
      </div>
    </div>
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
