<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import useTeamTable from '/@src/composable/permissions/useTeamTable'
import { ref } from 'vue'
pageTitle.value = 'Team'
useHead({
  title: 'Whitehouse Team',
})
const {
  teamInfo,
  currentPage,
  perPage,
  search,
  total,
  isloading,
  teamTableHeaders,
  memberInfo,
  deleteTeam,
  confirmRemove,
  parseAvatarStack,
} = useTeamTable()
</script>

<template>
  <div class="page-content-inner">
    <V-Modal
      :open="confirmRemove"
      actions="center"
      @close="confirmRemove = undefined"
    >
      <template #content>
        <V-PlaceholderSection
          title="Remove confirm"
          subtitle="Are you sure to remove this team ?"
        />
      </template>
      <template #action>
        <V-Button color="primary" raised @click="deleteTeam(confirmRemove)"
          >Confirm</V-Button
        >
      </template>
    </V-Modal>
    <Datatable
      :headers="teamTableHeaders"
      :data="teamInfo"
      :current-page="currentPage"
      :per-page="perPage"
      :total="total"
      :is-loading="isloading"
      :search="search"
      is-action
    >
      <template #member="{ value }">
        <V-AvatarStack :avatars="value.admins" size="small" />
      </template>

      <template #action="{ value }">
        <div class="dark-inverted is-flex is-justify-content-flex-end">
          <V-Dropdown spaced right>
            <template #button="{ toggle }">
              <V-Button
                icon="feather:more-vertical"
                class="is-trigger"
                @click="toggle"
              >
                Actions
              </V-Button>
            </template>
            <template #content>
              <RouterLink
                role="menuitem"
                class="dropdown-item is-media"
                :to="{
                  name: 'permissions-teams-:id',
                  params: { id: `${value.id}` },
                }"
              >
                <div class="icon">
                  <i aria-hidden="true" class="lnil lnil-eye"></i>
                </div>
                <div class="meta">
                  <span>View</span>
                  <span>View team details</span>
                </div>
              </RouterLink>
              <a
                role="menuitem"
                class="dropdown-item is-media"
                @click="confirmRemove = value.id"
              >
                <div class="icon">
                  <i aria-hidden="true" class="lnil lnil-trash-can-alt"></i>
                </div>
                <div class="meta">
                  <span>Remove</span>
                  <span>Remove from list</span>
                </div>
              </a>
            </template>
          </V-Dropdown>
        </div>
      </template>
    </Datatable>
  </div>
</template>
