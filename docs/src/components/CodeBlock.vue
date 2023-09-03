<template>
  <div class="code-block" :class="rootClass">
    <Popover
      triggerClass="code-block__copy-button"
      targetClass="popover_tooltip"
      :triggerAction="copyCode"
      :arrow="true"
      aria-label="Copy code example">
      <template #trigger>
        <Icon v-if="!copied" name="copy" iconClass="icon_size_sm foreground-neutral-50" />
        <Icon v-else name="check" iconClass="icon_size_sm foreground-primary-50" />
      </template>
      <template #content>
        <span>Copied!</span>
      </template>
    </Popover>
    <Icon v-if="inline" name="chevron-right" rootClass="code-block__prompt" iconClass="icon_size_sm foreground-neutral-50" />
    <pre v-if="inline" class="pre"><code><slot /></code></pre>
    <pre v-else class="pre"><slot /></pre>
  </div>
</template>

<script setup lang="ts">
import Icon from './Icon.vue';
import Popover from './Popover.vue';
import { popover } from '../modules/usePopover';
import { ref } from 'vue';

const props = withDefaults(defineProps<{
  inline?: boolean
}>(), {
  inline: false
});

const copied = ref(false);
const rootClass = ref('');

if (props.inline) {
  rootClass.value += 'code-block_inline';
}

function copyCode(event) {
  const trigger = event.target.closest('.code-block__copy-button');
  const code = event.target.closest('.code-block').querySelector('pre code');
  const text = code.innerText;
  navigator.clipboard.writeText(text)
    .then((result) => {
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
        popover.close(trigger.getAttribute('data-popover-trigger'));
      }, 2000);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
</script>
