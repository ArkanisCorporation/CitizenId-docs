<script setup lang="ts">
import type { ImageDisplayItem, ImageItem } from './image/imageTypes'
import { withBase } from 'vitepress'
import { computed, ref, watch } from 'vue'
import ImageCaption from './image/ImageCaption.vue'
import ImageDots from './image/ImageDots.vue'
import ImageLightbox from './image/ImageLightbox.vue'
import ImageStage from './image/ImageStage.vue'
import { getImageLabel } from './image/imageTypes'

const props = withDefaults(
  defineProps<{
    items: ImageItem[]
    title?: string
    note?: string
    missing?: string
    ariaLabel?: string
  }>(),
  {
    title: 'Image flow',
    note: undefined,
    missing: undefined,
    ariaLabel: 'Image steps',
  },
)

const activeIndex = ref(0)
const isLightboxOpen = ref(false)

const displayItems = computed<ImageDisplayItem[]>(() =>
  props.items.map((item, index) => ({
    ...item,
    key: `${item.src}-${index}`,
    imageSrc: withBase(item.src),
    label: getImageLabel(item),
  })),
)

const itemCount = computed(() => displayItems.value.length)
const activeItem = computed(() => displayItems.value[activeIndex.value])
const canCycle = computed(() => itemCount.value > 1)

watch(
  () => displayItems.value.length,
  (length) => {
    if (length === 0) {
      activeIndex.value = 0
      isLightboxOpen.value = false
      return
    }

    if (activeIndex.value >= length) {
      activeIndex.value = length - 1
    }
  },
)

function selectStep(index: number) {
  if (index < 0 || index >= itemCount.value)
    return

  activeIndex.value = index
}

function showPrevious() {
  if (!canCycle.value)
    return

  activeIndex.value = (activeIndex.value - 1 + itemCount.value) % itemCount.value
}

function showNext() {
  if (!canCycle.value)
    return

  activeIndex.value = (activeIndex.value + 1) % itemCount.value
}

function openLightbox() {
  if (!activeItem.value)
    return

  isLightboxOpen.value = true
}
</script>

<template>
  <figure
    v-if="activeItem"
    class="cid-image-stepper"
  >
    <figcaption class="cid-image-stepper__header">
      <span class="cid-image-stepper__eyebrow">Image guide</span>
      <strong>{{ title }}</strong>
    </figcaption>

    <ImageStage
      :item="activeItem"
      :can-cycle="canCycle"
      @open="openLightbox"
      @previous="showPrevious"
      @next="showNext"
    />

    <ImageDots
      v-if="canCycle"
      :items="displayItems"
      :active-index="activeIndex"
      :aria-label="ariaLabel"
      @select="selectStep"
    />

    <ImageCaption :item="activeItem" />

    <p
      v-if="note"
      class="cid-image-stepper__note"
    >
      {{ note }}
    </p>
    <p
      v-if="missing"
      class="cid-image-stepper__note cid-image-stepper__note--missing"
    >
      {{ missing }}
    </p>

    <ImageLightbox
      v-if="isLightboxOpen"
      :item="activeItem"
      :active-index="activeIndex"
      :item-count="itemCount"
      :can-cycle="canCycle"
      @close="isLightboxOpen = false"
      @previous="showPrevious"
      @next="showNext"
    />
  </figure>
</template>

<style scoped>
.cid-image-stepper {
  margin: 1.5rem 0;
  border: 1px solid var(--vp-c-divider);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.cid-image-stepper__header {
  display: grid;
  gap: 0.25rem;
  padding: 1rem 1rem 0.875rem;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.cid-image-stepper__eyebrow {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

.cid-image-stepper__note {
  padding: 0 1rem 1rem;
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.cid-image-stepper__note--missing {
  color: var(--vp-c-text-1);
}
</style>
