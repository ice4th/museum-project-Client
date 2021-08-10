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
})

/**
 * Define Emit
 */
const emit = defineEmits(['selected'])

/**
 * Variables
 */
const showMessage = ref(true)
let selectedMainMenus = reactive<any[]>([])

/**
 * Methods
 */
const onSelected = (value: any, key: number) => {
  const item = props.items[key]

  let mainMenuItem = selectedMainMenus.find(
    ({ mainMenu }) => mainMenu === item.name
  )

  const val = value.sort((a: any, b: any) => a.key - b.key)
  mainMenuItem = {
    key,
    mainMenu: mainMenuItem?.mainMenu || item.name,
    icon: mainMenuItem?.icon || item.icon,
    subtitles: val.length,
    actions: val.map((v: any) => v.actions).flat().length,
    subMenus: val,
  }
  // update main menu in selected items
  selectedMainMenus = selectedMainMenus.filter(
    ({ mainMenu }) => mainMenu !== mainMenuItem.mainMenu
  )
  if (mainMenuItem.subMenus.length > 0) {
    selectedMainMenus.push(mainMenuItem)
  }
  // emit selected items
  emit('selected', selectedMainMenus)
}
</script>

<template>
  <div class="box-menu-list">
    <!-- Message -->
    <div v-show="showMessage" class="box-menu">
      <V-Message closable @close="showMessage = false">
        Select permission for your role below at least 1 action.
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
        <AccordionSubmenu
          :items="menu.subMenus"
          @selected="onSelected($event, key)"
        />
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
