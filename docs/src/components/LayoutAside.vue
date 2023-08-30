<template>
  <aside
    ref="elDrawer"
    :id="uid"
    class="layout-aside"
    data-drawer-breakpoint="76rem"
    data-drawer-config="{'classModal': 'is-modal', 'store': false}">
    <div class="layout-aside__container">
      <slot />
    </div>
  </aside>
  <div class="layout__screen" :data-drawer-close="uid"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { drawer } from '../modules/useDrawer';

const uid = ref('layout-aside');
const elDrawer = ref(null);
const aside = ref(null);

function handleModalClick(event) {
  if (aside.value.mode != 'modal') return;
  if (event.target.classList.contains('menu__action')) {
    aside.value.close(true, false);
  }
}

onMounted(async () => {
  await drawer.register(elDrawer.value);
  aside.value = drawer.get(uid.value);
  aside.value.el.addEventListener('click', handleModalClick);
});

onBeforeUnmount(() => {
  drawer.deregister(elDrawer.value);
  aside.value.el.removeEventListener('click', handleModalClick);
});

</script>
