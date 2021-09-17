<script setup lang="ts">
import { pageTitle } from '/@src/state/sidebarLayoutState'
import useRoleDetails from '../../../../composable/permissions/useRoleDetails'

pageTitle.value = 'Role Details'

const {
  roleData,
  teamOptions,
  // loading
  loadingRole,
  loadingOption,
  // computed
  userData,
  selectedItems,
  // methods
  fetchTeamsOption,
} = useRoleDetails()
</script>

<template>
  <div class="box-container">
    <div v-if="!roleData && !loadingRole">
      <div class="error-container">
        <div class="error-wrapper">
          <div class="error-inner has-text-centered">
            <div class="bg-number">404</div>
            <img
              src="/@src/assets/illustrations/placeholders/error-1.svg"
              alt=""
            />
            <h3>We couldn't find that page</h3>
            <p>
              Looks like we couldn't find that page. Please try again or contact
              an administrator if the problem persists.
            </p>
            <div class="button-wrap">
              <V-Button
                color="primary"
                elevated
                :to="{ name: 'permissions-roles' }"
              >
                Take me Back
              </V-Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="roleData && !loadingRole" class="box-permission">
      <V-Card>
        <!-- Header -->
        <div class="py-4">
          <h3 class="text-header">Role Details</h3>
        </div>
        <!-- Input Field -->
        <div>
          <V-Field>
            <label>Role name</label>
            <V-Control icon="lnil lnil-protection">
              <input
                v-model="roleData.name"
                type="text"
                class="input"
                disabled
                placeholder="Role name"
              />
            </V-Control>
            <p
              v-show="roleData.name.trim().length < 4"
              class="help text-danger"
            >
              Role name required atleast 4 characters.
            </p>
          </V-Field>
          <V-Field>
            <label>Role description</label>
            <V-Control>
              <textarea
                v-model="roleData.description"
                class="textarea"
                rows="3"
                disabled
                placeholder="A description for this role..."
              ></textarea>
            </V-Control>
            <p
              v-show="roleData.description.trim().length < 12"
              class="help text-danger"
            >
              Role description required atleast 12 characters.
            </p>
          </V-Field>
          <V-Field class="is-autocomplete-select">
            <label>Team</label>
            <V-Control icon="feather:search" :loading="loadingOption">
              <SelectOption
                v-model="roleData.teamId"
                :callback-search="fetchTeamsOption"
                disabled
                tract-by="name"
                value-prop="id"
                placeholder="Select team"
              />
              <p v-show="!roleData.teamId" class="help text-danger">
                Choose team for this role.
              </p>
            </V-Control>
          </V-Field>
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

      <!--V-FlexTable-->
      <V-FlexTable class="pt-5">
        <template #header>
          <div class="flex-table-header">
            <span class="is-grow">User</span>
            <span>Name</span>
            <span>Status</span>
            <span>Manage</span>
            <span>Last Login</span>
          </div>
        </template>
        <template #body>
          <FlexTableUser :rows="userData" />
        </template>
      </V-FlexTable>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../../scss/abstracts/_variables.scss';
@import '../../../../scss/abstracts/_mixins.scss';
@import '../../../../scss/pages/generic/_forms.scss';
@import '../../../../scss/pages/generic/_utility.scss';

* {
  box-sizing: border-box;
}

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
    max-width: 768px;

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
}
</style>
