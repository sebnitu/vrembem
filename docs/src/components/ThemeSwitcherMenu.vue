<template>
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

<script setup>
import Icon from './Icon.vue';
import { store } from '../modules/useThemeStore';

function changeTheme(value) {
  store.change(value);
}
</script>
