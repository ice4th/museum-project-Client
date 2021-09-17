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
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

router.replace({ name: 'not-found' })
// useHead({
//   title: 'Page not found - Vuero',
//   meta: [
//     {
//       name: 'robots',
//       content: 'noindex',
//     },
//   ],
// })
</script>
