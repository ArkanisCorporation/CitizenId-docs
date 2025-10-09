<script setup lang="ts">
defineProps<{
  style: string
}>()
</script>

<template>
  <div class="Grid" :style="style">
    <slot />
  </div>
</template>

<style scoped>
.Grid {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 16px;
  justify-content: center;
}
</style>
