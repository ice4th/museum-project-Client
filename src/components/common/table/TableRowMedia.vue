<script setup lang="ts">
import { computed, defineAsyncComponent, defineProps, onMounted } from 'vue'
import type { PropType } from 'vue'
const Avatar = defineAsyncComponent(
  () => import('/@src/components/base/avatar/V-Avatar.vue')
)

interface IHeader {
  key: string
  label: string
  showAs?: IShowAs
  display?: (data: unknown) => string
  action?: (data: object) => unknown
  options?: IOption[]
  tag?: ITag[]
}

type ShowAs = {
  [key in DisplayType]: string
} & {
  type?: DisplayType
}

interface ITag {
  label: string
  class: TagClass
}

interface IOption {
  label: string
  value: unknown
}

interface IButton {
  action?: (data: unknown) => unknown
  color?: Color
}

interface IButtonLink {
  link: string
  color?: Color
}

interface IShowAs {
  tag?: ITag[]
  avatar?: boolean
  link?: (data: object) => { path: string; query?: object }
  button?: IButton
  buttonLink?: IButtonLink
}

type DisplayType = 'badge' | 'avatar' | 'action' | 'text' | 'tag'

type TagClass = 'is-success' | '' | 'is-info' | 'is-orange' // '' is Disabled

type Color = 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'white'

const props = defineProps({
  rows: {
    type: Array,
    required: true,
    default: [],
  },
  headers: {
    type: Array as PropType<IHeader[]>,
    required: true,
    default: [],
  },
  total: {
    type: Number,
    default: 0,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  perPage: {
    type: Number,
    default: 10,
  },
  canSearchable: {
    type: Boolean,
    default: true,
  },
})

onMounted(() => {
  // console.log(props.rows)
})

const showAs = computed((args: ShowAs) => {
  switch (args.type) {
    case 'avatar':
      console.log('avatar new')
      return `<V-Avatar size="medium" :picture="${args.avatar}" />`
    case 'badge':
      return `<V-Avatar size="medium" :picture="${args.avatar}" :badge="${args.badge}"/>`
    case 'text':
      return `<span class="light-text"> ${args.text} </span>`
    default:
      return ''
  }
})
</script>

<template>
  <div class="flex-table-wrapper mt-4">
    <V-FlexTable class="table is-hoverable is-fullwidth">
      <template #header>
        <div class="flex-table-header">
          <span v-for="(header, idxH) in headers" :key="`h-${idxH}`">
            {{ header.label }}
          </span>
        </div>
      </template>
      <template #body>
        <div
          v-for="(row, idxR) in rows"
          :key="`r-${idxR}`"
          class="flex-table-item"
        >
          <div
            v-for="(header, idxC) in headers"
            :key="`c-${idxC}`"
            :class="'flex-table-cell'"
            :data-th="header.label"
          >
            <!-- Need to display data like avatar -->
            <component
              v-if="header.showAs?.avatar"
              :is="Avatar"
              v-bind="{
                picture: header.display ? header.display(row) : row[header.key],
                size: 'medium',
              }"
            />
            <!-- Need to display data like tag -->
            <span
              v-if="header.showAs?.tag"
              class="tag is-rounded"
              :class="[
                header.showAs.tag.find((t) => t.label == row[header.key])
                  ?.class || '',
              ]"
            >
              {{ header.display ? header.display(row) : row[header.key] }}
            </span>
            <!--  Need to display link -->
            <router-link
              v-if="header.showAs?.link"
              :to="header.showAs?.link(row)"
              class="link"
            >
              {{
                header.display ? header.display(row) : row[header.key]
              }}</router-link
            >
            <!-- Just display data or custom data before display-->
            <span v-if="!header.showAs" class="light-text">{{
              header.display ? header.display(row) : row[header.key]
            }}</span>
          </div>
        </div>
      </template>
    </V-FlexTable>
  </div>
</template>
<!-- <component
      v-if="header.showAs"
      :is="
        showAs({
          [header.showAs]: row[header.key],
          type: header.showAs,
        })
      "
    ></component> -->
<style lang="scss" scoped>
.link {
  color: #a2a5b9;
  border-bottom: 1px solid white;
  &:hover {
    color: #e9e9e9;
  }
}
</style>
