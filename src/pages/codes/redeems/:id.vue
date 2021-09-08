<script setup lang="ts">
// create redeems pages
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import useRedeemManagement from '/@src/composable/redeems/useRedeemManagement'
import { toFormat } from '/@src/helpers/date.helper'

const { fetchRedeemById, redeemDetail } = useRedeemManagement()
const route = useRoute()
const redeemId = computed(() => route.params.id as string)
onMounted(() => {
  fetchRedeemById(+redeemId.value)
})
</script>

<template>
  <div class="page-content-inner container redeem-content">
    <V-Card elevated>
      <div class="p-3">
        <template v-if="redeemDetail.length > 1">
          <div>group redeems</div>
        </template>
        <template v-else>
          <div v-for="detail in redeemDetail" :key="detail.id">
            <div>
              <h4 class="title is-5 mb-2">Partner: {{ detail.partnerName }}</h4>
              <h4 class="title is-5 mb-2">Package: {{ detail.packageName }}</h4>
            </div>
            <div class="content">
              <blockquote class="is-primary">
                <p class="subtitle is-5">Code</p>
                <h2 class="title is-1 is-narrow">
                  {{ detail.code }}
                </h2>
              </blockquote>
            </div>
            <div v-if="detail.usedDate" class="columns is-multiline">
              <div class="column is-12">
                <p class="subtitle is-6">Student</p>
                <h2 class="title is-5 is-narrow">
                  <span v-show="detail.studentId"
                    >(id: {{ detail.studentId }})</span
                  >
                  <span v-show="detail.studentName" class="ml-2">{{
                    detail.studentName
                  }}</span>
                </h2>
              </div>
              <div class="column is-12">
                <p class="subtitle is-6">Package Item</p>
                <h2 class="title is-5 is-narrow">
                  {{ detail.packageItemId }}
                </h2>
              </div>
              <div class="column is-12">
                <p class="subtitle is-6">Activate Date</p>
                <h2 class="title is-5 is-narrow">
                  {{ toFormat(detail.usedDate) }}
                </h2>
              </div>
            </div>
          </div>
        </template>
      </div>
    </V-Card>
  </div>
</template>
<style lang="scss" scoped>
.redeem-content {
  max-width: 740px;
  margin: 0 auto;
}
</style>
