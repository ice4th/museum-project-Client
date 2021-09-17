<script setup lang="ts">
import type { PropType } from 'vue'

type AvatarStackSize = undefined | 'small' | 'medium' | 'large' | 'big' | 'xl'
type AvatarItem = {
  picture?: string
  initials?: string
  color?: string
  name?: string
}

const props = defineProps({
  avatars: {
    type: Array as PropType<AvatarItem[]>,
    required: false,
    default: () => [],
  },
  size: {
    type: String as PropType<AvatarStackSize>,
    default: undefined,
    validator: (value: AvatarStackSize) => {
      // The value must match one of these strings
      if (
        [undefined, 'small', 'medium', 'large', 'big', 'xl'].indexOf(value) ===
        -1
      ) {
        console.warn(
          `V-AvatarStack: invalid "${value}" size. Should be small, medium, large, big, xl or undefined`
        )
        return false
      }

      return true
    },
  },
  limit: {
    type: Number,
    default: 5,
  },
})
</script>

<template>
  <div class="avatar-stack">
    <slot>
      <V-Avatar
        v-for="(avatar, index) in avatars.slice(0, limit)"
        :key="index"
        v-tooltip="avatar.name"
        :size="size"
        :picture="avatar.picture"
        :initials="avatar.initials"
        :color="avatar.color"
      />
      <div
        v-if="avatars.length > limit"
        class="v-avatar"
        :class="[size && 'is-' + size]"
      >
        <span class="avatar is-more">
          <span class="inner">
            <span
              v-tooltip="
                `${avatars
                  .slice(limit, limit + limit)
                  .map(({ name }) => name)
                  .join(', ')}
                  ${avatars.length - limit > limit ? 'and other' : ''}
                `
              "
              >+{{ avatars.length - limit }}</span
            >
          </span>
        </span>
      </div>
    </slot>
  </div>
</template>
