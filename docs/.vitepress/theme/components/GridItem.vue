<script setup lang="ts">
defineProps<{
  isDark: boolean
  style: string
}>()
</script>

<template>
  <div :style="style">
    <slot name="top" />
    <div class="Item" :class="{ dark: isDark }">
      <slot />
    </div>
    <slot name="bot" />
  </div>
</template>

<style scoped>
.Item {
  color: inherit !important;
  text-decoration: none !important;
  border-radius: 12px;
  background-color: #f6f6f7;
  transition: border-color 0.25s, background-color 0.25s;

  padding: 16px;
}
.Item.dark {
  background-color: #202127; /* var(--vp-c-bg-soft); */
}
.dark .Item {
  background-color: #f6f6f7; /* var(--vp-c-bg-soft); */
}
.dark .Item.dark {
  background-color: #202127; /* var(--vp-c-bg-soft); */
}
</style>
