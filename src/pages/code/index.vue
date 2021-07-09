<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { toFormat } from '/@src/helpers/date.helper'
import useRedeemTable from '/@src/composable/redeem/use-redeem-table'
import { ref } from 'vue'
import { RedeemType } from '/@src/types/enums/redeem.enum'
pageTitle.value = 'Code Management'

useHead({
  title: 'Whitehouse: Code',
})
const {
  currentPage,
  perPage,
  total,
  data,
  fetchRedeemById,
  currentRedeem,
  createRedeem,
  createNewRedeem,
  packages,
  partners,
} = useRedeemTable()
const showCreatePopup = ref(false)
const toggleCreateRedeem = () => {
  showCreatePopup.value = !showCreatePopup.value
  if (!showCreatePopup.value) {
    createNewRedeem.value = {
      redeemType: RedeemType.DEFAULT,
      partnerId: 1,
      packageId: 0,
      ticketStartDate: '',
    }
  }
}
const redeemTypeChange = (value: string) => {
  if (value === RedeemType.GROUP) {
    createNewRedeem.value.amount = createNewRedeem.value.amount || 2
  } else {
    createNewRedeem.value.amount = undefined
  }
}

const create = async () => {
  const res = await createRedeem()
  if (res) toggleCreateRedeem()
}
</script>

