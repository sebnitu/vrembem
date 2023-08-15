<template>
  <aside
    ref="elDrawer"
    :id="uid"
    class="layout-drawer"
    data-drawer-breakpoint="60rem"
    data-drawer-config="{'classModal': 'is-modal', 'store': false}">
    <div class="layout-drawer__mask"></div>
    <slot />
  </aside>
  <div class="layout-drawer__screen" :data-drawer-close="uid"></div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { drawer } from '../modules/useDrawer';

export default {
  props: {},
  setup() {
    const uid = ref('layout-drawer');
    const elDrawer = ref(null);

    onMounted(() => {
      drawer.register(elDrawer.value);
    });

    onBeforeUnmount(() => {
      drawer.deregister(elDrawer.value);
    });

    return {
      uid,
      elDrawer
    };
  }
};
</script>
