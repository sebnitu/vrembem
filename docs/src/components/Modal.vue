<template>
  <div :id="uid" class="modal" :class="modalClass">
    <div class="modal__dialog" :class="dialogClass" role="dialog" aria-modal="true">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { modal } from '../modules/useModal';

const props = defineProps({
  id: {
    type: String,
    default: null,
    required: true
  },
  modalClass: {
    type: String,
    default: null
  },
  dialogClass: {
    type: String,
    default: 'dialog'
  }
});

const modalInstance = ref(null);
const uid = ref(props.id);

onMounted(() => {
  modalInstance.value = modal.register(uid.value);
});

onBeforeUnmount(() => {
  modal.deregister(modalInstance.value);
});

</script>
