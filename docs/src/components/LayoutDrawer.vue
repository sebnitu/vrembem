<template>
  <aside
    ref="elDrawer"
    :id="uid"
    class="layout__drawer is-opened"
    data-drawer-breakpoint="72rem"
    data-drawer-config="{'classModal': 'is-modal'}">
    <div class="layout__drawer-mask"></div>
    <div ref="elDialog" class="layout__drawer-dialog" role="dialog">
      <slot />
    </div>
  </aside>
  <div @click="closeDrawer" class="layout__drawer-screen"></div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { drawer } from '../modules/useDrawer';

export default {
  props: {},
  setup() {
    const uid = ref('layout-drawer');
    const elDrawer = ref(null);
    const elDialog = ref(null);

    function closeDrawer() {
      drawer.close(uid.value);
    }

    onMounted(() => {
      drawer.register({ drawer: elDrawer.value, dialog: elDialog.value });
    });

    onBeforeUnmount(() => {
      drawer.deregister(elDrawer.value);
    });

    return {
      uid,
      elDrawer,
      elDialog,
      closeDrawer
    };
  },
};
</script>
