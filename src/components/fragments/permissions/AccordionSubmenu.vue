<script setup lang="ts">
import type { PropType } from 'vue'
import { defineProps, reactive } from 'vue'

type AccordionItem = {
  title: string
  content: string
}

const props = defineProps({
  items: {
    type: Array as PropType<AccordionItem[]>,
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

const internalOpenItems = reactive(props.openItems)
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

const actionItems = reactive([
  { id: 1, title: 'Create', description: 'Create new Item', selected: false },
  { id: 2, title: 'View', description: 'View all', selected: false },
  { id: 3, title: 'Update', description: 'Update Item', selected: false },
  { id: 4, title: 'Remove', description: 'Remove Item', selected: false },
  { id: 5, title: 'Details', description: 'See details', selected: false },
])

const toggleSelect = (id: number) => {
  const actionIdx = actionItems.findIndex((i) => i.id === id)
  console.log(actionIdx)
  actionItems[actionIdx].selected = !actionItems[actionIdx].selected
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
        {{ item.title }}
      </summary>
      <div class="accordion-content">
        <div class="submenu-actions">
          <div
            v-for="action in actionItems"
            :key="action.id"
            class="action-wrapper"
            @click="toggleSelect(action.id)"
          >
            <V-Card :class="action.selected ? 'selected' : 'deselected'">
              <V-Block
                :title="action.title"
                :subtitle="action.description"
                center
              >
                <template #icon>
                  <VIconBox
                    :color="action.selected ? 'green' : ''"
                    size="medium"
                    rounded
                  >
                    <i class="iconify" data-icon="feather:chrome"></i>
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
    grid-template-columns: auto auto;
    padding: 10px;

    .action-wrapper {
      padding: 5px;
      cursor: pointer;

      .selected {
        border: #93e088 solid 2px;
      }

      .deselected {
        border: transparent solid 2px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
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
