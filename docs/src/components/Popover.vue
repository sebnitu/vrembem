<template>
  <button
    :id="`${uid}-trigger`"
    :data-popover-trigger="uid"
    :aria-controls="uid"
    :aria-label="ariaLabel"
    ref="popoverTrigger"
    @click="triggerAction"
    :class="triggerClass">
    <slot name="trigger">Popover Trigger</slot>
  </button>
  <div
    :id="uid"
    :aria-labelledby="`${uid}-trigger`"
    class="popover"
    :class="targetClass">
    <slot name="content">Popover Content</slot>
    <span v-if="arrow" class="popover__arrow"></span>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { popover } from '../modules/usePopover.js';

function uniqueID() {
  return Math.floor(Math.random() * Date.now());
}

export default {
  props: {
    ariaLabel: {
      type: String,
      default: null,
    },
    arrow: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: null,
    },
    targetClass: {
      type: String,
      default: null,
    },
    triggerAction: {
      type: Function,
      default: null,
    },
    triggerClass: {
      type: String,
      default: 'link',
    },
  },
  setup(props) {
    const popoverInstance = ref(null);
    const popoverTrigger = ref(null);
    const uid = ref(`popover-${(props.id) ? props.id : uniqueID()}`);

    onMounted(() => {
      popoverInstance.value = popover.register(popoverTrigger.value);
    });

    onBeforeUnmount(() => {
      popover.deregister(popoverInstance.value);
    });

    return {
      uid,
      popoverTrigger,
    };
  },
};
</script>
