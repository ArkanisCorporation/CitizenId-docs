<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface TabItem {
  key: string
  title: string
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    tabs: TabItem[]
    initial?: string
    ariaLabel?: string
  }>(),
  {
    initial: undefined,
    ariaLabel: 'Tabs',
  },
)

const firstEnabledKey = computed(
  () => props.tabs.find(x => !x.disabled)?.key ?? '',
)

const isValidInitial = computed(
  () =>
    !!props.initial
    && props.tabs.some(x => x.key === props.initial && !x.disabled),
)

const activeKey = ref(isValidInitial.value ? props.initial! : firstEnabledKey.value)

watch(
  () => props.tabs,
  (tabs) => {
    const stillExists = tabs.some(x => x.key === activeKey.value && !x.disabled)
    if (!stillExists) {
      activeKey.value = firstEnabledKey.value
    }
  },
  { deep: true },
)

function selectTab(key: string) {
  const tab = props.tabs.find(x => x.key === key)
  if (!tab || tab.disabled) {
    return
  }
  activeKey.value = key
}

function onKeydown(event: KeyboardEvent, index: number) {
  const enabledTabs = props.tabs.filter(x => !x.disabled)
  const currentEnabledIndex = enabledTabs.findIndex(x => x.key === props.tabs[index]?.key)

  if (currentEnabledIndex === -1)
    return

  let nextIndex = currentEnabledIndex

  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      nextIndex = (currentEnabledIndex + 1) % enabledTabs.length
      break
    case 'ArrowLeft':
    case 'ArrowUp':
      nextIndex = (currentEnabledIndex - 1 + enabledTabs.length) % enabledTabs.length
      break
    case 'Home':
      nextIndex = 0
      break
    case 'End':
      nextIndex = enabledTabs.length - 1
      break
    default:
      return
  }

  event.preventDefault()
  activeKey.value = enabledTabs[nextIndex].key
}
</script>

<template>
  <div class="vp-tabs">
    <div
      class="vp-tabs__list"
      role="tablist"
      :aria-label="ariaLabel"
    >
      <button
        v-for="(tab, index) in tabs"
        :key="tab.key"
        type="button"
        role="tab"
        class="vp-tabs__tab"
        :class="{ 'is-active': activeKey === tab.key }"
        :aria-selected="activeKey === tab.key"
        :tabindex="activeKey === tab.key ? 0 : -1"
        :disabled="tab.disabled"
        @click="selectTab(tab.key)"
        @keydown="onKeydown($event, index)"
      >
        {{ tab.title }}
      </button>
    </div>

    <div class="vp-tabs__panels">
      <section
        v-for="tab in tabs"
        v-show="activeKey === tab.key"
        :key="tab.key"
        role="tabpanel"
        class="vp-tabs__panel"
      >
        <slot :name="tab.key" />
      </section>
    </div>
  </div>
</template>

<style scoped>
.vp-tabs {
  margin: 1rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.vp-tabs__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.vp-tabs__tab {
  appearance: none;
  border: 1px solid transparent;
  background: transparent;
  color: var(--vp-c-text-2);
  padding: 0.5rem 0.875rem;
  border-radius: 8px;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease,
  color 0.2s ease,
  border-color 0.2s ease;
}

.vp-tabs__tab:hover:not(:disabled) {
  color: var(--vp-c-text-1);
  background: var(--vp-c-default-soft);
}

.vp-tabs__tab.is-active {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-default-soft);
  border-color: var(--vp-c-brand-1);
}

.vp-tabs__tab:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.vp-tabs__panel {
  padding: 1rem;
}
</style>
