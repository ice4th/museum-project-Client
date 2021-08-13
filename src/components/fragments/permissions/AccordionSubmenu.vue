<script setup lang="ts">
import type { PropType } from 'vue'
import { defineProps, reactive } from 'vue'

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
 * Variables
 */
const internalOpenItems = reactive(props.openItems)

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
            @click="action.selected = !action.selected"
          >
            <V-Card :class="action.selected ? 'selected' : undefined">
              <V-Block
                :title="action.name.replace(/_/g, ' ')"
                :subtitle="action.description"
                center
              >
                <template #icon>
                  <VIconBox
                    :key="action.selected"
                    :color="action.selected ? 'info' : ''"
                    size="small"
                    rounded
                  >
                    <i
                      class="iconify"
                      :data-icon="
                        action.selected ? 'feather:unlock' : 'feather:lock'
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
