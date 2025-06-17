<template>
    <label class="container">
        {{ label }}
        <input type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)" />
        <span class="checkmark"></span>
    </label>
</template>

<script setup lang="ts">
defineProps<{
    modelValue: boolean
    label?: string
}>()

defineEmits(['update:modelValue'])
</script>
