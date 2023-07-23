<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  autofocus: {
    type: Boolean,
    default: false
  }
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <input
    :value="modelValue"
    class="border rounded-md p-1.5"
    :autofocus="autofocus"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
