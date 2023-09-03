<template>
  <span :class="rootClass || 'display-flex'" v-html="svg"></span>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import feather from 'feather-icons';

const props = withDefaults(defineProps<{
  name: string
  rootClass?: string
  iconClass?: string
}>(), {
  iconClass: ''
});

const svg = ref(null);
const iconClass = `icon ${props.iconClass}`.trim();

svg.value = feather.icons[props.name].toSvg({
  class: iconClass
});

</script>
