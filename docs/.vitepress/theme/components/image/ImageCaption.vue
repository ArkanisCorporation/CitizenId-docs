<script setup lang="ts">
import type { ImageDisplayItem } from './imageTypes'
import { computed } from 'vue'
import { hasImageCopy, hasImageSummary } from './imageTypes'

const props = defineProps<{
  item: ImageDisplayItem
}>()

const hasSummary = computed(() => hasImageSummary(props.item))
const hasCopy = computed(() => hasImageCopy(props.item))
</script>

<template>
  <div
    v-if="hasCopy"
    class="cid-image-stepper__copy"
    aria-live="polite"
  >
    <p
      v-if="hasSummary"
      class="cid-image-stepper__content-title"
    >
      <strong v-if="item.title">
        {{ item.title }}<template v-if="item.caption">.</template>
      </strong>
      <template v-if="item.caption">
        {{ item.caption }}
      </template>
    </p>
    <p v-if="item.description">
      {{ item.description }}
    </p>
  </div>
</template>

<style scoped>
.cid-image-stepper__copy {
  display: grid;
  gap: 0.375rem;
  padding: 0.875rem 1rem 1rem;
}

.cid-image-stepper__copy p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.cid-image-stepper__content-title strong {
  color: var(--vp-c-text-1);
}

:global(.cid-image-figure) .cid-image-stepper__copy {
  padding: 0.5rem 0 0;
}
</style>
