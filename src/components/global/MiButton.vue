<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
  text: {
    type: String,
    default: ''
  },
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  }
})
</script>

<template>
  <button
    :type="type"
    class="bg-primary text-quaternary py-1.5 px-2.5 rounded-md hover:bg-secondary transition hover:text-white"
  >
    <slot>
      {{ text }}
    </slot>
  </button>
</template>
