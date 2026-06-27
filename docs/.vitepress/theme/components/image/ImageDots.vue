<script setup lang="ts">
import type { ImageDisplayItem } from './imageTypes'

defineProps<{
  items: ImageDisplayItem[]
  activeIndex: number
  ariaLabel: string
}>()

defineEmits<{
  select: [index: number]
}>()
</script>

<template>
  <div
    class="cid-image-stepper__dots"
    :aria-label="ariaLabel"
  >
    <button
      v-for="(item, index) in items"
      :key="item.key"
      type="button"
      class="cid-image-stepper__dot"
      :class="{ 'is-active': index === activeIndex }"
      :aria-label="`Go to image ${index + 1}: ${item.label}`"
      :aria-current="index === activeIndex ? 'step' : undefined"
      @click="$emit('select', index)"
    >
      <span class="cid-image-stepper__sr-only">
        Go to image {{ index + 1 }}: {{ item.label }}
      </span>
    </button>
  </div>
</template>

<style scoped>
.cid-image-stepper__dots {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  padding: 0.125rem 1rem 0.875rem;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.cid-image-stepper__dot {
  width: 0.6875rem;
  height: 0.6875rem;
  padding: 0;
  border: 1px solid var(--vp-c-text-3);
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
}

.cid-image-stepper__dot.is-active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.cid-image-stepper__dot:focus-visible {
  outline: 3px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

.cid-image-stepper__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
