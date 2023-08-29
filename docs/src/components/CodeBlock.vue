<template>
  <div class="code-block" :class="rootClass">
    <Popover triggerClass="code-block__copy-button foreground-neutral-50 flex" targetClass="popover_tooltip" :triggerAction="copyCode" :arrow="true" aria-label="Copy code example">
      <template #trigger>
        <svg v-if="!copied" class="icon icon_size_sm" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <svg v-else class="icon icon_size_sm foreground-primary-50" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </template>
      <template #content>
        <span>Copied!</span>
      </template>
    </Popover>
    <Icon v-if="inline" name="chevron-right" rootClass="code-block__prompt" iconClass="icon_size_sm foreground-neutral-50" />
    <pre class="pre" :class="preClass"><code v-if="code">{{ code }}</code><slot /></pre>
  </div>
</template>

<script lang="ts">
import Icon from './Icon.vue';
import Popover from './Popover.vue';
import { popover } from '../modules/usePopover';
import { ref } from 'vue';

export default {
  props: {
    code: { type: String },
    inline: {
      type: Boolean,
      default: false
    }
  },
  components: { Icon, Popover },
  setup(props) {
    const copied = ref(false);
    const preClass = ref('');
    const rootClass = ref('');
    if (props.inline) {
      preClass.value += 'pre_inline';
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

    return {
      copied,
      copyCode,
      preClass,
      rootClass
    };
  },
};
</script>

<style lang="scss">
@use '@vrembem/core';

.code-block {
  position: relative;
  text-align: left;

  .pre {
    background-color: core.palette-get('neutral', 20);
    color: core.palette-get('neutral', 80);

    @include core.media-max('md') {
      border-radius: 0;
      margin: auto calc(var(--vb-layout-padding) * -1);
    }
  }

  .pre_inline {
    padding: 0.8125em 4em 0.8125em 2.5em;
  }

  .popover {
    --vb-popover-event: click;
    --vb-popover-placement: left;
    --vb-background: #{core.palette-get('primary', 100)};
    --vb-foreground: #{core.palette-get('primary')};
  }
}

.code-block__prompt,
.code-block__copy-button {
  position: absolute;
  top: 0.7rem;
  padding: 0.5rem;
}

.code-block__prompt {
  left: 0.5rem;
}

.code-block__copy-button {
  right: 0.7rem;
}

.code-block_inline {

  .code-block__prompt,
  .code-block__copy-button {
    top: 0.5rem;
  }

  .popover {
    --vb-popover-offset: 24;
    --vb-popover-placement: bottom;
  }
}
</style>
