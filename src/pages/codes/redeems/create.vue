<script setup lang="ts">
// create redeems pages

import useOptionApi from '/@src/composable/api/useOptionApi'
import useRedeemManagement from '/@src/composable/redeems/useRedeemManagement'

const { createNewRedeem, redeemTypeChange, createRedeem, isLoading } =
  useRedeemManagement()
const { getPartners, getPackages } = useOptionApi()
</script>

<template>
  <FormTemplate title="Create Redeem">
    <template #buttons>
      <V-Button
        color="primary"
        icon="lnir lnir-checkmark rem-100"
        :loading="isLoading"
        raised
        @click="createRedeem"
        >Submit</V-Button
      >
    </template>
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
            <SelectOption
              v-model="createNewRedeem.partnerId"
              placeholder="Select partner"
              :callback-search="getPartners"
              :searchable="true"
              label-by="partnerName"
              value-prop="id"
            />
          </V-Control>
        </V-Field>
      </div>
      <div class="column is-12">
        <V-Field>
          <label>Package</label>
          <V-Control>
            <SelectOption
              v-model="createNewRedeem.packageId"
              placeholder="Select package"
              :callback-search="getPackages"
              :searchable="true"
              label-by="packageName"
              value-prop="id"
            />
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
          :popover="{ visibility: 'click' }"
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
          :popover="{ visibility: 'click' }"
        >
          <template #default="{ inputValue, inputEvents }">
            <V-Field>
              <label
                >Expire Redeem Date (ปล่อยว่างไว้สำหรับไม่มีวันหมดอายุ)</label
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
  </FormTemplate>
</template>