<template>
  <div class="page-content-inner">
    <V-Modal
      title="Create Redeem"
      :open="showCreatePopup"
      size="medium"
      actions="center"
      @close="toggleCreateRedeem"
    >
      <template #content>
        <form class="modal-form">
          <div class="columns is-multiline">
            <div class="column is-12">
              <V-Field>
                <label>Redeem Type</label>
                <V-Control>
                  <Multiselect
                    v-model="createNewRedeem.redeemType"
                    placeholder="Select redeem type"
                    :options="['default', 'group']"
                    @change="redeemTypeChange"
                  >
                  </Multiselect>
                </V-Control>
              </V-Field>
            </div>
            <div class="column is-12">
              <V-Field>
                <label>Partner</label>
                <V-Control>
                  <Multiselect
                    v-model="createNewRedeem.partnerId"
                    placeholder="Select partner"
                    :options="partners"
                    :searchable="true"
                    track-by="partnerName"
                    value-prop="id"
                  >
                    <template #singlelabel="{ value }">
                      <div class="multiselect-single-label">
                        ({{ value.id }}) {{ value.partnerName }}
                      </div>
                    </template>
                    <template #option="{ option }">
                      <span class="select-option-text">
                        ({{ option.id }}) {{ option.partnerName }}
                      </span>
                    </template>
                  </Multiselect>
                </V-Control>
              </V-Field>
            </div>
            <div class="column is-12">
              <V-Field>
                <label>Package</label>
                <V-Control>
                  <Multiselect
                    v-model="createNewRedeem.packageId"
                    placeholder="Select package"
                    :options="packages"
                    :searchable="true"
                    track-by="packageName"
                    value-prop="id"
                  >
                    <template #singlelabel="{ value }">
                      <div class="multiselect-single-label">
                        ({{ value.id }}) {{ value.packageName }}
                      </div>
                    </template>
                    <template #option="{ option }">
                      <span class="select-option-text">
                        ({{ option.id }}) {{ option.packageName }}
                      </span>
                    </template>
                  </Multiselect>
                </V-Control>
              </V-Field>
            </div>
            <div class="column is-12">
              <v-date-picker
                v-model="createNewRedeem.ticketStartDate"
                color="orange"
                :model-config="{
                  type: 'string',
                  mask: 'YYYY-MM-DD',
                }"
                :masks="{
                  input: 'YYYY-MM-DD',
                }"
                trim-weeks
              >
                <template #default="{ inputValue, inputEvents }">
                  <V-Field>
                    <label>Ticket Start Date (Default: Today)</label>
                    <V-Control icon="feather:calendar">
                      <input
                        class="input"
                        type="text"
                        placeholder="Ticket Start Date"
                        :value="inputValue"
                        v-on="inputEvents"
                      />
                    </V-Control>
                  </V-Field>
                </template>
              </v-date-picker>
            </div>
            <div class="column is-12">
              <v-date-picker
                v-model="createNewRedeem.expireDate"
                color="orange"
                :model-config="{
                  type: 'string',
                  mask: 'YYYY-MM-DD',
                }"
                :masks="{
                  input: 'YYYY-MM-DD',
                }"
                trim-weeks
              >
                <template #default="{ inputValue, inputEvents }">
                  <V-Field>
                    <label
                      >Expire Redeem Date
                      (ปล่อยว่างไว้สำหรับไม่มีวันหมดอายุ)</label
                    >
                    <V-Control icon="feather:calendar">
                      <input
                        class="input"
                        type="text"
                        placeholder="Expire Redeem Date ปล่อยว่างไว้สำหรับไม่มีวันหมดอายุ"
                        :value="inputValue"
                        v-on="inputEvents"
                      />
                    </V-Control>
                  </V-Field>
                </template>
              </v-date-picker>
            </div>
            <div class="column is-12">
              <V-Field>
                <label>Amount</label>
                <V-Control icon="feather:hash">
                  <input
                    v-model="createNewRedeem.amount"
                    type="number"
                    class="input"
                    placeholder="ระบุเป็นจำนวนเต็มเท่านั้น *ระบุหากเลือก Type: Group"
                    :disabled="createNewRedeem.redeemType === 'default'"
                  />
                </V-Control>
              </V-Field>
            </div>
          </div>
        </form>
      </template>
      <template #action>
        <V-Button color="primary" raised @click="create">Create</V-Button>
      </template>
    </V-Modal>
    <V-Modal
      :title="`Redeem Detail ${currentRedeem?.id}`"
      :open="currentRedeem !== undefined"
      size="medium"
      actions="center"
      @close="currentRedeem = undefined"
    >
      <template v-if="currentRedeem" #content>
        <div v-if="currentRedeem.type !== 'group'" class="redeem-modal-content">
          <div class="content">
            <blockquote class="is-primary">
              <p class="subtitle is-5">Code</p>
              <h1 class="title is-1 is-narrow">
                {{ currentRedeem.code }}
              </h1>
            </blockquote>
          </div>
          <div v-if="currentRedeem.usedDate" class="columns is-multiline">
            <div class="column is-12">
              <p class="subtitle is-6">Student</p>
              <h2 class="title is-5 is-narrow">
                (id: {{ currentRedeem.studentId }})
                {{ currentRedeem.studentName }}
              </h2>
            </div>
            <div class="column is-12">
              <p class="subtitle is-6">Package Item</p>
              <h2 class="title is-5 is-narrow">
                {{ currentRedeem.packageItemId }}
              </h2>
            </div>
            <div class="column is-12">
              <p class="subtitle is-6">Activate Date</p>
              <h2 class="title is-5 is-narrow">
                {{ toFormat(currentRedeem.usedDate) }}
              </h2>
            </div>
          </div>
        </div>
      </template>
      <!-- <template #action>
        <V-Button color="danger" raised @click="confirmRemovePackage"
          >Confirm</V-Button
        >
      </template>
      <template #cancel>
        <V-Button color="primary" raised @click="toggleConfirmRemovePopup"
          >Cancel</V-Button
        >
      </template> -->
    </V-Modal>
    <ListTable
      v-if="data.length"
      :data="data"
      :current-page="currentPage"
      :per-page="perPage"
      :total="total"
    >
      <template #item="{ item }">
        <div class="meta-left">
          <h3>ID: {{ item.id }}</h3>
          <h3>Type: {{ item.type }}</h3>
          <h3>Partner: {{ item.partnerName }}</h3>
          <h3>Package: {{ item.packageName }}</h3>
          <span v-if="item.usedDate">
            Activated at: {{ toFormat(item.usedDate) }}
          </span>
        </div>
        <div class="right">
          <V-Button @click="fetchRedeemById(item.id)">View</V-Button>
          <h3>Created at: {{ toFormat(item.createdAt) }}</h3>
          <h3 v-if="item.expireDate">
            Expire date: {{ toFormat(item.expireDate, 'YYYY-MM-DD') }}
          </h3>
        </div>
      </template>
      <template #tabs>
        <div>
          <V-Button color="primary" @click="toggleCreateRedeem"
            >Create Redeem</V-Button
          >
        </div>
      </template>
    </ListTable>
  </div>
</template>

<style lang="scss" scoped>
.right {
  display: flex;
  flex-direction: column;
  margin-left: auto;
}
</style>
