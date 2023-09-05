<template>
  <ul v-if="state" class="menu">
    <li class="menu__item">
      <button @click="changeTheme('root')" class="menu__action" :class="store.theme === 'default' && 'is-active'">
        <svg class="icon icon_style_fill" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M21 12C21 7.36745 17.5 3.55237 13 3.05493L13 20.9451C17.4999 20.4476 21 16.6326 21 12ZM12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 0.999999 18.0751 1 12C1 5.92487 5.92487 0.999999 12 1Z" fill="currentColor" />
        </svg>
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
import { ref, onMounted } from 'vue';
import Icon from './Icon.vue';
import { store } from '../modules/useThemeStore';

const state = ref(false);
const emit = defineEmits(['themeChanged']);

function changeTheme(value) {
  store.change(value);
  emit('themeChanged');
}

onMounted(() => {
  if (store.theme) {
    state.value = true;
  }
});
</script>
