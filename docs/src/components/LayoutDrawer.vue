<template>
  <aside
    ref="elDrawer"
    :id="uid"
    class="layout-drawer is-opened"
    data-drawer-breakpoint="72rem"
    data-drawer-config="{'classModal': 'is-modal'}">
    <div class="layout-drawer__mask"></div>
    <slot />
  </aside>
  <div @click="closeDrawer" class="layout-drawer__screen"></div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { drawer } from '../modules/useDrawer';

export default {
  props: {},
  setup() {
    const uid = ref('layout-drawer');
    const elDrawer = ref(null);

    function closeDrawer() {
      drawer.close(uid.value);
    }

    onMounted(() => {
      drawer.register(elDrawer.value);
    });

    onBeforeUnmount(() => {
      drawer.deregister(elDrawer.value);
    });

    return {
      uid,
      elDrawer,
      closeDrawer
    };
  },
};
</script>
