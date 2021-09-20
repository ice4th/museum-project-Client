<script setup lang="ts">
/**
 * This is a Vue Component that will be
 * automatically mapped to a catch allpath on vue-router (404).
 *
 * You will be able to access this page  at http://localhost:3000/non-existing-page
 *
 * Read more about routing:
 * @see /vite.config.ts
 * @see /src/router.ts
 */

import { useHead } from '@vueuse/head'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

useHead({
  title: 'Page not found - Vuero',
  meta: [
    {
      name: 'robots',
      content: 'noindex',
    },
  ],
})
const errorCode = ref(route.params.id || 404)
const message = ref(route.params.message || `We couldn't find that page`)
const content = ref(
  route.params.content ||
    `Looks like we couldn't find that page. Please try again or contact an administrator if the problem persists.`
)
</script>

<template>
  <LandingLayout>
    <div class="error-container">
      <div class="error-wrapper">
        <div class="error-inner has-text-centered">
          <div class="bg-number dark-inverted">{{ errorCode }}</div>
          <img
            class="light-image"
            src="/@src/assets/illustrations/placeholders/error-2.svg"
            alt=""
          />
          <img
            class="dark-image"
            src="/@src/assets/illustrations/placeholders/error-2-dark.svg"
            alt=""
          />
          <h3 class="dark-inverted">{{ message }}</h3>
          <p>{{ content }}</p>
          <div class="button-wrap">
            <div class="buttons is-justify-content-center">
              <V-Button
                icon="feather:arrow-left"
                elevated
                @click="$router.go(-1)"
              >
                Take me Back
              </V-Button>
              <V-Button
                icon="feather:home"
                color="primary"
                elevated
                :to="{ name: 'index' }"
              >
                Home
              </V-Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </LandingLayout>
</template>

<style lang="scss">
@import '../scss/abstracts/_variables.scss';
@import '../scss/abstracts/_mixins.scss';
@import '../scss/pages/generic/_utility.scss';
.error-container .error-wrapper .error-inner .bg-number {
  font-size: 24rem;
}
</style>
