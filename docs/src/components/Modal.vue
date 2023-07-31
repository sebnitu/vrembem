<template>
  <div :data-modal="uid" :id="uid" class="modal" :class="modalClass">
    <div class="modal__dialog" :class="dialogClass" role="dialog" aria-modal="true">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { modal } from '../modules/useModal';

console.log('fdsa');

export default {
  props: {
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
  },
  setup(props) {
    const modalInstance = ref(null);
    const uid = ref(props.id);

    onMounted(() => {
      console.log('onMounted', uid.value);
      modalInstance.value = modal.register(uid.value);
    });

    onBeforeUnmount(() => {
      console.log('onBeforeUnmount', uid.value);
      modal.deregister(modalInstance.value);
    });

    return {
      uid
    };
  },
};
</script>
