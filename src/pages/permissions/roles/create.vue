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

/**
 * activeSidebar is an exported ref() that we can use everywhere
 * @see /src/components/navigation/desktop/sidebar/subsidebars/GenericSidebar.vue
 */
import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
import useCreateRole from '/@src/composable/permissions/useCreateRole'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import type { ISelectedMenuItem } from '/@src/types/interfaces/permission.interface'

pageTitle.value = 'Create Role'

useHead({
  title: 'Whitehouse Create Role',
})

const {
  // state
  menuItems,
  roleName,
  roleDescription,
  menuLoading,
  loadingOption,
  teamOptions,
  teamId,
  // computed
  showMessage,
  colorMessage,
  verifyMessage,
  selectedItems,
  disabledCreateBtn,
  // methods
  fetchTeamsOption,
  onCreate,
  onClear,
} = useCreateRole()
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
            <p v-show="roleName.trim().length < 4" class="help text-danger">
              Role name required atleast 4 characters.
            </p>
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
            <p
              v-show="roleDescription.trim().length < 12"
              class="help text-danger"
            >
              Role description required atleast 12 characters.
            </p>
          </V-Field>
          <V-Field class="is-autocomplete-select">
            <label>Team</label>
            <V-Control icon="feather:search" :loading="loadingOption">
              <!-- <Multiselect
                v-model="teamId"
                placeholder="Select team"
                :options="teamOptions"
                :searchable="true"
                track-by="name"
                value-prop="id"
              >
                <template #singlelabel="{ value }">
                  <div class="multiselect-single-label">
                    ({{ value.id }}) {{ value.name }}
                  </div>
                </template>
                <template #option="{ option }">
                  <span class="select-option-text">
                    ({{ option.id }}) {{ option.name }}
                  </span>
                </template>
              </Multiselect> -->
              <SelectOption
                v-model="teamId"
                :callback-search="fetchTeamsOption"
                tract-by="name"
                value-prop="id"
                placeholder="Select team"
              />
              <p v-show="!teamId" class="help text-danger">
                Choose team for this role.
              </p>
            </V-Control>
          </V-Field>
        </div>
        <!-- Create Button -->
        <div class="align-button mt-4 py-4">
          <V-Buttons>
            <V-Button :loading="menuLoading" @click="onClear"> Clear </V-Button>
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
            v-for="(item, key) in selectedItems"
            :key="key"
            class="media-flex"
          >
            <V-IconBox :key="item.icon" size="small" color="primary">
              <i class="iconify" :data-icon="item.icon"></i>
            </V-IconBox>
            <div class="flex-meta">
              <span>{{ item.name }}</span>
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
                <h3 class="pb-1">{{ subItem.name }}</h3>
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

    <FlexListPermission
      :items="menuItems"
      :show-message="verifyMessage"
      :color-message="colorMessage"
    />
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
