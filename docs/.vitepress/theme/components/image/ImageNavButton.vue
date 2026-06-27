<script setup lang="ts">
defineProps<{
  direction: 'previous' | 'next'
  lightbox?: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    type="button"
    class="cid-image-stepper__image-nav"
    :class="[
      `cid-image-stepper__image-nav--${direction}`,
      { 'cid-image-stepper__lightbox-nav': lightbox },
    ]"
    :aria-label="direction === 'previous' ? 'Previous image' : 'Next image'"
    @click="$emit('click')"
  >
    <span class="cid-image-stepper__sr-only">
      {{ direction === 'previous' ? 'Previous image' : 'Next image' }}
    </span>
  </button>
</template>

<style scoped>
.cid-image-stepper__image-nav {
  position: absolute;
  top: 50%;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 70%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--vp-c-bg) 88%, transparent);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transform: translateY(-50%);
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.cid-image-stepper__image-nav::before {
  content: "";
  width: 0.625rem;
  height: 0.625rem;
  border-top: 2px solid currentColor;
  border-right: 2px solid currentColor;
}

.cid-image-stepper__image-nav--previous {
  left: 0.75rem;
}

.cid-image-stepper__image-nav--previous::before {
  margin-left: 0.1875rem;
  transform: rotate(-135deg);
}

.cid-image-stepper__image-nav--next {
  right: 0.75rem;
}

.cid-image-stepper__image-nav--next::before {
  margin-right: 0.1875rem;
  transform: rotate(45deg);
}

.cid-image-stepper__image-nav:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
}

.cid-image-stepper__image-nav:focus-visible {
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

@media (max-width: 720px) {
  .cid-image-stepper__image-nav {
    width: 2.25rem;
    height: 2.25rem;
  }

  .cid-image-stepper__image-nav--previous {
    left: 0.5rem;
  }

  .cid-image-stepper__image-nav--next {
    right: 0.5rem;
  }
}
</style>
