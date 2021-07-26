<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'
import ticketType from '/@src/data/ticket-type.json'
import { toFormat } from '/@src/helpers/date.helper'

const ticketTypeOptions = ticketType

const props = defineProps({
  packageItems: {
    type: Array,
    default: [],
  },
  validation: {
    type: Object,
    default: {},
  },
  canActivate: {
    type: Boolean,
    default: false,
  },
})
const internalPackageItems = ref(props.packageItems)
</script>
<template>
  <V-CardAction
    v-for="(packageItem, idx) in internalPackageItems"
    :key="`pk-${idx}`"
    :avatar="packageItem.packageImage"
    :title="`(ID: ${packageItem.packageId}) ${packageItem.packageName}`"
    :subtitle="`Package Item ID: ${packageItem.packageItemId}`"
    class="mb-5"
  >
    <template #action>
      <PackageAction
        :can-activate="canActivate"
        :package-item-id="packageItem.packageItemId"
      />
    </template>
    <table class="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th scope="col">Ticket Type</th>
          <th scope="col" class="has-text-centered">Count Ticket</th>
          <th scope="col" class="has-text-centered">Start Date</th>
          <th scope="col" class="has-text-centered">Expire Date</th>
          <th scope="col" class="is-end">
            <div class="dark-inverted is-flex is-justify-content-flex-end">
              Manage Ticket
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(ticket, idxTicket) in packageItem.tickets"
          :key="`ticket-${idxTicket}-${idx}`"
        >
          <td>
            {{
              ticketTypeOptions.find((type) => type.value == ticket.type)
                ?.text || '-'
            }}
          </td>
          <td class="has-text-centered">{{ ticket.remain }}</td>
          <td class="has-text-centered">
            {{
              ticket.startDate ? toFormat(ticket.startDate, 'DD-MM-YYYY') : '-'
            }}
          </td>
          <td class="has-text-centered">
            {{
              ticket.expireDate
                ? toFormat(ticket.expireDate, 'DD-MM-YYYY')
                : '-'
            }}
          </td>
          <td class="is-end">
            <div class="is-flex is-justify-content-flex-end">
              <TicketAction />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </V-CardAction>
</template>

<style lang="scss" scoped>
.s-card.is-raised,
.flex-table .flex-table-item {
  width: 95% !important;
}
</style>
