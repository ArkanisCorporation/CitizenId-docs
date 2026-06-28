<script setup lang="ts">
import type { ImageDisplayItem } from './imageTypes'
import ImageNavButton from './ImageNavButton.vue'

defineProps<{
  item: ImageDisplayItem
  canCycle: boolean
}>()

defineEmits<{
  open: []
  previous: []
  next: []
}>()
</script>

<template>
  <div class="cid-image-stepper__stage">
    <div class="cid-image-stepper__viewer">
      <button
        type="button"
        class="cid-image-stepper__preview-button"
        :aria-label="`Open image preview for ${item.label}`"
        @click="$emit('open')"
      >
        <img
          class="cid-image-stepper__image"
          :src="item.imageSrc"
          :alt="item.alt"
          loading="lazy"
          decoding="async"
        >
      </button>

      <ImageNavButton
        v-if="canCycle"
        direction="previous"
        @click="$emit('previous')"
      />

      <ImageNavButton
        v-if="canCycle"
        direction="next"
        @click="$emit('next')"
      />
    </div>
  </div>
</template>

<style scoped>
.cid-image-stepper__stage {
  padding: 1rem 1rem 0.75rem;
  background: var(--vp-c-bg);
}

.cid-image-stepper__viewer {
  position: relative;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  overflow: hidden;
}

.cid-image-stepper__preview-button {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: zoom-in;
}

.cid-image-stepper__preview-button:focus-visible {
  outline: 3px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

.cid-image-stepper__image {
  display: block;
  width: 100%;
  max-height: 430px;
  object-fit: contain;
}
</style>
