<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  rows: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div v-for="row in rows" :key="row.id" class="flex-table-item">
    <div class="flex-table-cell is-media is-grow">
      <V-Avatar size="medium" :picture="row.picture" :badge="row.badge" />
      <div>
        <span class="item-name dark-inverted">{{ row.username }}</span>
        <span class="item-meta">
          <span>{{ row.position }}</span>
        </span>
      </div>
    </div>
    <div class="flex-table-cell" data-th="Team">
      <span class="light-text">{{ row.team }}</span>
    </div>
    <div class="flex-table-cell" data-th="Description">
      <span class="light-text mobile-text-right">{{ row.description }}</span>
    </div>
    <div class="flex-table-cell" data-th="Members">
      <V-AvatarStack
        class="is-pushed-mobile"
        size="small"
        :avatars="row.contacts"
        :limit="3"
      />
    </div>
    <!-- Dropdown Action -->
    <div class="flex-table-cell cell-end" data-th="Actions">
      <V-Dropdown
        icon="feather:more-vertical"
        class="is-pushed-mobile"
        spaced
        right
      >
        <template #content>
          <a role="menuitem" href="#" class="dropdown-item is-media">
            <div class="icon">
              <i aria-hidden="true" class="lnil lnil-eye"></i>
            </div>
            <div class="meta">
              <span>View</span>
              <span>View team info</span>
            </div>
          </a>

          <a role="menuitem" href="#" class="dropdown-item is-media">
            <div class="icon">
              <i aria-hidden="true" class="lnil lnil-pencil"></i>
            </div>
            <div class="meta">
              <span>Edit</span>
              <span>Edit team details</span>
            </div>
          </a>

          <hr class="dropdown-divider" />

          <a role="menuitem" href="#" class="dropdown-item is-media">
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
  </div>
</template>

<style lang="scss" scoped>
@media only screen and (max-width: 767px) {
  .mobile-text-right {
    text-align: right;
  }
}
</style>
