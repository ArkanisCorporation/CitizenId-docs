<script setup lang="ts">
import type { ImageDisplayItem } from './imageTypes'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import ImageNavButton from './ImageNavButton.vue'
import { getLightboxTitle, hasImageSummary } from './imageTypes'

const props = defineProps<{
  item: ImageDisplayItem
  activeIndex: number
  itemCount: number
  canCycle: boolean
}>()

const emit = defineEmits<{
  close: []
  previous: []
  next: []
}>()

const closeButton = ref<HTMLButtonElement | null>(null)
const stepText = computed(() => `${props.activeIndex + 1} of ${props.itemCount}`)
const title = computed(() => getLightboxTitle(props.item))
const hasSummary = computed(() => hasImageSummary(props.item))

function onWindowKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft' && props.canCycle) {
    event.preventDefault()
    emit('previous')
    return
  }

  if (event.key === 'ArrowRight' && props.canCycle) {
    event.preventDefault()
    emit('next')
    return
  }

  if (event.key !== 'Escape')
    return

  event.preventDefault()
  emit('close')
}

onMounted(async () => {
  window.addEventListener('keydown', onWindowKeydown)
  await nextTick()
  closeButton.value?.focus()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onWindowKeydown)
})
</script>

<template>
  <div
    class="cid-image-stepper__lightbox"
    role="dialog"
    aria-modal="true"
    aria-label="Image preview"
    @click.self="$emit('close')"
  >
    <div class="cid-image-stepper__lightbox-panel">
      <div class="cid-image-stepper__lightbox-bar">
        <div>
          <p class="cid-image-stepper__lightbox-kicker">
            Image {{ stepText }}
          </p>
          <p
            v-if="title"
            class="cid-image-stepper__lightbox-title"
          >
            {{ title }}
          </p>
        </div>
        <button
          ref="closeButton"
          type="button"
          class="cid-image-stepper__lightbox-close"
          aria-label="Close image preview"
          @click="$emit('close')"
        >
          Close
        </button>
      </div>

      <div class="cid-image-stepper__lightbox-viewer">
        <img
          class="cid-image-stepper__lightbox-image"
          :src="item.imageSrc"
          :alt="item.alt"
        >

        <ImageNavButton
          v-if="canCycle"
          direction="previous"
          lightbox
          @click="$emit('previous')"
        />

        <ImageNavButton
          v-if="canCycle"
          direction="next"
          lightbox
          @click="$emit('next')"
        />
      </div>

      <p
        v-if="hasSummary"
        class="cid-image-stepper__lightbox-caption"
      >
        <strong v-if="item.title">
          {{ item.title }}<template v-if="item.caption">.</template>
        </strong>
        <template v-if="item.caption">
          {{ item.caption }}
        </template>
      </p>
    </div>
  </div>
</template>

<style scoped>
.cid-image-stepper__lightbox {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.82);
}

.cid-image-stepper__lightbox-panel {
  display: grid;
  gap: 1rem;
  width: min(1120px, 100%);
  max-height: calc(100vh - 3rem);
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 8px;
  background: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-5);
  overflow: auto;
}

.cid-image-stepper__lightbox-bar {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

.cid-image-stepper__lightbox-kicker,
.cid-image-stepper__lightbox-title {
  margin: 0;
}

.cid-image-stepper__lightbox-kicker {
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.cid-image-stepper__lightbox-title {
  color: var(--vp-c-text-1);
  font-weight: 800;
}

.cid-image-stepper__lightbox-close {
  appearance: none;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.cid-image-stepper__lightbox-close:hover {
  border-color: var(--vp-c-brand-1);
}

.cid-image-stepper__lightbox-close:focus-visible {
  outline: 3px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

.cid-image-stepper__lightbox-viewer {
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  min-width: 0;
  margin: 0 auto;
}

.cid-image-stepper__lightbox-image {
  display: block;
  max-width: 100%;
  max-height: min(72vh, 780px);
  margin: 0 auto;
  object-fit: contain;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
}

.cid-image-stepper__lightbox-caption {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.cid-image-stepper__lightbox-caption strong {
  color: var(--vp-c-text-1);
}

@media (max-width: 720px) {
  .cid-image-stepper__lightbox {
    padding: 0.75rem;
  }

  .cid-image-stepper__lightbox-panel {
    max-height: calc(100vh - 1.5rem);
  }
}
</style>
