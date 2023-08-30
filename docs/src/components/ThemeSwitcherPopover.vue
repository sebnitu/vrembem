<template>
  <Popover
    id="theme-switcher"
    aria-label="Switch selected theme"
    :trigger-class="`button button_icon${(!state) ? ' is-loading' : ''}`"
    target-class="popover_size_auto"
    placement="bottom-end">
    <template #trigger>
      <span v-if="state">
        <Icon v-if="store.theme === 'default'" name="box" />
        <Icon v-if="store.theme === 'light'" name="sun" />
        <Icon v-if="store.theme === 'dark'" name="moon" />
      </span>
      <span v-else>...</span>
    </template>
    <template #content>
      <ThemeSwitcherMenu />
    </template>
  </Popover>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Popover from './Popover.vue';
import Icon from './Icon.vue';
import ThemeSwitcherMenu from './ThemeSwitcherMenu.vue';
import { store } from '../modules/useThemeStore';

const state = ref(false);

onMounted(() => {
  if (store.theme) {
    state.value = true;
  }
});

</script>
