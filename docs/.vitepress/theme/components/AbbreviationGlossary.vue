<script setup lang="ts">
import { computed } from 'vue'
import { abbreviations } from '../data/abbreviations'

const entries = computed(() => Object.values(abbreviations))
</script>

<template>
  <dl class="cid-abbreviation-glossary">
    <template
      v-for="entry in entries"
      :key="entry.term"
    >
      <dt>
        <abbr
          class="cid-abbr"
          :title="entry.expansion"
        >{{ entry.term }}</abbr>
        <span class="cid-abbreviation-glossary__expansion">{{ entry.expansion }}</span>
      </dt>
      <dd>{{ entry.description }}</dd>
    </template>
  </dl>
</template>
