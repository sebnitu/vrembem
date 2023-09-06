<template>
  <Popover
    id="theme-switcher"
    aria-label="Switch selected theme"
    trigger-class="button button_icon overflow-hidden"
    target-class="popover_size_auto"
    placement="bottom-end">
    <template #trigger>
      <svg class="icon icon_style_fill theme-icon theme-icon_root" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M21 12C21 7.36745 17.5 3.55237 13 3.05493L13 20.9451C17.4999 20.4476 21 16.6326 21 12ZM12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 0.999999 18.0751 1 12C1 5.92487 5.92487 0.999999 12 1Z" fill="currentColor" />
      </svg>
      <Icon name="sun" icon-class="theme-icon theme-icon_light" />
      <Icon name="moon" icon-class="theme-icon theme-icon_dark" />
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
