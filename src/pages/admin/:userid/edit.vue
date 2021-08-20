<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useWindowScroll } from '@vueuse/core'
import { computed, ref } from 'vue'
import useViewAdmin from '/@src/composable/admin/use-view-admin'
const { adminInfo, saveInfo } = useViewAdmin()

const { y } = useWindowScroll()
const isStuck = computed(() => {
  return y.value > 30
})
</script>

<template>
  <div class="page-content-inner">
    <div class="form-layout">
      <V-Loader size="small" lighter grey translucent :active="isLoadingUser">
        <div class="form-outer">
          <div
            :class="[isStuck && 'is-stuck']"
            class="form-header stuck-header"
          >
            <div class="form-header-inner">
              <div class="left"><h3>Edit Admin</h3></div>
              <div class="right">
                <div class="buttons">
                  <V-Button color="primary" raised @click="saveInfo">
                    Done
                  </V-Button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="adminInfo" class="form-body">
            <AdminForm :info="adminInfo" />
          </div>
        </div>
      </V-Loader>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../scss/abstracts/_variables.scss';
@import '../../../scss/abstracts/_mixins.scss';
@import '../../../scss/pages/generic/_forms.scss';
</style>
