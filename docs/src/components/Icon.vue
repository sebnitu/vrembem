<template>
  <span :class="class" v-html="svg"></span>
</template>

<script lang="ts">
import { ref } from 'vue';
import feather from 'feather-icons';

export default {
  props: {
    name: {
      type: String,
      default: 'feather'
    },
    class: {
      type: String,
      default: 'display-flex'
    },
    classes: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const svg = ref(null);
    const classes = `icon${(props.classes) ? ' ' + props.classes : ''}`;

    svg.value = feather.icons[props.name].toSvg({
      class: classes
    });

    return {
      svg
    }
  }
}
</script>
