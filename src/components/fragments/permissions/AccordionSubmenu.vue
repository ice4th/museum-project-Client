<script setup lang="ts">
import type { PropType } from 'vue'
import { defineEmit, defineProps, reactive } from 'vue'

type AccordionItem = {
  title: string
  content: string
}

const props = defineProps({
  items: {
    type: Array as PropType<any[]>,
    required: true,
  },
  openItems: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
  exclusive: {
    type: Boolean,
    default: false,
  },
})

/**
 * Define Emit
 */
const emit = defineEmit(['selected'])

/**
 * Variables
 */
const internalOpenItems = reactive(props.openItems)
let selectedSubMenus = reactive<any[]>([])

/**
 * Methods
 */
const toggle = (key: number) => {
  const wasOpen = internalOpenItems.includes(key)

  if (props.exclusive) {
    internalOpenItems.splice(0, internalOpenItems.length)

    if (!wasOpen) {
      internalOpenItems.push(key)
    }

    return
  }

  if (wasOpen) {
    internalOpenItems.splice(internalOpenItems.indexOf(key), 1)
  } else {
    internalOpenItems.push(key)
  }
}
const onSelected = (key: number, val: any) => {
  const item = props.items[key]
  // find exist sub menu
  let subMenuItem = selectedSubMenus.find(
    ({ subMenu }) => subMenu === item.name
  )
  if (!subMenuItem) {
    subMenuItem = {
      subMenu: item.name,
      actions: [],
      key,
    }
  }
  // add or remove tag in sub menu
  if (subMenuItem.actions.some((x: any) => x.id === val.id)) {
    subMenuItem.actions = subMenuItem.actions.filter(
      (action: any) => action.id !== val.id
    )
  } else {
    subMenuItem.actions.push(val)
  }
  // update sub menu in selected items
  selectedSubMenus = selectedSubMenus.filter(
    ({ subMenu }) => subMenu !== subMenuItem.subMenu
  )
  if (subMenuItem.actions.length > 0) {
    selectedSubMenus.push(subMenuItem)
  }
  // emit selected items
  emit('selected', selectedSubMenus)
}
</script>

<template>
  <div class="single-accordion" :class="[exclusive && 'is-exclusive']">
    <details
      v-for="(item, key) in items"
      :key="key"
      class="accordion-item"
      :open="!internalOpenItems.includes(key)"
      :class="[internalOpenItems.includes(key) && 'is-active']"
    >
      <summary class="accordion-header" @click="() => toggle(key)">
        {{ item.name }}
      </summary>
      <div class="accordion-content">
        <div class="submenu-actions">
          <div
            v-for="action in item.actions"
            :key="action.id"
            class="action-wrapper"
            @click="
              onSelected(key, action), (action.selected = !action.selected)
            "
          >
            <V-Card :class="action.selected ? 'selected' : undefined">
              <V-Block
                :title="action.name.replace(/_/g, ' ')"
                :subtitle="action.description"
                center
              >
                <template #icon>
                  <VIconBox
                    :color="action.selected ? 'info' : undefined"
                    size="small"
                    rounded
                  >
                    <i
                      :class="
                        action.selected
                          ? 'lnir lnir-lock-alt-1'
                          : 'lnir lnir-lock-alt-2'
                      "
                    ></i>
                  </VIconBox>
                </template>
              </V-Block>
            </V-Card>
          </div>
        </div>
      </div>
    </details>
  </div>
</template>

<style lang="scss" scoped>
summary {
  outline: none;
  list-style: none;

  &::marker {
    display: none;
  }
}

.accordion-content {
  padding: 0;
  margin: 0;

  * {
    box-sizing: border-box;
  }

  .submenu-actions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 20px;

    .action-wrapper {
      padding: 5px;
      cursor: pointer;

      .selected {
        border: #039be5 dashed 1px;
      }

      .r-card {
        padding: 10px;
      }
    }
  }
}

@media only screen and (max-device-width: 1024px) {
  .accordion-content {
    padding: 0;
    margin: 0;

    * {
      box-sizing: border-box;
    }

    .submenu-actions {
      display: grid;
      grid-template-columns: auto;
      padding: 10px;

      .action-wrapper {
        padding: 5px;
        cursor: pointer;

        .r-card {
          padding: 10px;
        }
      }
    }
  }
}
</style>
