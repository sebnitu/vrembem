<script setup>
function copyCode(event) {
  const code = event.target.closest('.code-block').querySelector('pre code');
  const text = code.innerText;
  navigator.clipboard.writeText(text)
    .then((result) => {
      console.log('Copied!');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
</script>

<template>
  <div class="code-block">
    <button class="button" @click="copyCode">Copy</button>
    <pre class="pre background-neutral-20"><slot /></pre>
  </div>
</template>
