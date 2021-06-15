<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  light: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()
const isLoading = ref(false)

router.beforeEach(() => {
  isLoading.value = true
})
router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 200)
})
</script>

<template>
  <img src="/@src/assets/img/globish-logo.png" alt="" />
</template>

<style lang="scss" scoped>
@import '../scss/abstracts/_variables.scss';
@import '../scss/layout/_sidebar.scss';

.right {
  fill: darken($primary, 7%);
}
.bottom {
  fill: $primary;
}
.left {
  fill: lighten($primary, 15%);
}

.is-roll {
  .right {
    animation: is-roll-right 8s ease infinite;
    animation-fill-mode: forwards;
    animation-delay: 4s;
  }
  .left {
    animation: is-roll-left 8s ease infinite;
    animation-fill-mode: forwards;
    animation-delay: 4s;
  }
  .bottom {
    animation: is-roll-bottom 8s ease infinite;
    animation-fill-mode: forwards;
    animation-delay: 4s;
  }
}

.is-light {
  .right {
    fill: #fff;
    animation: none;
  }
  .bottom {
    fill: #fffc;
    animation: none;
  }
  .left {
    fill: #fffa;
    animation: none;
  }
}

@keyframes is-roll-right {
  0% {
    fill: darken($primary, 7%);
  }
  33% {
    fill: #1ee8c0;
  }
  66% {
    fill: lighten($h-green, 15%);
  }
  100% {
    fill: darken($primary, 7%);
  }
}

@keyframes is-roll-bottom {
  0% {
    fill: $primary;
  }
  33% {
    fill: darken(#1ee8c0, 7%);
  }
  66% {
    fill: $h-green;
  }
  100% {
    fill: $primary;
  }
}

@keyframes is-roll-left {
  0% {
    fill: lighten($primary, 15%);
  }
  33% {
    fill: lighten(#1ee8c0, 15%);
  }
  66% {
    fill: darken($h-green, 7%);
  }
  100% {
    fill: lighten($primary, 15%);
  }
}
</style>
