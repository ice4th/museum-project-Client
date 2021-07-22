<script setup lang="ts">
import { defineProps, onBeforeMount, onMounted, ref } from 'vue'
import type { PropType } from 'vue'
import type { StudentPackageItemResponse } from '/@src/types/interfaces/package-item.interface'
import _ from 'lodash'
import type { ITicketInfo } from '/@src/types/interfaces/ticket.interface'
const props = defineProps({
  packageItems: {
    type: Array,
  },
  inactivePackage: {
    type: Array,
  },
  activePackages: {
    type: Array as PropType<StudentPackageItemResponse[]>,
    default: [],
  },
  validation: {
    type: Object,
    default: {},
  },
})
const internalActivePackage = ref<StudentPackageItemResponse[]>(
  props.activePackages
)

const { activePackages, inactivePackages, expirePackages } = {
  inactivePackages: [
    {
      packageItemId: 1,
      packageId: 2322,
      packageName: 'English Speaking Lab for Junior',
      packageImage: '/Kids course/package-cover/english-junior.jpg',
      tickets: {
        subscriptionTicket: {
          remain: 1,
          startDate: '-',
          expireDate: '12 Dec 2021',
        },
      },
    },
  ],
  activePackages: [
    {
      packageItemId: 2,
      packageId: 923,
      packageName: 'Find My Coach Business G1-G2',
      packageImage: '/Kids course/package-cover/english-junior.jpg',
      tickets: {
        privateClassTicket: {
          remain: 21,
          startDate: '12 Jul 2021',
          expireDate: '1 Oct 2021',
        },
      },
    },
    {
      packageItemId: 3,
      packageId: 1121,
      packageName: 'General English G2',
      packageImage: null,
      tickets: {
        privateClassTicket: {
          remain: 11,
          startDate: '12 Jul 2021',
          expireDate: '1 Oct 2021',
        },
        discussionClassTicket: {
          remain: 3,
          startDate: '12 Jul 2021',
          expireDate: '1 Oct 2021',
        },
        masterClassTicket: {
          remain: 3,
          startDate: '12 Jul 2021',
          expireDate: '1 Oct 2021',
        },
        freetalkTicket: {
          remain: 1,
          startDate: '12 Jul 2021',
          expireDate: '1 Oct 2021',
        },
      },
    },
  ],
  expirePackages: [],
}

const ticketTypeName = {
  privateClassTicket: 'Private Class',
  discussionClassTicket: 'Dicussion Class',
  masterClassTicket: 'Master Class',
  freetalkTicket: 'Freetalk',
  subscriptionTicket: 'Speaking Lab',
}
onBeforeMount(() => {
  // internalActivePackage.value = props.activePackages
  // console.log('data', internalActivePackage.value)
  // console.log(activePackages)
})
</script>
<template>
  <V-CardAdvanced>
    <template #header-left>
      <h3 class="card-header-title">Inactive Package</h3>
    </template>
    <template #content>
      <V-CardAction
        v-for="(inactivePackage, idxAp) in inactivePackages"
        :key="`pk-${idxAp}`"
        :avatar="
          inactivePackage.packageImage
            ? `https://d1627oxh4wmxfp.cloudfront.net${inactivePackage?.packageImage}`
            : '/@src/assets/img/globish-logo.png'
        "
        :title="inactivePackage.packageName"
      >
        <template #action>
          <PackageAction />
        </template>
        <V-FlexTable>
          <template #header>
            <div class="flex-table-header">
              <span>Ticket Type</span>
              <span class="cell-center">Count Ticket</span>
              <span>Start Date</span>
              <span>Expire Date</span>
              <span class="cell-end">Actions</span>
            </div>
          </template>
          <template #body>
            <div
              v-for="(ticket, idxTicket) in inactivePackage.tickets"
              :key="`ticket-${idxTicket}-${idxAp}`"
              class="flex-table-item"
            >
              <div class="flex-table-cell" data-th="Ticket Type">
                <div>
                  <span class="item-name">{{ ticketTypeName[idxTicket] }}</span>
                </div>
              </div>
              <div
                class="flex-table-cell is-justify-content-center"
                data-th="Count Ticket"
              >
                <span class="light-text">{{ ticket.remain }}</span>
              </div>
              <div class="flex-table-cell" data-th="Start Date">
                <span class="light-text">{{ ticket.startDate || '-' }}</span>
              </div>
              <div class="flex-table-cell" data-th="Expire Date">
                <span class="light-text">{{ ticket.expireDate || '-' }}</span>
              </div>
              <div class="flex-table-cell cell-end" data-th="Actions">
                <PackageAction />
              </div>
            </div>
          </template>
        </V-FlexTable>
      </V-CardAction>
    </template>
    å</V-CardAdvanced
  >

  <V-CardAdvanced>
    <template #header-left>
      <h3 class="card-header-title">Active Package</h3>
    </template>
    <template #content>
      <V-CardAction
        v-for="(activePackage, idxAp) in activePackages"
        :key="`pk-${idxAp}`"
        :avatar="
          activePackage.packageImage
            ? `https://d1627oxh4wmxfp.cloudfront.net${activePackage?.packageImage}`
            : '/@src/assets/img/globish-logo.png'
        "
        :title="activePackage.packageName"
      >
        <template #action>
          <PackageAction />
        </template>
        <V-FlexTable>
          <template #header>
            <div class="flex-table-header">
              <span>Ticket Type</span>
              <span class="cell-center">Count Ticket</span>
              <span>Start Date</span>
              <span>Expire Date</span>
              <span class="cell-end">Actions</span>
            </div>
          </template>
          <template #body>
            <div
              v-for="(ticket, idxTicket) in activePackage.tickets"
              :key="`ticket-${idxTicket}-${idxAp}`"
              class="flex-table-item"
            >
              <div class="flex-table-cell" data-th="Ticket Type">
                <div>
                  <span class="item-name">{{ ticketTypeName[idxTicket] }}</span>
                </div>
              </div>
              <div
                class="flex-table-cell is-justify-content-center"
                data-th="Count Ticket"
              >
                <span class="light-text">{{ ticket.remain }}</span>
              </div>
              <div class="flex-table-cell" data-th="Start Date">
                <span class="light-text">{{ ticket.startDate || '-' }}</span>
              </div>
              <div class="flex-table-cell" data-th="Expire Date">
                <span class="light-text">{{ ticket.expireDate || '-' }}</span>
              </div>
              <div class="flex-table-cell cell-end" data-th="Actions">
                <PackageAction />
              </div>
            </div>
          </template>
        </V-FlexTable>
      </V-CardAction>
    </template>
  </V-CardAdvanced>
</template>
