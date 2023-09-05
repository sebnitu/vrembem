<template>
  <div :id="uid" class="modal" :class="modalClass">
    <div class="modal__dialog" :class="dialogClass" role="dialog" aria-modal="true">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { modal } from '../modules/useModal';

const props = withDefaults(defineProps<{
  id: string,
  modalClass?: string,
  dialogClass?: string
}>(), {
  dialogClass: 'dialog'
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
