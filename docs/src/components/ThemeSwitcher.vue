<template>
  <Popover
    id="theme-switcher"
    aria-label="Change theme"
    trigger-class="button button_icon"
    target-class="popover_size_auto"
    placement="bottom-end">
    <template #trigger>
      <Icon v-if="store.theme === 'default'" name="box" />
      <Icon v-if="store.theme === 'light'" name="sun" />
      <Icon v-if="store.theme === 'dark'" name="moon" />
    </template>
    <template #content>
      <ul class="menu">
        <li class="menu__item">
          <button @click="changeTheme('default')" class="menu__action" :class="store.theme === 'default' && 'is-active'">
            <Icon name="box" />
            <span>OS Default</span>
          </button>
        </li>
        <li class="menu__item">
          <button @click="changeTheme('light')" class="menu__action" :class="store.theme === 'light' && 'is-active'">
            <Icon name="sun" />
            <span>Light</span>
          </button>
        </li>
        <li class="menu__item">
          <button @click="changeTheme('dark')" class="menu__action" :class="store.theme === 'dark' && 'is-active'">
            <Icon name="moon" />
            <span>Dark</span>
          </button>
        </li>
      </ul>
    </template>
  </Popover>
</template>

<script setup>
import Popover from './Popover.vue';
import Icon from './Icon.vue';
import { popover } from '../modules/usePopover';
import { store } from '../modules/useThemeStore';

function changeTheme(value) {
  store.change(value);
  popover.close();
}
</script>
