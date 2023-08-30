<template>
  <span :class="rootClass" v-html="svg"></span>
</template>

<script setup>
import { ref } from 'vue';
import feather from 'feather-icons';

const props = defineProps({
  name: {
    type: String,
    default: 'feather'
  },
  rootClass: {
    type: String,
    default: 'display-flex'
  },
  iconClass: {
    type: String,
    default: ''
  }
});

const svg = ref(null);
const iconClass = `icon${(props.iconClass) ? ' ' + props.iconClass : ''}`;

svg.value = feather.icons[props.name].toSvg({
  class: iconClass
});

</script>
