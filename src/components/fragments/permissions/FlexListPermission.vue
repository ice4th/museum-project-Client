<script setup lang="ts">
import { defineProps, ref, reactive } from 'vue'
import type { PropType } from 'vue'

/**
 * Define Properties
 */
const props = defineProps({
  items: {
    type: Array as PropType<any[]>,
    required: true,
  },
  showMessage: {
    type: Boolean,
    default: false,
  },
  colorMessage: {
    type: String,
    default: 'danger',
  },
})
</script>

<template>
  <div class="box-menu-list">
    <!-- Message -->
    <div v-show="showMessage" class="box-menu">
      <V-Message
        :key="colorMessage"
        :color="colorMessage"
        :closable="colorMessage === 'success'"
        @close="showMessage = false"
      >
        {{
          colorMessage === 'danger'
            ? 'Select permission for your role below at least 1 action.'
            : 'Verified'
        }}
        <span v-if="colorMessage === 'success'"
          ><i class="fas fa-check-circle"></i
        ></span>
      </V-Message>
    </div>
    <!-- Flex List -->
    <div v-for="(menu, key) in items" :key="key" class="box-menu">
      <div class="main-menu">
        <V-Card>
          <V-Block :title="menu.name" center>
            <template #icon>
              <VIconBox color="info" size="medium" rounded>
                <i class="iconify" :data-icon="menu.icon"></i>
              </VIconBox>
            </template>
            <template #default>
              <span>
                <i class="fas fa-list"></i> {{ menu.subtitles }} subtitles
                <i class="lnir lnir-bookmark"></i> {{ menu.actions }} actions
              </span>
            </template>
            <template #action>
              <V-Button
                :color="menu.show ? undefined : 'primary'"
                :icon="menu.show ? 'lnir lnir-close' : 'lnir lnir-plus'"
                @click="menu.show = !menu.show"
              >
                Select
              </V-Button>
            </template>
          </V-Block>
        </V-Card>
      </div>
      <div v-show="menu.show" class="box-accordion">
        <AccordionSubmenu :items="menu.subMenus" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box-menu-list .box-menu {
  padding-bottom: 10px;

  .main-menu .r-card {
    border-radius: 6px !important;
  }

  .box-accordion {
    margin-top: 5px;
  }
}
</style>
