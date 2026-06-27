<script setup lang="ts">
import type { ImageDisplayItem } from './image/imageTypes'
import { withBase } from 'vitepress'
import { computed, ref } from 'vue'
import ImageCaption from './image/ImageCaption.vue'
import ImageLightbox from './image/ImageLightbox.vue'
import ImageStage from './image/ImageStage.vue'
import { getImageLabel } from './image/imageTypes'

const props = defineProps<{
  src: string
  alt: string
  title?: string
  caption?: string
  description?: string
  note?: string
  missing?: string
}>()

const isLightboxOpen = ref(false)

const item = computed<ImageDisplayItem>(() => {
  const image = {
    src: props.src,
    alt: props.alt,
    title: props.title,
    caption: props.caption,
    description: props.description,
  }

  return {
    ...image,
    key: props.src,
    imageSrc: withBase(props.src),
    label: getImageLabel(image),
  }
})
</script>

<template>
  <figure class="cid-image-figure">
    <ImageStage
      :item="item"
      :can-cycle="false"
      @open="isLightboxOpen = true"
    />

    <ImageCaption :item="item" />

    <p
      v-if="note"
      class="cid-image-figure__note"
    >
      {{ note }}
    </p>
    <p
      v-if="missing"
      class="cid-image-figure__note cid-image-figure__note--missing"
    >
      {{ missing }}
    </p>

    <ImageLightbox
      v-if="isLightboxOpen"
      :item="item"
      :active-index="0"
      :item-count="1"
      :can-cycle="false"
      @close="isLightboxOpen = false"
    />
  </figure>
</template>

<style scoped>
.cid-image-figure {
  margin: 1rem 0;
}

.cid-image-figure__note {
  margin: 0.45rem 0 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.cid-image-figure__note--missing {
  color: var(--vp-c-text-1);
}
</style>
