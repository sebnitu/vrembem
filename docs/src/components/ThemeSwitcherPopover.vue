<template>
  <Popover
    id="theme-switcher"
    aria-label="Switch selected theme"
    trigger-class="button button_icon"
    target-class="popover_size_auto"
    placement="bottom-end">
    <template #trigger>
      <Icon v-if="store.theme === 'default'" name="box" />
      <Icon v-if="store.theme === 'light'" name="sun" />
      <Icon v-if="store.theme === 'dark'" name="moon" />
    </template>
    <template #content>
      <ThemeSwitcherMenu />
    </template>
  </Popover>
</template>

<script setup>
import Popover from './Popover.vue';
import Icon from './Icon.vue';
import ThemeSwitcherMenu from './ThemeSwitcherMenu.vue';
import { store } from '../modules/useThemeStore';
</script>
