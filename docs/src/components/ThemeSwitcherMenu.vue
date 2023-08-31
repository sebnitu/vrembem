<template>
  <ul v-if="state" class="menu">
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
