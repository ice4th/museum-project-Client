<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import useTeamTable from '/@src/composable/permission/use-team-table'
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
} = useTeamTable()
</script>

<template>
  <div class="page-content-inner">
    <Datatable
      :headers="teamTableHeaders"
      :data="teamInfo"
      :current-page="currentPage"
      :per-page="perPage"
      :total="total"
      :is-loading="isloading"
      :search="search"
    >
      <!-- <template #avatar="{ value }">
        <V-AvatarStack :avatars="value" size="small" />
      </template>
       -->
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
                  name: 'permission-team-:id-edit',
                  params: { id: `${value.id}` },
                }"
              >
                <div class="icon">
                  <i aria-hidden="true" class="lnil lnil-pencil"></i>
                </div>
                <div class="meta">
                  <span>Edit</span>
                  <span>Edit team details</span>
                </div>
              </RouterLink>
              <a
                role="menuitem"
                class="dropdown-item is-media"
                @click="deleteTeam(value.id)"
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
