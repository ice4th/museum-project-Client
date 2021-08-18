<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import ticketType from '/@src/data/ticket-type.json'
import { toFormat } from '/@src/helpers/date.helper'

const ticketTypeOptions = ticketType

const props = defineProps({
  packageItems: {
    type: Array,
    default: () => [],
  },
  canActivate: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits([
  'activate-package',
  'add-ticket',
  'change-expire',
  'send-package',
  'change-package',
  'remove-package',
  'change-start-ticket',
  'change-expire-ticket',
  'remove-ticket',
])
</script>
<template>
  <V-CardAction
    v-for="packageItem in packageItems"
    :key="`pk-${packageItem.packageItemId}`"
    :avatar="packageItem.packageImage"
    :title="`(ID: ${packageItem.packageId}) ${packageItem.packageName}`"
    :subtitle="`Package Item ID: ${packageItem.packageItemId}`"
    class="mb-5"
  >
    <template #action>
      <PackageAction
        :can-activate="canActivate"
        @activate-package="emit('activate-package', packageItem.packageItemId)"
        @add-ticket="emit('add-ticket', packageItem)"
        @change-expire="emit('change-expire', packageItem)"
        @send-package="emit('send-package', packageItem)"
        @change-package="emit('change-package', packageItem)"
        @remove-package="emit('remove-package', packageItem)"
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
          :key="`ticket-${packageItem.packageItemId}-${idxTicket}`"
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
              ticket.startDate ? toFormat(ticket.startDate, 'DD/MM/YYYY') : '-'
            }}
          </td>
          <td class="has-text-centered">
            {{
              ticket.expireDate
                ? toFormat(ticket.expireDate, 'DD/MM/YYYY')
                : '-'
            }}
          </td>
          <td class="is-end">
            <div class="is-flex is-justify-content-flex-end">
              <TicketAction
                :is-start-date="!canActivate"
                @change-start-ticket="
                  emit('change-start-ticket', {
                    packageItem,
                    ticketType: ticket.type,
                    date: ticket.startDate,
                  })
                "
                @change-expire-ticket="
                  emit('change-expire-ticket', {
                    packageItem,
                    ticketType: ticket.type,
                    date: ticket.expireDate,
                  })
                "
                @remove-ticket="
                  emit('remove-ticket', {
                    packageItem,
                    ticketType: ticket.type,
                  })
                "
              />
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
