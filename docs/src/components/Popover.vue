<template>
  <button
    ref="popoverTrigger"
    :id="`${uid}-trigger`"
    :data-popover-trigger="uid"
    :aria-controls="uid"
    :aria-label="ariaLabel"
    :class="triggerClass"
    @click="triggerAction">
    <slot name="trigger">Popover Trigger</slot>
  </button>
  <div
    :id="uid"
    :aria-labelledby="`${uid}-trigger`"
    class="popover"
    :class="targetClass"
    :style="cssProps">
    <slot name="content">Popover Content</slot>
    <span v-if="arrow" class="popover__arrow"></span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { popover } from '../modules/usePopover.js';

function uniqueID() {
  return Math.floor(Math.random() * Date.now());
}

const props = defineProps({
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
  placement: {
    type: String,
    default: null
  }
});

const popoverInstance = ref(null);
const popoverTrigger = ref(null);
const uid = ref(`popover-${(props.id) ? props.id : uniqueID()}`);
const cssProps = computed(() => {
  const css = {};
  if (props.placement) {
    css['--vb-popover-placement'] = props.placement;
  }
  return css
});

onMounted(() => {
  popoverInstance.value = popover.register(popoverTrigger.value);
});

onBeforeUnmount(() => {
  popover.deregister(popoverInstance.value);
});

</script>
