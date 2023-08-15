<template>
  <aside
    ref="elDrawer"
    :id="uid"
    class="layout__aside layout-aside"
    data-drawer-breakpoint="76rem"
    data-drawer-config="{'classModal': 'is-modal', 'store': false}">
    <div class="layout-aside__container">
      <slot />
    </div>
  </aside>
  <div class="layout-aside__screen" :data-drawer-close="uid"></div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { drawer } from '../modules/useDrawer';

export default {
  props: {},
  setup() {
    const uid = ref('layout-aside');
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
  },
};
</script>
