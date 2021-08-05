<script setup lang="ts">
// ModalRemovePackage Component
import { onBeforeMount, ref } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  packageItem: {
    type: Object as PropType<IStudentPackageItems>,
    default: undefined,
  },
})
const comment = ref('')
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
      <h3>confirm remove {{ packageItem?.packageName }}</h3>
      <form class="modal-form">
        <V-Field>
          <label>Comment</label>
          <V-Control>
            <textarea
              v-model="comment"
              type="textarea"
              class="textarea is-primary-focus"
              rows="2"
              placeholder="หมายเหตุ"
              required
            />
          </V-Control>
        </V-Field>
      </form>
    </template>
    <template #action>
      <V-Button color="primary" raised @click="emit('on-change', comment)"
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
