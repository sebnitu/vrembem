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
      <ThemeSwitcherMenu @themeChanged="closePopover" />
    </template>
  </Popover>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ThemeSwitcherMenu from './ThemeSwitcherMenu.vue';
import Icon from './Icon.vue';
import Popover from './Popover.vue';
import { popover } from '../modules/usePopover';
import { store } from '../modules/useThemeStore';

const state = ref(false);

function closePopover() {
  popover.close('popover-theme-switcher');
}

onMounted(() => {
  if (store.theme) {
    state.value = true;
  }
});
</script>
