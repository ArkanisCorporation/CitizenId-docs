<script setup lang="ts">
import { computed } from 'vue'
import { getAbbreviation } from '../data/abbreviations'

const props = defineProps<{
  term: string
}>()

const abbreviation = computed(() => getAbbreviation(props.term))
</script>

<template>
  <abbr
    class="cid-abbr"
    :title="abbreviation.expansion"
  >{{ abbreviation.term }}</abbr>
</template>
