<script setup lang="ts">
// ModalChangePackage Component
import { onBeforeMount, ref } from 'vue'
import type { PropType } from 'vue'
import type { PackageOption } from '/@src/types/interfaces/option.interface'
import useOptionApi from '/@src/composable/api/useOptionApi'

const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
})
const { getPackages } = useOptionApi()
const packagesList = ref<PackageOption[]>([])
const packageId = ref(undefined)
onBeforeMount(async () => {
  packagesList.value = await getPackages()
})
const emit = defineEmits(['toggle-close', 'on-change'])
</script>

<template>
  <V-Modal
    :open="openModal"
    :title="title"
    size="small"
    actions="right"
    @close="emit('toggle-close')"
  >
    <template #content>
      <form class="modal-form">
        <V-Control>
          <Multiselect
            v-model="packageId"
            placeholder="Select a package"
            :options="packagesList"
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
        <!-- <V-Field>
          <label>Comment</label>
          <V-Control>
            <textarea
              v-model="input.comment"
              type="textarea"
              class="textarea is-primary-focus"
              rows="2"
              placeholder="หมายเหตุ"
              required
            />
          </V-Control>
        </V-Field> -->
      </form>
    </template>
    <template #action>
      <V-Button
        color="primary"
        :disabled="!packageId"
        raised
        @click="emit('on-change', packageId)"
        >Submit</V-Button
      >
    </template>
  </V-Modal>
</template>
<style lang="scss" scoped>
.v-modal .modal-content .modal-card .modal-card-body .modal-form {
  height: 350px;
}
</style>
